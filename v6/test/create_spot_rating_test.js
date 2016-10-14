var Rating = require("../rating"); // aggrrgate
var InitiateSpotRating = require("../commands/InitiateSpotRating");
var SpotRated = require("../events/SpotRated");
var EventStore = require("../EventStore");
var uuid = require('uuid');
var fs = require('fs');

module.exports = {
    setUp: function(callback) {
        this.es = new EventStore();
        this.spotId = uuid.v4();
        this.userId = uuid.v4();
        this.spotRating = {
            spotId: this.spotId,
            userId: this.userId,
            rating: 4,
            comment: "Great"
        }
        callback();
    },
    tearDown: function(callback) {
        // go thorugh and delete
        var spotDir = __dirname + '/../output/SpotRatingEventStore/' + this.spotId;
        deleteFolderRecursive(spotDir);
        callback();
    },
    'Create New Spot Rating': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(this.spotRating));
        // add result to event store...
        // event store will create records in DB
        test.ok(result instanceof SpotRated);
        test.done();
    },
    'Create Duplicate Spot Rating': function(test) {
        var rating = new Rating();
        var spotRating = new SpotRated(this.spotRating);
        rating.hydrate(spotRating);
        test.throws(function() {
            rating.execute(new InitiateSpotRating(this.spotRating));
        }, Error, 'User has already rated this spot.')
        test.done();
    },
    'Store New Spot Rating Event Error': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(this.spotRating));
        test.throws(function() {
            this.es.fireEvent(result);
        }, Error, 'Error storing SporRated event.')
        test.done();
    },
    'Store New Spot Rating Event Success': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(this.spotRating));
        test.ok(this.es.fireEvent(result));
        test.done();
    }
}

var deleteFolderRecursive = function(path) {
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
