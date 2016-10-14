var uuid = require('uuid');
var fs = require('fs');
var RatingEventBus = require('./../rating-event-bus');

function SpotRated(objGraph) {
    this.version = '1.0.0';
    this.spotId = objGraph.spotId;
    this.userId = objGraph.userId;
    this.rating = objGraph.rating;
    this.comment = objGraph.comment
        // this.handle(); // automatically add to E.S.
        // this is done in your event store object/class
}

SpotRated.prototype.handle = function() {
    var message = JSON.stringify({
        version: this.version,
        spotId: this.spotId,
        userId: this.userId,
        rating: this.rating,
        comment: this.comment
    });
    var spotDir = __dirname + '/../output/SpotRatingEventStore/' + this.spotId;
    fs.mkdirSync(spotDir);
    var userDir = spotDir + "/" + this.userId + "/";
    fs.mkdirSync(userDir); // create folder for user
    fs.writeFile(userDir + '/' + uuid.v4() + '.json', message, function(err) {
        if(err) console.log(err);
    });
    console.log('SpotRated event handled');
    var bus = new RatingEventBus();
    bus.emit('EventFired', this); // fire events globally
}

SpotRated.prototype.subscribers = []

module.exports = SpotRated;
