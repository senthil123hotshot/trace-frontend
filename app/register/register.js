'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisCtrl'
  });
}])

.controller('RegisCtrl', function($scope,$http,$rootScope,$location) {
	
$scope.register=function(x,y){
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
						url:'http://127.0.0.1:3000/register',
						data:{"email":$scope.email,"password":$scope.password}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
			            			
									$scope.allData = response.data;
									$rootScope.allData =$scope.allData ;
									if(response.data.success == "true" ){
										$location.path('/login');
									}
									/*else{
										$scope.allData.message="User already exist";
			
									}
*/								}, function errorCallback(response) {
    							console.log(response);
						});
				}

}
});