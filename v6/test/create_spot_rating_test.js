var Rating = require("../rating"); // aggrrgate
var InitiateSpotRating = require("../commands/InitiateSpotRating");
var SpotRated = require("../events/SpotRated");

module.exports = {
    'Create Spot Rating': function(test) {
        var rating = new Rating();
        var result = rating.execute(new InitiateSpotRating(1, 1, 4, "Great"));
        test.ok(result instanceof SpotRated);
        test.done();
    }
}
