var uuid = require('uuid');
var SpotRated = require('./../events/SpotRated');

function InitiateSpotRating(item) {
    this.spotId = item.spotId;
    this.userId = item.userId;
    this.rating = item.rating;
    this.comment = item.comment;

    this.execute = function() {
        if(this.spotId && this.userId && this.rating && this.comment) { // validation
            new SpotRated(this); // fire event with command as paramter
        }
    }
}

module.exports = InitiateSpotRating;
