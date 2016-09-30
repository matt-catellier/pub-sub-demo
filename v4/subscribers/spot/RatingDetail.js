var ratings = require('./../../Rating');

function RatingDetail(spotId, res) {
    // Rating aggregate
    this.spotId = spotId
        // call method on instantiation
    this.handle();

    this.handle = function() {
        // use the aggregate to return a read model
        var aggregate = new Rating();

        res.json({
            spotId: this.spotId,
            userId: this.userId,
            rating: this.rating,
            comment: this.comment
        });
    }
}
module.exports = RatingDetail;
