/**
 * Created by sousa on 11/17/2015.
 */
var SFConnection = require('../SFConnection.js');

module.exports = function(expressApp)
{
    var api = {};
    expressApp.get('/api/sobject/:objectName', function(req, res)
    {
        var sobjectName = req.params.objectName;
        var username = process.env.SF_USERNAME;
        var password = process.env.SF_PASSWORD;
        var loginUrl = process.env.SF_URL;


        console.log('here');
        SFConnection.establishConnection(username, password, loginUrl, function(err, userInfo)
        {
            SFConnection.getSObjectMetadataByName(sobjectName, function(err, metadata)
            {
                if(err) res.send(err);
                else   res.send(metadata);
            });
        });

    });

    return api;
};