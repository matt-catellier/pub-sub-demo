var uuid = require('uuid');

function SpotRated(sourceCommand) {
    this.version = '1.0.0';
    this.id = sourceCommand.id; // store uuid issued in command
    this.spotId = sourceCommand.spotId;
    this.userId = sourceCommand.userId;
    this.rating = sourceCommand.rating;
    this.publicComment = sourceCommand.publicComment;
    this.privateComment = sourceCommand.privateComment;
}

module.exports = SpotRated;
