var SFConnection = require('./SFConnection');
var SocketUtility = require('./socketutility');
var username = process.env.SF_USERNAME;
var password = process.env.SF_PASSWORD;
var loginUrl = process.env.SF_URL;

// console.log(process.env);

var utility = {};
utility.doQuery = function()
{
    var query = "SELECT Id, Name, Status__c, Invoice_Total__c, Locked_By__r.Name FROM Application__c";

    SFConnection.connection.query(query, function(err, result)
    {
        if (err) { return console.error(err); }
        SocketUtility.setApplications(result.records);
        SocketUtility.setApiLimitInfo(SFConnection.connection.limitInfo);
    });
};

utility.attachSocket = function(io)
{
    SocketUtility.attachSocket(io);
};

SFConnection.establishConnection(username, password, loginUrl, function(err, userInfo)
{

    setInterval(utility.doQuery, 1000);

    if(SocketUtility.globalMetadata == null)
    {
        SFConnection.getSObjectsMetadata(function(err, metadata)
        {
            SocketUtility.setGlobalMetadata(metadata);
        });
    }

});


module.exports = utility;