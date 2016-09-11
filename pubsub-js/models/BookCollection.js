function BookCollection() {
    this.books = [];

    this.addBook = function(book, PubSub) {
        this.books.push(book);
        PubSub.publish('BookAdded');
        return true;
    }

    this.removeBook = function(book, PubSub) {
        var removed;
        if(typeof book === 'number') { // if pass in index of array
            removed = this.books.splice(book, 1);
        }
        for(var i = 0; i < this.books.length; i++) {
            if(this.books[i] === book) {
                removed = this.books.splice(i, 1);
                break;
            }
        }
        PubSub.publish('BookRemoved');
        return true;
    }
}

module.exports = BookCollection;
