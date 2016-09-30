var uuid = require('uuid');

function RatingDetail(message, res) {
    this.spotId = message.spotId;
    this.userId = message.userId;
    this.rating = message.rating;
    this.comment = message.comment;

    this.handle = function() {
        res.json({
            spotId: this.spotId,
            userId: this.userId,
            rating: this.rating,
            comment: this.comment
        });
    }
}

module.exports = RatingDetail;
