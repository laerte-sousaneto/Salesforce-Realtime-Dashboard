/**
 * Created by sousa on 11/10/2015.
 */

var utility = {};
utility.socketList = [];
utility.applications = null;
utility.apiLimitInfo = null;
utility.selectedStatus = '';
utility.globalMetadata = null;

utility.attachSocket = function(io)
{
    io.on('connection', function (socket)
    {
        socket.emit('apps', utility.applications);
        socket.emit('apiInfo', utility.apiLimitInfo);
        socket.emit('StatusChanged', utility.selectedStatus);
        socket.emit('GlobalMetadata', utility.globalMetadata);

        socket.on('ChangeStatus', function (data)
        {
            selectedStatus = data;
            utility.broadcast('StatusChanged', utility.selectedStatus);
            console.log('Status Changed to', utility.selectedStatus);
        });

        utility.socketList.push(socket);
        console.log(socket.conn.remoteAddress);
    });

    io.on('disconnect', function () {
        console.log('Disconnected ');
    });
};

utility.setApplications = function(applications)
{
    utility.applications = applications;
    utility.broadcast('apps', utility.applications);
};

utility.setApiLimitInfo = function(apiLimitInfo)
{
    utility.apiLimitInfo = apiLimitInfo;
    utility.broadcast('apiInfo', utility.apiLimitInfo);
};

utility.setGlobalMetadata = function(metadata)
{
    utility.globalMetadata = metadata;
    utility.broadcast('GlobalMetadata', utility.globalMetadata);
};

utility.broadcast = function(message, data)
{
    for(var x in utility.socketList)
    {
        utility.socketList[x].emit(message, data);
    }
};


module.exports = utility;