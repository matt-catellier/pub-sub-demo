var util = require('util')
var EventEmitter = require('events').EventEmitter;
// EVENTS
var SpotRated = require('./events/SpotRated');
// SUBSCRIBERS
var RatingDetail = require('./subscribers/spot/rating-detail');

function RatingEventBus() {
    var self = this; // to be used in callback functions

    this.on('EventFired', function(event) {
        // console.log(event);
        if(event instanceof SpotRated.constructor) {
            var view = new RatingDetail(event.spotId, event.userId, event.rating, event.comment);
        }
    });
}
util.inherits(RatingEventBus, EventEmitter);
// change these to objects with behaviour
RatingEventBus.prototype.fireEvent = function(event, data) {
    console.log("=== in publisher ===");
    this.emit('EventFired', event);
};

module.exports = RatingEventBus;
