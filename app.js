var express = require('express');
var app = express();
var path = require('path');
var SFConnection = require('./server/sfconnection.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/test', express.static(path.join(__dirname,'views/test')));

app.get('/', function (req, res)
{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/sobject',function(req,res){

    var sobjectName = req.query['Name'];
    var username = 'lneto@northmillef.com.nmeflneto';
    var password = '@lta86t7v';
    var loginUrl = 'https://test.salesforce.com';

    console.log(sobjectName);
    SFConnection.establishConnection(username, password, loginUrl, function(err, userInfo)
    {
        SFConnection.getSObjectMetadataByName(sobjectName, function(err, metadata)
        {
            res.send(metadata);
        });
    });


});



module.exports = app;
