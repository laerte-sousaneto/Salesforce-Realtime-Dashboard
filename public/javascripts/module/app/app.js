/**
 * Created by sousa on 11/8/2015.
 */
define(
    [
        'module/app/controller/controller',
        'module/app/controller/sobjectController',
        'module/app/directive/StatusItem',
        'module/app/directive/FilterSelection',
        'module/app/utility/FilterUtility'
    ],
    function
    (
        controller,
        sobjectController,
        StatusItem,
        FilterSelection,
        FilterUtility
    )
{
    var app = angular.module('app',[]);

    app.factory('FilterUtility', FilterUtility);

    app.directive('statusItem', StatusItem);
    app.directive('filterSelection', FilterSelection);

    app.controller('controller', controller);
    app.controller('sobjectController', sobjectController);

    console.log('App Module Loaded');
});