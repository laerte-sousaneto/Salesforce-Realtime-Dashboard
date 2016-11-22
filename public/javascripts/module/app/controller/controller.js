define([], function()
{
	var controller = function($scope, FilterUtility)
	{
		// var socket = io('http://localhost/');
		var socket = io(window.location.origin);

		$scope.apiLimitInfo = {};
		$scope.applications = [];
		$scope.selectedStatus = '';
		$scope.metadata = [];
		$scope.filterDefinitionList = [];
		$scope.selectedFilterDefinition = null;
		$scope.statusList =
		[
			'Submitted',
			'Asset Review',
			'Credit Review',
			'Credit Adjudication',
			'DealMaker',
			'Documnet Check In',
			'Funding',
			'Funded'
		];

		for(var statusIndex in $scope.statusList)
		{
			var status = $scope.statusList[statusIndex];
			var fieldName = 'Status__c';
			$scope.filterDefinitionList.push(FilterUtility.generateFilter(status, fieldName, status, 'equals'));
		}

		socket.on('apiInfo', function(data)
		{
			$scope.apiLimitInfo = data;
			$scope.$apply();
		});

		socket.on('apps', function(data)
		{
			$scope.applications = data;
			$scope.$apply();
		});

		socket.on('StatusChanged', function(data)
		{
			$scope.selectedFilterDefinition = data;
			$scope.$apply();
		});

		$scope.getTotalInvoice = function()
		{
			var total = 0;
			for(var x in $scope.applications)
			{
				if($scope.isMatch($scope.applications[x]))
				{
					total += $scope.applications[x].Invoice_Total__c;
				}
			}

			return total;
		};

		$scope.setFilterDefinition = function(filterDefinition)
		{
			$scope.selectedFilterDefinition = filterDefinition;
			socket.emit('ChangeStatus', $scope.selectedFilterDefinition);
		};

		$scope.isMatch = function(item)
		{
			var isMatch = true;
			if($scope.selectedFilterDefinition == null) return isMatch;
			isMatch = FilterUtility.isMatch(item, $scope.selectedFilterDefinition.filters, $scope.selectedFilterDefinition.criteria);

			return isMatch;
		};


	};

	controller.$inject = ['$scope', 'FilterUtility'];

	return controller;
});