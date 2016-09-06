// load in modules
var Publisher = require('./publisher')
var EventBus = require('./eventBus')
var Subscriber = require('./subscriber')

// intialize subscriber with .event = "SpotRated"
var sub = new Subscriber("SpotRated")

// and add subscriber to eventBus.subscribers[]
var bus = new EventBus();
bus.subscribe(sub)

// create an SpotRated event via the Publisher class
// publisher is like an event?!!
// p1 - the type of event
// p2 - the message for the event
var spotRated = new Publisher("SpotRated", {
    guid: guid(),
    rating: 4,
    public_comment: "Great"
});


// send method of the publisher
spotRated.on('publish', function(e) {
    // bus.events.push(e)
    console.log("SpotRated event published")
    bus.forward(e)
})

spotRated.emit('publish', spotRated)

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
