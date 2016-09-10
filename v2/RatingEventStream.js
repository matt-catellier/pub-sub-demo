var InitiateSpotRating = require('./commands/InitiateSpotRating');
var SpotRated = require('./events/SpotRated');
var RatingEventBus = require('./RatingEventBus');


// handles error when pass in invalid command
function objTypeName(obj) {
    if(typeof obj === 'object' && typeof obj.constructor === 'function')
        return obj.constructor.name;
    return typeof obj;
}
// event stream for Rating events?
// why use _initiate for method names?
function RatingEventStream() {
    var bus = new RatingEventBus();
    var pendingRatings = [];
    this.execute = function(command) { // command handler?
        if(command instanceof InitiateSpotRating) return _initiateSpotRating(command);
        throw new Error('Invalid command type: ' + objTypeName(command));
    };

    // creates instance of event
    function _initiateSpotRating(command) {
        return new SpotRated(command);
    }

    // event handler?
    this.hydrate = function(event) {
        if(event instanceof SpotRated) return _spotRated(event);
    }

    function _spotRated(spotRated) {
        pendingRatings[spotRated.id] = spotRated;
        // publish event here?
        if(bus.emit('SpotRated', spotRated)) {
            console.log('success');
        } else {
            console.log('failed')
        }
    }
}

module.exports = RatingEventStream;
