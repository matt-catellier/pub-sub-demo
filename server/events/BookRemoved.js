var uuid = require('uuid');

var BookRemoved = function(book) {
    this.version = '1.0.0';
    this.uuid = uuid.v4();
    this.id = book.id;
}

module.exports = BookRemoved;
