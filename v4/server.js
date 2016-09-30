var express = require('express'),
    app = express(),
    path = './public';

var bodyParser = require('body-parser')

var Rating = require('./Rating');
var InitiateSpotRating = require('./commands/InitiateSpotRating');
var RatingDetail = require('./subscribers/spot/RatingDetail');

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
    // commmand will fire event automatically based on its behaviours
    var command = new InitiateSpotRating(req.body);
    // console.log('success')
})


// NEEDS TO BE DONE AFTER CONFIGING ROUTES
app.listen(3000, function() {
    console.log('listening 3000');
});
