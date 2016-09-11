var Book = require('./models/Book');
var BookCollection = require('./models/BookCollection');
var PubSub = require('./node_modules/pubsub-js/src/pubsub');
PubSub.immeddiateExceptions = true; // for debugging

// define subscribers
var BookListView = (function() {
    function addBook(book) {
        console.log('book added: ');
        console.log(book.title + '\n');
    }

    function removeBook(book) {
        console.log('book removed: ');
        console.log(book.title + '\n');
    }

    return {
        init: function() {
            // register subscibers
            PubSub.subscribe('BookAdded', addBook)
            PubSub.subscribe('BookRemoved', removeBook)
        }
    }
}());

var fear = new Book('Fear and Loathing in Las Vegas', 'Hunter S. Thompson', '3er4t5y');
var tom = new Book('The Adventures of Tom Sawyer', 'Mark Twain', '3egh52t');

var books = new BookCollection();
books.addBook(fear, PubSub);
books.addBook(tom, PubSub);

books.removeBook(fear, PubSub);
