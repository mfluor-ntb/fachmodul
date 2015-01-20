//TODO pre-load (all) buffer-arrays? show loading animation until done..
'use strict';
var pubnub = require("pubnub").init({ publish_key: "pub-c-59f0f86a-c57a-4993-958e-7c85190053f3", subscribe_key: "sub-c-6b7486e4-966f-11e4-bff9-02ee2ddab7fe" });
var animator = require('./animator.js');
var exmp = require('./examples.js');

//INIT
var noOfLEDs = 64;
var chooseProgram = 'randomTest'; //dont forget to adjust speed if you choose a single frame program
var speed = 0; //0=single frame ; range from 50 (very fast) to 1000 (slow)
var waitForInit = setInterval(function(){
    console.log('waiting...');
}, 1000);
//receive message green, red, blue or orange
pubnub.subscribe({ channel: "tessel-light", message: function(m) {
    console.log('received: '+m.mode+' '+m.color+' '+m.red+' '+m.gre+' '+m.blu+' '+m.posX+'/'+ m.posY);
    if(m.mode === "full") {
    exmp.givcol(noOfLEDs, m.red, m.gre, m.blu, 'centerMask', function(colArr){
        animator.receiveBuffer(noOfLEDs, colArr, speed);
    });
    } else if (m.mode === 'single') {
        console.log('single pixel at pos '+ m.posX+'/'+m.posY+' with color '+ m.red+','+ m.gre+','+ m.blu);
        exmp.givsin(noOfLEDs, m.red, m.gre, m.blu, m.posX, m.posY, function(colArr){
            animator.receiveBuffer(noOfLEDs,colArr,speed);
        });
    } else {
        console.log('no valid message');
        exmp.givcol(noOfLEDs, '', '', function(colArr){
            animator.receiveBuffer(noOfLEDs, colArr, speed);
        });
    }
}, connect: function(){
    clearInterval(waitForInit);
    console.log('connected!');
}});
