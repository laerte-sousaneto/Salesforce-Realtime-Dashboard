/**
 * Created by sousa on 11/8/2015.
 */
define(['module/app/controller/controller'], function(controller)
{
    var app = angular.module('app',[]);
    app.controller('controller', controller);

    console.log('App Module Loaded');
});