//TODO adjust brightness setting -> if yes: devide every buffer by 2 or 3 or 4, whatever
//TODO IMPORT OTHER PNGs
'use strict';

var exports = module.exports = {};
var PNG = require('png-js');

exports.decodePNG = function(pngName, pix, callback) {
    var filePath;
    var fileName;
    var noOfFrames;
    //define available PNG resources here!
    switch (pngName) {
        case 'hearttest':
            filePath = 'img/test/';
            fileName = 'test';
            noOfFrames = 1;
            break;
        case 'htwtest':
            filePath = 'img/test/';
            fileName = 'htw';
            noOfFrames = 1;
            break;
        case 'aniTest':
            filePath = 'img/fog/';
            fileName = 'fog_xcf-Clouds__';
            noOfFrames = 20;
            break;
        default:
            filePath = 'img/';
            fileName = 'error';
            noOfFrames = 1;
            break;
    }
    //end of define
    var files = new Array(noOfFrames);
    for (var i = 0; i < noOfFrames; i++) {
        files[i] = fileName + i + '.png';
    }
    var frames = new Array(noOfFrames);
    var frmcnt = 0;
    for(var starter=0;starter<noOfFrames;starter++) {
        PNG.decode('' + filePath + files[starter] + '', function (pixels) {
            var buf = new Buffer(pix * 3);
            var error = 0;
            buf.fill(0);
            for (var i = 0; i < buf.length; i++) {
                if (i !== 0 && i % 3 === 0) {
                    error = error + 1;
                }
                buf[i] = pixels[i + error];
            }
            for (var j = 0; j < buf.length; j++) {
                if (j === 0 || j % 3 === 0) {
                    var temp = buf[j];
                    buf[j] = buf[j + 1];
                    buf[j + 1] = temp;
                }
                //reduce brightness
                buf[j] = Math.round(buf[j]/4);
            }
            frames[frmcnt] = buf;
            frmcnt = frmcnt + 1;
            console.log('finished frame '+frmcnt);
            console.log(buf);
        });
    }
    var waitingForResults = setInterval(function(){
        console.log('waiting until '+frmcnt+' equals '+noOfFrames);
        if(frmcnt === noOfFrames) {
            callback(frames);
            console.log('frames sent');
            clearInterval(waitingForResults);
        }
    },1000);

};