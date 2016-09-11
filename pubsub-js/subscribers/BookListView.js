var BookListView = function() {
    this.books = [];
    this.addBook = function(book) {
        var data = {
            id: book.id,
            title: book.title
        }
        this.books.push(data);
    }
    this.removeBook = function(book) {
        var removed;
        if(typeof book === 'number') {
            removed = this.books.splice(book, 1);
        }
        for(var i = 0; i < this.books.length; i += 1) {
            if(this.books[i] === book) {
                removed = this.books.splice(i, 1);
            }
        }
    }
};
module.exports = BookListView;
