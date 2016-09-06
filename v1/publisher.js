// LOAD MODULES
var EventEmitter = require('events').EventEmitter;
var util = require('util') // used for inheritance

// and event
var Publisher = function(type, message) {
    this.type = type
    this.message = message
}

util.inherits(Publisher, EventEmitter)
module.exports = Publisher;
