//TODO experiment with neo on 'end'
//TODO port to npx instead of using neopixels - create stopanimation function
'use strict';

var exports = module.exports = {};
var Neopixels = require('neopixels');
var neopixels = new Neopixels();


exports.receiveBuffer = function(pixelCount, dataArray, speed) {
    console.log('animator function started');
    console.log(dataArray.length);
    if(speed === 0) { //single frame
        neopixels.animate(pixelCount, dataArray[0]);
    } else { //animation
        var frmcnt = 0;
        var noOfFrames = dataArray.length;
        console.log(noOfFrames);
        console.log(process.memoryUsage());
        var animation = setInterval(function () {
            if (frmcnt === noOfFrames-1) {
                neopixels.animate(64, dataArray[frmcnt]);
                console.log('showing last frame '+frmcnt);
                frmcnt = 0;
            } else {
                neopixels.animate(64, dataArray[frmcnt]);
                console.log('showing '+frmcnt);
                frmcnt++;
            }
        }, speed);

    }
};

//clear setInterval
exports.stopAnimation = function() {

};