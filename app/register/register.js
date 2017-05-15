'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisCtrl'
  });
}])

.controller('RegisCtrl', function($scope,$http,$rootScope,$location) {
	
$scope.register=function(x,y,z,a){
	$scope.email=x;
	$scope.password=y;
	$scope.Phoneno=z;
	$scope.userotp=a;
	$scope.allData=[];
	$rootScope.allData=[];

		$scope.error="" ;
				if($scope.email == undefined)
					$scope.error="Please fill the email";
				else if ($scope.password == undefined || $scope.password.length < 3)
					$scope.error="Password must be 4 character";
				else if ($scope.Phoneno == undefined )
					$scope.error="Enter the Valid Number";
				else{
					
	
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/verifyotp',
						data:{"email":$scope.email,"password":$scope.password,"Phoneno":$scope.Phoneno,"userotp":$scope.userotp}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
			            			
									$scope.allData = response.data;
									$rootScope.allData =$scope.allData ;

									
										$location.path('/login');
									
							
								}, function errorCallback(response) {
    							console.log(response);
						});
				}

}




$scope.otp=function(telno){
	$scope.PhoneNo=telno;
	console.log($scope.PhoneNo);
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/sendotp',
						data:{"PhoneNo":$scope.PhoneNo}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;		 
									$scope.otpData = response.data;
									$rootScope.otpData =$scope.otpData ;
									console.log(response.data);
								}, function errorCallback(response) {
    							console.log(response);
						});
	
}



});