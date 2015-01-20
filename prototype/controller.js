'use strict';
//only works with n dimensional arrays filled with frames in buffer form at the moment
//once the animator got a array of frames, he just does his thing until he gets a new one..
var animator = require('./animator.js');
var decoder = require('./decoder.js');
var exmp = require('./examples.js');

//INIT
var noOfLEDs = 64;
var chooseProgram = 'pngAniTest'; //dont forget to adjust speed if you choose a single frame program
var speed = 80; //0=single frame ; range from 50 (very fast) to 1000 (slow)

switch (chooseProgram) {
    case 'simpleTest':
        var testbuffer = new Buffer(noOfLEDs * 3);
        testbuffer.fill(15);
        animator.receiveBuffer(noOfLEDs, testbuffer, speed);
        break;
    case 'pngTest':
        decoder.decodePNG('hearttest', noOfLEDs, function(pngArray){ //important: callback to go asynch until decoder finishes!
            animator.receiveBuffer(noOfLEDs, pngArray, speed);
        });
        break;
    case 'pngAniTest':
        decoder.decodePNG('aniTest', noOfLEDs, function(pngArray){ //important: callback to go asynch until decoder finishes!
            animator.receiveBuffer(noOfLEDs, pngArray, speed);
        });
        break;
    case 'randomTest':
        exmp.givrnd(100, noOfLEDs, 'green', 'centerMask', function(rndArr){
            animator.receiveBuffer(noOfLEDs, rndArr, speed);
        });
        break;
    default:
        console.log('this program does not exist!');
        decoder.decodePNG('error', noOfLEDs, function(pngArray){ //important: callback to go asynch until decoder finishes!
            animator.receiveBuffer(noOfLEDs, pngArray, speed);
        });
}

