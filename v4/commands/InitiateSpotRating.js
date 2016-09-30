var uuid = require('uuid');
var SpotRated = require('./../events/SpotRated');

function InitiateSpotRating(item) {
    this.spotId = item.spotId;
    this.userId = item.userId;
    this.rating = item.rating;
    this.comment = item.comment;
    this.execute();
}

module.exports = InitiateSpotRating;
