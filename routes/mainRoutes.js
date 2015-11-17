/**
 * Created by sousa on 11/17/2015.
 */
var path = require('path');

module.exports = function(expressApp, express)
{
    var routes = {};

    expressApp.get('/', function (req, res)
    {
        res.sendFile(path.join(__dirname + '/../views/index.html'));
    });

    expressApp.use(express.static(path.join(__dirname, '/../public')));
    expressApp.use('/test', express.static(path.join(__dirname,'/../views/test')));

    return routes;
}