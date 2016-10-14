var Rating = require("../rating"); // aggrrgate
var InitiateSpotRating = require("../commands/InitiateSpotRating");
var SpotRated = require("../events/SpotRated");

module.exports = {
    'Create New Spot Rating': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(1, 1, 4, "Great"));
        test.ok(result instanceof SpotRated);
        test.done();
    },
    'Create Duplicate Spot Rating': function(test) {
        var rating = new Rating();
        var spotRating = new SpotRated({
            spotId: 1,
            userId: 1,
            rating: 4,
            comment: "Great"
        });
        rating.events.push(spotRating);
        rating.hydrate();
        test.throws(function() {
            rating.execute(new InitiateSpotRating(1, 1, 4, "Great"))
        }, Error, 'User has already rated this spot.')
        test.done();
    }
}
