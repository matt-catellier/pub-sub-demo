var uuid = require('uuid');

function InitiateSpotRating(item) {
    this.id = uuid.v4(); // issue the UUID with command?
    this.spotId = item.spotId;
    this.userId = item.userId;
    this.rating = item.rating;
    this.publicComment = item.publicComment;
    this.privateComment = item.privateComment;
}

module.exports = InitiateSpotRating;
