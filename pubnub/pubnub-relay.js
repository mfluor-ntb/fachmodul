'use strict';
var pubnub = require("pubnub").init({ publish_key: "pub-c-59f0f86a-c57a-4993-958e-7c85190053f3", subscribe_key: "sub-c-6b7486e4-966f-11e4-bff9-02ee2ddab7fe" });
var tessel = require("tessel");
var relaylib = require('relay-mono');

var relay = relaylib.use(tessel.port['A']);

relay.on('ready', function relayReady () {
    pubnub.subscribe({
        channel: "tessel-light", message: function (m) {
            relay.toggle(1, function toggleOneResult(err) {
                if (err) console.log("Err toggling 1", err);
            });
        }
    });
});