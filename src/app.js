var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Configure more middlewares below */
// app.use(...)
/** Configure more middlewares above */

require('./routes')(app);

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/test', function () {
    console.log("[MongoDB] connected to mongodb")
    app.listen(process.env.PORT || '8080', process.env.IP || '127.0.0.1', function () {
        console.log("[Server] listening on port %s", this.address().port);
    });
});
