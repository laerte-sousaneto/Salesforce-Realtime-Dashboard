/**
 * Created by sousa on 12/2/2015.
 */
define([], function()
{
    var FilterSelection = function(FilterUtility)
    {
        var directive = {};
        directive.restrict = 'E';
        directive.templateUrl = '../template/FilterSelectionTemplate.html';
        directive.scope = {
            sobject: '=',
            filterList: '='
        };

        directive.controller = function($scope)
        {
            if($scope.filterList === undefined)
                $scope.filterList = [];

            $scope.conditionList = [
                'equals',
                'greater',
                'less'
            ];

            $scope.selectedField = '';
            $scope.selectedCondition = '';
            $scope.value = '';


            $scope.addCondition = function()
            {
                $scope.filterContainer.filters.push(
                    {
                        field: $scope.selectedField.name,
                        value: $scope.value,
                        condition: $scope.selectedCondition
                    }
                );

                $scope.selectedField = '';
                $scope.selectedCondition = '';
                $scope.value = '';
            };

            $scope.apply = function()
            {

            };

            $scope.init = function()
            {
                $scope.filterContainer = FilterUtility.generateFilterContainer($scope.sobject.name, $scope.sobject.label, '');
            };

            $scope.$watch('sobject', function()
            {
                if($scope.sobject !== undefined && $scope.sobject != null)
                {
                    console.log($scope.sobject);
                    $scope.init();
                }
            });
        };

        return directive;
    };

    FilterSelection.$inject = ['FilterUtility'];
    return FilterSelection;
});