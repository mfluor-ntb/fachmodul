'use strict';
var pubnub = require("pubnub").init({ publish_key: "pub-c-59f0f86a-c57a-4993-958e-7c85190053f3", subscribe_key: "sub-c-6b7486e4-966f-11e4-bff9-02ee2ddab7fe" });
var tessel = require("tessel");

pubnub.subscribe({ channel: "tessel-light", message: function(m) {
    tessel.led[1].toggle();
    console.log(m.text);
}});
