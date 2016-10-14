var InitiateSpotRating = require('./commands/InitiateSpotRating');
var SpotRated = require('./events/SpotRated');
var fs = require('fs');

function Rating() { // aggregate
    var events = []; // private
    this.spotId = null; // public
    this.userId = null;
    this.rating = null;
    this.comment = null;

    this.execute = function(command) {
        if(command instanceof InitiateSpotRating) return _initiateSpotRating(command);
        throw new Error('Invalid command type: ' + objTypeName(command));
    };

    function _initiateSpotRating(command) { // process command
        if(this.spotId && this.userId) {
            throw new Error('User has already rated this spot.');
        }
        return new SpotRated({
            spotId: command.spotId,
            userId: command.userId,
            rating: command.rating,
            comment: command.comment
        });
    }

    this.hydrate = function() {
        events.forEach(function(event) {
            if(event instanceof SpotRated) return _spotRated(event);
        });
    }

    function _spotRated(spotRated) {
        this.spotId = spotRated.spotId;
        this.userId = spotRated.userId;
        this.rating = spotRated.rating;
        this.comment = spotRated.comment;
    }

    this.readStream = function(spotId, userId) {
        var spotDir = __dirname + '/output/SpotRatingEventStore/' + spotId;
        var userDir = spotDir + "/" + userId;
        console.log('READ STREAM');
        if(fs.existsSync(spotDir) && fs.existsSync(userDir)) {
            var filenames = fs.readdirSync(userDir);
            filenames.forEach(function(filename) {
                var content = fs.readFileSync(userDir + '/' + filename, 'utf-8');
                events.push(content);
            });
        }
        console.log(events);
    }
}

module.exports = Rating;
// HELPERS
function objTypeName(obj) {
    if(typeof obj === 'object' && typeof obj.constructor === 'function')
        return obj.constructor.name;
    return typeof obj;
}
