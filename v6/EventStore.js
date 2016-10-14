var util = require('util')
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var uuid = require('uuid');
// EVENTS
var SpotRated = require('./events/SpotRated');

function EventStore() { // STORE EVENTS
    this.on('EventFired', function(event) {
        if(event instanceof SpotRated) {
            var spotDir = __dirname + '/output/SpotRatingEventStore/' + event.spotId; // aggrateId
            fs.mkdirSync(spotDir);
            var message = JSON.stringify({
                version: event.version,
                userId: event.userId,
                rating: event.rating,
                comment: event.comment
            });
            fs.writeFile(spotDir + '/' + uuid.v4() + '.json', message, function(err) {
                if(err) throw new Error('Error storing SpotRated event.');
            });
            return true;
        }
    });
}
util.inherits(EventStore, EventEmitter);
// change these to objects with behaviour
EventStore.prototype.fireEvent = function(event) {
    return this.emit('EventFired', event);
};

module.exports = EventStore;
