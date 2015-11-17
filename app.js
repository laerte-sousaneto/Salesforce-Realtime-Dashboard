var express = require('express');
var app = express();
var routes = require('./routes/mainRoutes')(app, express);
var SalesforceApi = require('./server/api/SalesforceOrgApi')(app);

module.exports = app;
