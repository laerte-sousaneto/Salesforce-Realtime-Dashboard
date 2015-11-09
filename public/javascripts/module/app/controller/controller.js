define([], function()
{
	var controller = function($scope)
	{
		var socket = io('http://192.168.0.106');
		$scope.data = {};
		$scope.apiLimitInfo = {};
		$scope.applications = [];
		$scope.selectedStatus = '';
		$scope.statusList = [
			'New',
			'Submitted',
			'Asset Review',
			'Credit Review',
			'Dealmaker'
		];

		socket.on('news', function (data)
		{
			$scope.data = data;
			$scope.$apply();
		});

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
			$scope.selectedStatus = data;
			console.log('Status changed to', data);
			$scope.$apply();
		});

		$scope.getTotalInvoice = function()
		{
			var total = 0;
			for(x in $scope.applications)
			{
				if($scope.applications[x].Status__c == $scope.selectedStatus || $scope.selectedStatus == '')
					total += $scope.applications[x].Invoice_Total__c;
			}

			return total;
		};

		$scope.getStatusCount = function(status)
		{
			var count = 0;
			for(x in $scope.applications)
			{
				if($scope.applications[x].Status__c == status)
					count++;
			}

			return count;
		};

		$scope.setStatusFilter = function(status)
		{
			$scope.selectedStatus = status;
			socket.emit('ChangeStatus', $scope.selectedStatus);
		};

		$scope.filterByStatus = function(element)
		{
			if($scope.selectedStatus == '') return true;
			return element.Status__c == $scope.selectedStatus;
		};


	};

	controller.$inject = ['$scope'];

	return controller;
});