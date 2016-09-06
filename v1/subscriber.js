var Subscriber = function(event) {
    this.event = event
    this.messages = []
    this.execute = function() {
        this.messages.forEach(function(message) {
            console.log("event handled with message \n %j", message)
        })
    }
}
module.exports = Subscriber;
