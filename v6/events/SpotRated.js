var uuid = require('uuid');
var fs = require('fs');

function SpotRated(objGraph) {
    this.version = '1.0.0';
    this.spotId = objGraph.spotId;
    this.userId = objGraph.userId;
    this.rating = objGraph.rating;
    this.comment = objGraph.comment;
}

module.exports = SpotRated;
