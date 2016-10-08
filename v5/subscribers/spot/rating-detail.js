var ratings = require('./../../Rating');

function RatingDetail(event) {
    console.log("=== in subscriber ===");
    console.log(JSON.stringify(event));
    var data = {
        rating: event.rating,
        comment: event.comment
    }
    console.log(JSON.stringify(data));
    // retutn data to view somehow...
}
module.exports = RatingDetail;
