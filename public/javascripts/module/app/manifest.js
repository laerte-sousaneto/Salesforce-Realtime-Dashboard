/**
 * Created by sousa on 11/8/2015.
 */

require.config({
    baseUrl: '/javascripts/',
    paths: {
        'Angular': 'dependency/angular/angular',
        'Jquery': 'dependency/jquery/jquery-2.1.4.min',
        'Bootstrap': 'dependency/bootstrap/js/bootstrap.min',
        'App': 'module/app/app'
    },
    shim:{
        'Angular':
        {
            deps: ['Bootstrap']
        },
        'Bootstrap':
        {
            deps: ['Jquery']
        },
        'App':
        {
            deps: ['Angular']
        }
    }

});

//Wijmo needs to be added manually currently dues to framework issues.
//Due to the above issue, angular also needs to be added manually.
require(['App'], function(App)
{
    angular.bootstrap(document, ['app']);
    console.log('App is bootstraped to DOM');
});
