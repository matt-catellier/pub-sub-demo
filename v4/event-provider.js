var util = require('util');
var EventEmitter = require('events').EventEmitter;
var SpotRatingDetail = require('subscribers/spot/RatingDetail');

function EventProvider() {
    this.init();
}

util.inherits(RatingEventBus, EventEmitter);

RatingEventBus.prototype.init = function() {
    this.on('SpotRated', function(event) {
        new SpotRatingDetail(event.spotId);
    })
}
module.exports = EventProvider;

// aggregates store all the events...
// not on the read side!
