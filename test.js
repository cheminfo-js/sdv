/**
 * Created by acastillo on 5/26/16.
 */

var SD = require("./src/index.js");

var FS = require('fs');

function createSpectraData1D(filename, label, data) {
    var spectrum = SD.NMR.fromJcamp(
        FS.readFileSync(__dirname + filename).toString()
    );
    return spectrum;
};

function createSpectraData2D(filename, label, data) {
    var spectrum = SD.NMR2D.fromJcamp(
        FS.readFileSync(__dirname + filename).toString(), {fasParse:false}
    );
    return spectrum;
};

describe('Load a jcamp and create annotations', function () {

    it('annotations1D', function () {
        var spectrum=createSpectraData1D("/1h.jdx");
        var peakPicking = spectrum.nmrPeakDetection({"nH":8, realTop:true, thresholdFactor:1,clean:true,compile:true, idPrefix:"1H",format:"new"});
        var annotations = SD.GUI.annotations1D((peakPicking));
        annotations.length.should.greaterThan(1);
        annotations[0].type.should.equal("rect");
    });

    it('ACS', function () {
        var spectrum=createSpectraData1D("/1h.jdx");
        var peakPicking = spectrum.nmrPeakDetection({"nH":8, realTop:true, thresholdFactor:1,clean:true,compile:true, idPrefix:"1H",format:"new"});
        var acs = SD.ACS.toACS(peakPicking,{rangeForMultiplet:true, nucleus:spectrum.getNucleus(), observe:spectrum.observeFrequencyX()});
        acs.length.should.greaterThan(10);
    });

    it('annotations2D', function () {
        var spectrum=createSpectraData2D("/cosy_0.jdx");
        var peakPicking = spectrum.nmrPeakDetection2D(
            {"thresholdFactor":1,
                "idPrefix":"hmbc_",
                "format":"new"
            });
        //console.log(peakPicking[0]);
        var annotations = SD.GUI.annotations2D(peakPicking);
        annotations.length.should.equal(peakPicking.length);
        annotations[0].type.should.equal("rect");
    });
});
