var uuid = require('uuid');
var SpotRated = require('./../events/SpotRated');
var fs = require('fs');

function InitiateSpotRating(item) {
    this.spotId = item.spotId;
    this.userId = item.userId;
    this.rating = item.rating;
    this.comment = item.comment;
}

// this should go into the "Aggregate"
InitiateSpotRating.prototype.execute = function() {
    var dir = '/Users/catellier/Projects/pub-sub/v5/output/SpotRatingEventStore/';
    if(this.spotId && this.userId && this.rating && this.comment) {
        // check if use has already rated the person...
        var spotDir = __dirname + '/../output/SpotRatingEventStore/' + this.spotId;
        var userDir = spotDir + "/" + this.userId;
        if(!fs.existsSync(spotDir) && !fs.existsSync(spotDir)) {
            console.log('command executed');
            new SpotRated(this);
        } else {
            console.log(`Spot: ${this.spotId} has already been rated by User: ${this.userId}`);
        }
    }
}

module.exports = InitiateSpotRating;
