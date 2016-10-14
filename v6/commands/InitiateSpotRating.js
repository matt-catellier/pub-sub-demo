var uuid = require('uuid');

function InitiateSpotRating(spotId, userId, rating, comment) {
    this.spotId = spotId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
}

module.exports = InitiateSpotRating;
