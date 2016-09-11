// LOAD EVENT EMMITER
var EventEmitter = require('events').EventEmitter; // modules defined as constants
// LOAD MODEL
var Book = require('./models/Book');
//LOAD EVENT
var BookAdded = require('./events/BookAdded');
var BookRemoved = require('./events/BookRemoved');
//LOAD subscribers
var BookDetailView = require('./subscribers/BookDetailView');

var detailView = new BookDetailView(); // should send the response somehow...
// SUBSCIBE TO EVENTS
var emitter = new EventEmitter();
emitter.on('publish', function(event) {
    if(event instanceof BookAdded) {
        detailView.addBook(event);
        console.log('\n Detail View: \n %j', detailView);
    }
    if(event instanceof BookRemoved) {
        listView.removeBook(event.id);
        console.log('\n List View: \n %j', listView);
    }
});

// PROVIDES SERVER SIDE ROUTING
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.get('/', function(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>${req.url}</h1>
            <p>${req.method}</p>
        </body>
        </html>
    `)
})

// respond with HTML file
// how to use data in html template?
app.get('/books/add', function(req, res) {
    res.sendFile('views/books/add.html', {
        root: __dirname
    });
})

app.post('/books/add', function(req, res) {
    console.log('\n')
    console.log('%j', req.body);
    emitter.emit('publish', new BookAdded(req.body));
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Add Books</h1>
            <h3> Book Added </h3>
            <p>${req.body.title}</p>
        </body>
        </html>
    `)
})

app.listen(3000, function() {
    console.log("App running on port 3000")
});
