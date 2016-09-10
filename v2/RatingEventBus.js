// bus just has a bunch of listeners... ?
// can make instance of bus and fire events from Events...?
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function RatingEventBus() {
    this.subscribers = [];
    this.init();
}

util.inherits(RatingEventBus, EventEmitter);

RatingEventBus.prototype.init = function() {
    this.on('SpotRated', function(event) {
        // send data to subscriber
        console.log(event);
        return true;
    })
}

module.exports = RatingEventBus;
