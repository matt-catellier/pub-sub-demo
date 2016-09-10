var Rating = require('./RatingEventStream');
var InitiateSpotRating = require('./commands/InitiateSpotRating')

var command = new InitiateSpotRating({
    spotId: 1,
    userId: 1,
    rating: 1,
    publicComment: "Great",
    privateComment: null,
});
var i = command.id;

// create instance of Rating event stream
var rating = new Rating();

// will pass data from command and return the appropriate event
var spotRated = rating.execute(command);

// will add the event id to pendingRatings in Rating event stream
// uses uuid of command as index
rating.hydrate(spotRated)
