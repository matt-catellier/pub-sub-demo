var InitiateSpotRating = require('./commands/InitiateSpotRating');
var SpotRated = require('./events/SpotRated');

function Rating() { // aggregate
    var events = [];
    var spotId = null;
    var userId = null;
    var rating = null; // private variables?
    var comment = null;
    this.execute = function(command) { // event handler?
        if(command instanceof InitiateSpotRating) return _initiateSpotRating(command);
        throw new Error('Invalid command type: ' + objTypeName(command));
    };

    function _initiateSpotRating(command) { // process command
        command.execute();
    }

    this.hydrate = function(event) {
        if(event instanceof SpotRated) return _spotRated(event);
    }

    function _spotRated(spotRated) {
        spotId = spotRated.spotId;
        userId = spotRated.userId;
        rating = spotRated.rating;
        comment = spotRated.comment;
    }

    function _spotRatingUpdated(spotRated) {
        rating = spotRated.rating;
        comment = spotRated.comment;
    }
}

module.exports = Rating;
// HELPERS
function objTypeName(obj) {
    if(typeof obj === 'object' && typeof obj.constructor === 'function')
        return obj.constructor.name;
    return typeof obj;
}
