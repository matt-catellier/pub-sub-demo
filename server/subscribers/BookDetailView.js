var BookDetailView = function() {
    this.id;
    this.title;

    this.addBook = function(event) {
        this.id = event.id;
        this.title = event.title;
    }
}
module.exports = BookDetailView;
