var express = require('express'),
    app = express(),
    pub = __dirname + '/public/',
    spotRatingES = __dirname + '/output/SpotRatingEventStore/';

var fs = require('fs');

var bodyParser = require('body-parser')

var Rating = require('./Rating');
var InitiateSpotRating = require('./commands/InitiateSpotRating');
var RatingDetail = require('./subscribers/spot/rating-detail');

// CONFIGURE EXPRESS SERVER
app.set('json spaces', 4);
app.use(express.static(pub));
app.use(bodyParser.json());
// NOTE:
// will return static paths
// useful to load resources in required for HTML pages i.e. css, images
app.get('/', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream(pub + 'index.html', 'UTF-8').pipe(res);
})

app.get('/spot/rate', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream(pub + 'form.html', 'UTF-8').pipe(res);
})

app.post('/spot/rate', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    // console.log(events);
    var rating = new Rating();
    var events = [];
    var dir = spotRatingES + req.body.spotId + "/" + req.body.userId;
    if(fs.existsSync(dir)) { // spot has been rated by this user
        readStream(dir, function(content) {
            events.push(content);
        }, function(err) {
            throw err;
        });
        events.forEach(function(e) {
            rating.hydrate(e);
        });
    }
    rating.execute(new InitiateSpotRating(req.body));
})

function readStream(dirname, onFileContent, onError) {
    // if(fs.accessSync(dirname, fs.F_OK)) {
    var filenames = fs.readdirSync(dirname);
    // console.log(filenames);
    filenames.forEach(function(filename) {
        // console.log(dirname);
        var content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
        onFileContent(content);
    });
}


// NEEDS TO BE DONE AFTER CONFIGING ROUTES
app.listen(3000, function() {
    console.log('listening 3000');
});
