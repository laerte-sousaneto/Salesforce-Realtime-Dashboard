var jsforce = require('jsforce');

var utility = {};
var socketList = [];
var apiLimitInfo = null;
var username = 'lneto@northmillef.com.nmeflneto';
var password = '@lta86t7v';
var applications = null;
var selectedStatus = '';
var sfConnection = new jsforce.Connection(
{
    loginUrl: 'https://test.salesforce.com'
});


sfConnection.login(username, password, function (err, userInfo)
{
    if (err) { return console.error(err); }

    setInterval(utility.doQuery, 1000);
});

utility.attachSocket = function(io)
{
    io.on('connection', function (socket)
    {
        var globalSocket = socket;
        globalSocket.emit('apps', applications);
        globalSocket.emit('apiInfo', apiLimitInfo);
        globalSocket.emit('StatusChanged', selectedStatus);

        globalSocket.on('ChangeStatus', function (data)
        {
            selectedStatus = data;
            utility.broadcast('StatusChanged', selectedStatus);
            console.log('Status Changed to', selectedStatus);
        });

        socketList.push(socket);
        console.log(socket.conn.remoteAddress);
    });
};

utility.doQuery = function()
{
    var query = "SELECT Id, Name, Status__c, Invoice_Total__c, Locked_By__r.Name FROM Application__c";

    sfConnection.query(query, function(err, result)
    {
        if (err) { return console.error(err); }
        totalApplications = result.totalSize;
        apiLimitInfo = sfConnection.limitInfo;

        applications = result.records;

        utility.broadcast('apps', applications);
        utility.broadcast('apiInfo', apiLimitInfo);
    });
};

utility.broadcast = function(message, data)
{
    for(x in socketList)
    {
        socketList[x].emit(message, data);
    }
};

module.exports = utility;