
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var jsforce = require('jsforce');
var totalApplications = 0;
var lastSent = -1;
var apiLimitInfo = null;
var neededstats = [];

var username = 'lneto@northmillef.com.nmeflneto';
var password = '@lta86t7v';

var prodUsername = 'lneto@northmillef.com';
var prodPassword = 'lta86t7v';

var applications = null;
var selectedStatus = '';

var conn = new jsforce.Connection(
{
	loginUrl: 'https://test.salesforce.com'
});

var prodConn = new jsforce.Connection(
);

var mainConnection = conn;
var socketList = [];


mainConnection.login(username, password, function (err, userInfo)
{
  if (err) { return console.error(err); }

  setInterval(doQuery, 5000);
});


app.listen(8000);

io.on('connection', function (socket) 
{ 
	var globalSocket = socket;
	globalSocket.emit('apps', applications);
	globalSocket.emit('apiInfo', apiLimitInfo);
	globalSocket.emit('StatusChanged', selectedStatus);

	globalSocket.on('ChangeStatus', function (data) 
	{
		selectedStatus = data;
		broadcast('StatusChanged', selectedStatus);
		console.log('Status Changed to', selectedStatus);
	});
	
	socketList.push(socket);
	console.log(socket.conn.remoteAddress);
	
  
});

function handler (req, res) 
{
	
	if(req.url == '/idex.html' || req.url=='/')
	{
		fs.readFile(__dirname + '/index.html',
		function (err, data) 
		{
			if (err) 
			{
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
	}
	else
	{
		console.log('req:', req.url);
		
		
		fs.readFile(__dirname + req.url, function(err, data)
		{
			if (err) 
			{
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			
			res.end(data);
			
		});
		
	}
	
}




function doQuery()
{
	var query = "SELECT Id, Name, Status__c, Invoice_Total__c, Locked_By__r.Name FROM Application__c";
	
	
	mainConnection.query(query, function(err, result)
	{
		if (err) { return console.error(err); }
		totalApplications = result.totalSize;
		apiLimitInfo = mainConnection.limitInfo;
		
		applications = result.records;
	
		broadcast('apps', applications);
		broadcast('apiInfo', apiLimitInfo);
	});
}

function broadcast(message, data)
{
	for(x in socketList)
	{
		socketList[x].emit(message, data);
	}
}

console.log('Server Running');