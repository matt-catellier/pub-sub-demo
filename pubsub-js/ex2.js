// LOAD EVENT EMMITER
var EventEmitter = require('events').EventEmitter; // modules defined as constants
// LOAD MODEL
var Book = require('./models/Book');
// LOAD SUBSCRIBER
var BookListView = require('./subscribers/BookListView'); // data for all books in view
var BookDetailView = require('./subscribers/BookDetailView'); // data for a single book in view
// LOAD EVENTS
var BookAdded = require('./events/BookAdded');
var BookRemoved = require('./events/BookRemoved');

// SUBSCIBERS
var listView = new BookListView();
var detailView = new BookDetailView();

// SUBSCIBE TO EVENTS
var emitter = new EventEmitter();
emitter.on('publish', function(event) {
    if(event instanceof BookAdded) {
        listView.addBook(event);
        console.log('\n List View: \n %j', listView);
        detailView.addBook(event);
        console.log('\n Detail View: \n %j', detailView);
    }
    if(event instanceof BookRemoved) {
        listView.removeBook(event.id);
        console.log('\n List View: \n %j', listView);
    }
});

// BOOKS
var fear = new Book(0, 'Fear and Loathing');
var tom = new Book(1, 'Tom Sawyer');
var fight = new Book(2, 'Fight Club');
var sunAlso = new Book(3, 'The Sun Also Rises');

// FIRE VIA Node.js EventEmitter
var events = []; // represents event store
var books = []; // represents DB

emitter.emit('publish', new BookAdded(fear));
emitter.emit('publish', new BookAdded(tom));
emitter.emit('publish', new BookAdded(fight));;
