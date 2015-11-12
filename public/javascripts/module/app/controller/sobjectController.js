define([], function()
{
    var controller = function($scope,$http)
    {
        var socket = io('http://192.168.0.106');
        $scope.apiLimitInfo = {};
        $scope.metadata = [];
        $scope.sObjectMetadata = null;

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

        $scope.filterObjects = function(object)
        {
            if(object.createable && object.custom) return true;

            return false;
        };

        $scope.exitSObjectMetadata = function()
        {
            $scope.sObjectMetadata = null;
        };

        $scope.selectObject = function(name)
        {
            $scope.getSObjectMetadataByName(name, function(responce)
            {
                console.log(responce);
                $scope.sObjectMetadata = responce.data;
                //$scope.$apply();
            }, function(responce){});
        };

        $scope.getSObjectMetadataByName = function(name, onSuccess, onError)
        {
            $http(
            {
                method: 'GET',
                url: '/sobject?Name=' + name
            }).then(function successCallback(response)
            {
                onSuccess(response);
            },
            function errorCallback(response)
            {
                onError(response);
            });
        };


    };

    controller.$inject = ['$scope', '$http'];

    return controller;
});