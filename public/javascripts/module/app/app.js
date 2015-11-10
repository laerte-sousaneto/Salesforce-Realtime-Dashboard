/**
 * Created by sousa on 11/8/2015.
 */
define(
    [
        'module/app/controller/controller',
        'module/app/controller/sobjectController'
    ],
    function
    (
        controller,
        sobjectController
    )
{
    var app = angular.module('app',[]);
    app.controller('controller', controller);
    app.controller('sobjectController', sobjectController);

    console.log('App Module Loaded');
});