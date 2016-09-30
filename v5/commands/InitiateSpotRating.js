var uuid = require('uuid');
var SpotRated = require('./../events/SpotRated');

function InitiateSpotRating(item) {
    this.spotId = item.spotId;
    this.userId = item.userId;
    this.rating = item.rating;
    this.comment = item.comment;
    this.execute();
}

// this should go into the "Aggregate"
InitiateSpotRating.prototype.execute = function() {
    var dir = '/Users/catellier/Projects/pub-sub/v5/output/SpotRatingEventStore/';
    if(this.spotId && this.userId && this.rating && this.comment) {
        // check if use has already rated the person...
        console.log('command executed');
        new SpotRated(this);
    }
}

module.exports = InitiateSpotRating;
