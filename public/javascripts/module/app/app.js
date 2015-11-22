/**
 * Created by sousa on 11/8/2015.
 */
define(
    [
        'module/app/controller/controller',
        'module/app/controller/sobjectController',
        'module/app/directive/StatusItem',
        'module/app/utility/FilterUtility'
    ],
    function
    (
        controller,
        sobjectController,
        StatusItem,
        FilterUtility
    )
{
    var app = angular.module('app',[]);

    app.factory('FilterUtility', FilterUtility);

    app.directive('statusItem', StatusItem);

    app.controller('controller', controller);
    app.controller('sobjectController', sobjectController);

    console.log('App Module Loaded');
});