/**
 * Created by sousa on 11/17/2015.
 */
var SFConnection = require('../sfconnection.js');

module.exports = function(expressApp)
{
    var api = {};
    expressApp.get('/api/sobject/:objectName', function(req, res)
    {
        var sobjectName = req.params.objectName;
        var username = 'lneto@northmillef.com.nmeflneto';
        var password = '@lta86t7v';
        var loginUrl = 'https://test.salesforce.com';

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
}