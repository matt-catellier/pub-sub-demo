var InitiateSpotRating = require('./commands/InitiateSpotRating');
var SpotRated = require('./events/SpotRated');
// handles error when pass in invalid command
function objTypeName(obj) {
    if(typeof obj === 'object' && typeof obj.constructor === 'function')
        return obj.constructor.name;
    return typeof obj;
}

// register command and event hadlers here?
function Rating() {
    var rating = null; // private variables?
    var comment = null;

    // used to get back to maintain state in between reads from DB
    // doesnt apply to this scenario?
    this.hydrate = function(event) { // event handler?
        if(event instanceof SpotRated) return _spotRated(event);
    }

    function _spotRated(spotRated) {
        rating = spotRated.rating;
        comment = spotRated.comment;
    }
}

module.exports = Rating;
