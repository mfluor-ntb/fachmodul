//TODO More examples, more masks
'use strict';

var exports = module.exports = {};

var green = [200, 10, 10];
var red = [10, 200, 10];
var blue = [10, 10, 200];
var orange = [50, 200, 10];
var setColor;
var setMask;

var centerMask = new Buffer(64 * 3);
centerMask = [
    0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.6, 0.6, 0.6,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  0.6, 0.6, 0.6,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.6, 0.6, 0.6,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  0.6, 0.6, 0.6,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.6, 0.6, 0.6,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.3, 0.3, 0.3,  0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1,  0.1, 0.1, 0.1
];


exports.givrnd = function(noOfFrames, noOfLEDs, color, mask, callback) {
    var rndArr = new Array(noOfFrames);
    switch (color) {
        case 'green':
            setColor = green;
            break;
        case 'red':
            setColor = red;
            break;
        case 'blue':
            setColor = blue;
            break;
        case 'orange':
            setColor = orange;
            break;
        default:
            setColor = green;
            break;
    }

    for (var i = 0; i < noOfFrames; i++) { //x frames, x mal iterieren
        var buf = new Buffer(noOfLEDs * 3); //buffer für ein frame, hält 64 pixel * 3 farbwerte
        var pixcnt = 0;
        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 8; x++) {
                //buf[pixcnt] = Math.floor((Math.random() * 65300));
                buf[pixcnt] = Math.floor((Math.random() * setColor[0]));
                buf[pixcnt+1] = Math.floor((Math.random() * setColor[1]));
                buf[pixcnt+2] = Math.floor((Math.random() * setColor[2]));
                pixcnt = pixcnt + 3;
            }
        }
        //apply mask if asked
        if(mask !== 0) {
            switch (mask) {
                case 'centerMask':
                    setMask = centerMask;
                    break;
                default:
                    setMask = new Buffer(noOfLEDs * 3);
                    setMask.fill(0);
                    break;
                }
            for(var cnt = 0;cnt < buf.length;cnt++){
                buf[cnt] = buf[cnt] * setMask[cnt];
            }
        }
        console.log(buf);
        rndArr[i] = buf;
    }
    callback(rndArr);
};