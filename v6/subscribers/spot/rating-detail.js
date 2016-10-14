var ratings = require('./../../Rating');

function RatingDetail(spotId, userId, rating, comment) {
    console.log("=== in subscriber ===");
    var data = {
        spotId: spotId,
        userId: userId,
        rating: rating,
        comment: comment
    }
    console.log(JSON.stringify(data));
}
module.exports = RatingDetail;
