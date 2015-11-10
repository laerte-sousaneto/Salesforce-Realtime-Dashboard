define([], function()
{
    var controller = function($scope)
    {
        var socket = io('http://192.168.0.106');
        $scope.apiLimitInfo = {};
        $scope.metadata = [];

        socket.on('GlobalMetadata', function(data)
        {
            $scope.metadata = data;
            console.log('metadata received', data);
            $scope.$apply();
        });


        socket.on('apiInfo', function(data)
        {
            $scope.apiLimitInfo = data;
            $scope.$apply();
        });

    };

    controller.$inject = ['$scope'];

    return controller;
});