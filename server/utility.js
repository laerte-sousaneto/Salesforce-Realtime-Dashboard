var SFConnection = require('./sfconnection');
var SocketUtility = require('./socketutility');
var username = 'lneto@northmillef.com.nmeflneto';
var password = '@lta86t7v';
var loginUrl = 'https://test.salesforce.com';

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
    utility.doQuery();
    if(SocketUtility.globalMetadata == null)
    {
        SFConnection.getSObjectsMetadata(function(err, metadata)
        {
            SocketUtility.setGlobalMetadata(metadata);
        });
    }

});


module.exports = utility;