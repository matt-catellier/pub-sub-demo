var EventEmitter = require('events').EventEmitter;

var EventBus = function() {
    this.events = [];
    this.subscribers = [];

    this.subscribe = function(sub) {
        console.log(sub.event + ' event subscribed to.')
        this.subscribers.push(sub)
    }

    this.forward = function(e) {
        for(var j = 0; j < this.subscribers.length; j++) {
            if(e.type == this.subscribers[j].event) {
                this.subscribers[j].messages.push(e.message);
                this.subscribers[j].execute();
            }
        }
    }
}

module.exports = EventBus;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
