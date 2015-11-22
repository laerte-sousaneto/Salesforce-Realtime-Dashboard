/**
 * Created by sousa on 11/22/2015.
 */
define([], function()
{
    var StatusItem = function(FilterUtility)
    {
        var directive = {};
        directive.restrict = 'E';
        directive.templateUrl = '../template/StatusItemTemplate.html';
        directive.scope =
        {
            title: '=',
            datasource: '=',
            filters: '=',
            criteria: '=',
            onClick: '&'
        };

        directive.link = function(scope, elem, attrs)
        {

        };

        directive.controller = function($scope)
        {
            $scope.initialize = false;

            $scope.init = function()
            {
                $scope.count = 0;
                $scope.applyFiltersToCounter();
            };

            $scope.applyFiltersToCounter = function()
            {
                for(var x in $scope.datasource)
                {
                    var isCounted = FilterUtility.isMatch($scope.datasource[x], $scope.filters, $scope.criteria);
                    if(isCounted) $scope.count++;
                }
            };


            $scope.$watch('datasource', function()
            {
                if($scope.datasource !== undefined && !$scope.initialize && $scope.datasource.length > 0)
                {
                    $scope.init();
                    $scope.initialize = true;
                }
            });

            $scope.performClick = function()
            {
                console.log('click');
                if($scope.onClick !== undefined)
                    $scope.onClick();
            };

            //$scope.init();
        };

        directive.$inject = ['FilterUtility'];
        return directive;
    };

    return StatusItem;
});