var uuid = require('uuid');
var fs = require('fs');
var RatingEventBus = require('./../rating-event-bus');

function SpotRated(command) {
    this.version = '1.0.0';
    this.spotId = command.spotId;
    this.userId = command.userId;
    this.rating = command.rating;
    this.comment = command.comment;

    this.handle(); // automatically add to E.S.
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
