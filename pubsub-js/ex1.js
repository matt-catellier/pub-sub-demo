var PubSub = require('./node_modules/pubsub-js/src/pubsub');
PubSub.immeddiateExceptions = true; // for debugging

// create a subsrbier object...
// NOTE:
// - this can use http protocol to pass JSON to api endpoints I will set up with laravel..
var mySubscriber = function(msg, data) {
    console.log(msg, data);
};

// subscribe to event 1
var token = PubSub.subscribe('1', mySubscriber);
// publish event 1
PubSub.publish('1', {
    data: 'stiff'
});
// unsubscribe event 1
PubSub.unsubscribe(token);
// unsubscribe from all events
PubSub.unsubscribe(mySubscriber);
