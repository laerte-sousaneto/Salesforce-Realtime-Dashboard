/**
 * Created by sousa on 11/10/2015.
 */
var jsforce = require('jsforce');

var SFConnection = {
    username: '',
    password: '',
    loginUrl: '',
    connection: null,
    isConnected: false,
    globalMetadata: null,
    establishConnection: function(username, password, loginUrl, callback)
    {
        SFConnection.username = username;
        SFConnection.password = password;
        SFConnection.loginUrl = loginUrl;

        SFConnection.connection = new jsforce.Connection(
        {
            loginUrl: 'https://test.salesforce.com'
        });

        SFConnection.connection.login(SFConnection.username, SFConnection.password, function (err, userInfo)
        {
            if (err) { return console.error(err); }
            else
            {
                SFConnection.isConnected = true;
                if(callback !== undefined)
                {
                    callback(err, userInfo);
                }
            }

        });
    },
    establishConnectionPrivate: function(callback)
    {
        establishConnection(SFConnection.username,SFConnection.username,SFConnection.username, callback);
    },
    getSObjectsMetadata: function(callback)
    {
        if(!SFConnection.isConnected)
        {
            SFConnection.establishConnectionPrivate(function(err, userInfo)
            {
                SFConnection.connection.describeGlobal(function(err, metadata)
                {
                    SFConnection.globalMetadata = metadata;
                    callback(err, metadata);
                });
            });
        }
        else
        {
            SFConnection.connection.describeGlobal(function(err, metadata)
            {
                SFConnection.globalMetadata = metadata;
                callback(err, metadata);
            });
        }


    }
};

module.exports = SFConnection;