var http = require('http')
var fs = require('fs')

var data = JSON.stringify({
    id: 0,
    title: 'Fear and Loating'
});

var options = {
    hostname: "localhost", // i.e cloud.google.com
    port: 3000,
    path: "/books/add", // i.e. /nodejs/getting-started/using-pub-sub
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}

var req = http.request(options, function(res) {
    var responseBody = ""

    //console.log('response recieved')
    //console.log(`HTTP Status: ${res.statusCode}`)
    //console.log('request headers: %j', res.headers)

    res.setEncoding("UTF-8")
    res.on("data", function(chunk) {
        responseBody += chunk
    })
    res.on("end", function() {
        console.log(responseBody)
    })
})

req.on("error", function(err) {
    console.log(`problem with request ${err.message}`)
})

req.end();
