var uuid = require('uuid');

var BookAdded = function(book) {
    this.version = '1.0.0';
    this.uuid = uuid.v4();
    this.id = book.id;
    this.title = book.title;
}

module.exports = BookAdded;
