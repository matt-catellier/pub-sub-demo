var fs = require('fs');
var express = require('express'),
    app = express(),
    path = './public';

var bodyParser = require('body-parser')

var Rating = require('./Rating');
var InitiateSpotRating = require('./commands/InitiateSpotRating');
var RatingDetail = require('./subscribers/RatingDetail');

// CONFIGURE EXPRESS SERVER
app.set('json spaces', 4);
app.use(express.static(path));
app.use(bodyParser.json());
// NOTE:
// will return static paths
// useful to load resources in required for HTML pages i.e. css, images
app.get('/', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream('./public/index.html', 'UTF-8').pipe(res);
})

app.get('/spot/rate', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream('./public/form.html', 'UTF-8').pipe(res);
})

app.post('/spot/rate', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    var rating = new Rating();
    // rating.hydrate(new InitiateSpotRating(data)); // not necessary
    var event = rating.execute(new InitiateSpotRating(req.body)); // will return an event
    // save to E.S. based on GUID and only save data present for event
    // this should happen in the command?
    var es = JSON.stringify(req.body);
    fs.writeFile('./output/eventStore/' + event.guid + '.json', es, function(err) {
        if(err) console.log(err);
    });
    // this is my 'snapshot'?
    // this is executed in the subscriber?
    // store each rating in a folder based on spot, and in file base on userId
    // i.e. ./ratings/spot/1/2 - spot=1, user=2
    var rating = JSON.stringify({
        rating: event.rating,
        comment: event.comment
    });

    var dir = './output/ratings/spot/' + event.spotId;
    // create folder
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
    // create file
    fs.writeFile(dir + '/' + event.userId + '.json', rating, function(err) {
        if(err) console.log(err);
    });
    // message is the request body?
    // data invoved with event, so in this case yes.
    // this should be handled automatically?
    var subscriber = new RatingDetail(req.body, res);
    subscriber.handle();
    // pass message along to subscriber?
    // subscriber sends response to client...
})


// NEEDS TO BE DONE AFTER CONFIGING ROUTES
app.listen(3000, function() {
    console.log('listening 3000');
});
