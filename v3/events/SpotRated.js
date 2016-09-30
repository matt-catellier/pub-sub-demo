var uuid = require('uuid');

function SpotRated(command) {
    this.version = '1.0.0';
    this.guid = uuid.v4();
    this.spotId = command.spotId;
    this.userId = command.userId;
    this.rating = command.rating;
    this.comment = command.comment;
}

module.exports = SpotRated;
