var InitiateSpotRating = require('./commands/InitiateSpotRating');
var SpotRated = require('./events/SpotRated');
var fs = require('fs');

function Rating() { // aggregate
    this._spotId = null; // public
    this._userId = null;
    this._rating = null;
    this._comment = null;

    this.execute = function(command) {
        if(command instanceof InitiateSpotRating) return _initiateSpotRating(command);
        throw new Error('Invalid command type: ' + objTypeName(command));
    };

    function _initiateSpotRating(command) { // process command
        if(this._spotId == command.spotId && this._userId == command.userId) { // check if user already rated spot
            throw new Error('User has already rated this spot.');
        }
        return new SpotRated({
            spotId: command.spotId,
            userId: command.userId,
            rating: command.rating,
            comment: command.comment
        });
    }

    this.hydrate = function(event) {
        if(event instanceof SpotRated) return _spotRated(event);
    }

    function _spotRated(spotRated) {
        this._spotId = spotRated.spotId;
        this._userId = spotRated.userId;
        this._rating = spotRated.rating;
        this._comment = spotRated.comment;
    }
}
module.exports = Rating;

function objTypeName(obj) {
    if(typeof obj === 'object' && typeof obj.constructor === 'function')
        return obj.constructor.name;
    return typeof obj;
}
