var express = require('express');
var app = express();
var routes = require('./routes/mainRoutes')(app, express);
var SalesforceApi = require('./server/api/SalesforceOrgAPI')(app);
// var mongotest = require('./server/database/mongotest');

//mongotest.insertUser();
// mongotest.getUsers();

module.exports = app;
