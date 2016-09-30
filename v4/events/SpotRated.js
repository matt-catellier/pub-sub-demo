var uuid = require('uuid');
var fs = require('fs');

function SpotRated(command) {
    this.version = '1.0.0';
    this.guid = uuid.v4();
    this.spotId = command.spotId;
    this.userId = command.userId;
    this.rating = command.rating;
    this.comment = command.comment;

    this.handle(); // automatically add to E.S.
}

SpotRated.prototype.handle = function() {
    var message = JSON.stringify({
        userId: this.userId,
        rating: this.rating,
        comment: this.comment
    });
    var dir = './output/SpotRatingEventStore/' + this.spotId;
    // create folder
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
    // create file
    fs.writeFile(dir + '/' + this.guid + '.json', message, function(err) {
        if(err) console.log(err);
    });
    // broadcast this globally!
    console.log('SpotRated');
}

module.exports = SpotRated;
