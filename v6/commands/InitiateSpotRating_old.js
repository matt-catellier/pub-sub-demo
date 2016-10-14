var uuid = require('uuid');
var SpotRated = require('./../events/SpotRated');
var fs = require('fs');

function InitiateSpotRating(spotId, userId, rating, comment) {
    this.spotId = spotId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
}

// this should go into the "Aggregate"
InitiateSpotRating.prototype.execute = function() {
    var dir = '/Users/catellier/Projects/pub-sub/v5/output/SpotRatingEventStore/';
    if(this.spotId && this.userId && this.rating && this.comment) {
        var spotDir = __dirname + '/../output/SpotRatingEventStore/' + this.spotId;
        var userDir = spotDir + "/" + this.userId;
        if(fs.existsSync(spotDir)) { // if spot has been rated
            if(!fs.existsSync(userDir)) { // if not rated by user
                console.log('command executed');
                return new SpotRated(this.spotId, this.userId, this.rating, this.comment);
            } else {
                console.log(`Spot: ${this.spotId} has already been rated by User: ${this.userId}`);
            }
        } else { // spot hasnt been rated
            console.log('command executed');
            return new SpotRated(this.spotId, this.userId, this.rating, this.comment);
        }
    }
}

module.exports = InitiateSpotRating;
