var uuid = require('uuid');

function InitiateSpotRating(objMap) {
    this.spotId = objMap.spotId;
    this.userId = objMap.userId;
    this.rating = objMap.rating;
    this.comment = objMap.comment;
}

module.exports = InitiateSpotRating;
