'use strict';

angular.module('myApp.forgetpass', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forgetpass', {
    templateUrl: 'forgetpass/forgetpass.html',
    controller: 'ForPassCtrl'
  });
}])

.controller('ForPassCtrl', function($scope,$http,$rootScope,$location) {
	
$scope.forget=function(x,y){
	$scope.email=x;
	$scope.password=y;
	//console.log($scope.password);
	$scope.allData;
	$rootScope.allData=[];

		$scope.error="" ;
				if($scope.email == undefined)
					$scope.error="Please fill the email";
				else if ($scope.password == undefined || $scope.password.length < 3)
					$scope.error="Password must be 4 character";
				else{
					
	
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/folderdisplay',
						data:{"email":$scope.email,"NewPassword":$scope.password}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
			            			
									$scope.allData = response.data;
									$rootScope.allData =$scope.allData ;
									if(response.data.status == "true" ){
										$location.path('/login');
									}
									console.log(JSON.stringify(response.data.status));
								}, function errorCallback(response) {
    							console.log(response);
						});
				}

}
});