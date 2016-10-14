var Rating = require("../rating"); // aggrrgate
var InitiateSpotRating = require("../commands/InitiateSpotRating");
var SpotRated = require("../events/SpotRated");

module.exports = {
    setUp: function(callback) {
        this.spotRating = {
            spotId: 1,
            userId: 1,
            rating: 4,
            comment: "Great"
        }
        callback();
    },
    tearDown: function(callback) {
        // clean up
        callback();
    },
    'Create New Spot Rating': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(this.spotRating));
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
    }
}
