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
    this.execute = function(command) { // event handler?
        if(command instanceof InitiateSpotRating) return _initiateSpotRating(command);
        throw new Error('Invalid command type: ' + objTypeName(command));
    };

    // creates instance of event
    function _initiateSpotRating(command) {
        // validaiton and logic goes in here...
        // command->handle();
        return new SpotRated(command);
    }

    // creates hydrated instance of event
    // i.e. coming from Rating() global variables
    function _initiateSpotRating2(command) {
        return new SpotRated({
            rating: rating,
            comment: comment
        });
    }

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
