'use strict';

/**
 * Created by acastillo on 5/25/16.
 */
var extend = require('extend');
var SD = require('spectra-data');

exports.NMR = SD.NMR;
exports.NMR2D = SD.NMR2D;
exports.ACS = SD.ACS;
exports.JAnalyzer = SD.JAnalyzer;

var options1D = {type:"rect",line:0, labelColor:"red", strokeColor:"red", strokeWidth:"1px", fillColor:"green"};
var options2D = {type:"rect",labelColor:"red", strokeColor:"red", strokeWidth:"1px", fillColor:"green", width:"6px", height:"6px"};

function annotations1D(signals, optionsG){
    var options = extend({}, options1D, optionsG);
    const line = options.line;
    var annotations=[];
    for (var i=0; i<signals.length; i++) {
        var annotation={};
        var prediction=signals[i];
        annotations.push(annotation);

        annotation._highlight=prediction._highlight;
        annotation.type=options.type;
        annotation.position=[{x:prediction.to, y:(line*15)+"px"},
            {x:prediction.from, y:(line*15+10)+"px"}];

        annotation.label={
            text: Math.round(prediction.integral*10)/10.0,
            size: "11px",
            anchor: 'middle',
            color:options.labelColor,
            position: {x: prediction.signal[0].delta, y:(line*15)+"px", dy: "5px"}
        };

        annotation.strokeColor=options.strokeColor;
        annotation.strokeWidth=options.strokeWidth;
        annotation.fillColor=options.fillColor;
        annotation.info=prediction;
    }
    return annotations;
} 

function annotations2D(signals2D, optionsG){
    var options = extend({}, options2D, optionsG);
    var annotations=[];
    for(var k=signals2D.length-1;k>=0;k--){
        var signal = signals2D[k];
        var annotation={};
        annotation.type=options.type;
        annotation._highlight=signal._highlight;//["cosy"+k];
        annotation.position = [{x:signal.fromTo[0].from-0.01, y:signal.fromTo[1].from-0.01, dx:options.width, dy:options.height},
            {x:signal.fromTo[0].to+0.01,y:signal.fromTo[1].to+0.01}];
        annotation.fillColor=options.fillColor;
        annotation.label={text:signal.remark,
            "position": {
                "x": signal.signal[0].delta[0],
                "y": signal.signal[0].delta[1]-0.025}
        };
        if(signal.integral==1)
            annotation.strokeColor=options.strokeColor;
        else
            annotation.strokeColor="rgb(0,128,0)";

        annotation.strokeWidth=options.strokeWidth;
        annotation.width=options.width;
        annotation.height=options.height;
        annotation.info=signal;
        annotations.push(annotation);
    }
    return annotations;
}

exports.GUI = {annotations2D:annotations2D, annotations1D: annotations1D};




