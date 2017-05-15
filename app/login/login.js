'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
  	//validation for login if , user already login or not 
  /*	resolve :{
  		"check":function($rootScope,$location,$cookieStore){
  			var adminToken = $cookieStore.get('Usertoken');

  			if(adminToken!=undefined){
  				$rootScope.hideit=false;
  				$rootScope.flag=true;
  				//console.log("hi"+adminToken);
  			}
  			if($rootScope.flag){
  				console.log("already login check");
  				$location.path('/folders');//put here the home page;
  			}

  		}
  	},*/
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', function($scope,$http,$rootScope,$location,$cookieStore,$filter) {	

$scope.login=function(x,y){
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
						url:'http://127.0.0.1:3000/login',
						data:{"email":$scope.email,"password":$scope.password}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
									$scope.allData = response.data;
									$rootScope.allData =$scope.allData ;
							        $cookieStore.put('Usertoken',response.data.token);
							  $scope.allData.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
							console.log(JSON.stringify($scope.allData.ddMMyyyy));
									if(response.data.message=="Email not exist");{
										$location.path('/login');
									}
										$location.path('/folders');
									console.log(JSON.stringify(response.data.token));
								}, function errorCallback(response) {
    							console.log("User Not Exist");
    							$scope.error="User Not Exists.Must Register"

						});
				}

}
$scope.foget=function(x){
	$scope.email=x;
	$scope.allData1;
	$rootScope.allData=[];

		$scope.error="" ;
				if($scope.email == undefined)
					$scope.error="Please fill the email";
				else{
	
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/sendlink',
						data:{"email":$scope.email}
			})
			            .then(function successCallback(response) {
			            	
			            			$scope.groundFlag = true;
									$scope.allData1 = response.data;
									$rootScope.allData =$scope.allData1 ;
									var date = new Date();
       						 
									//$location.path('/booking');
								}, function errorCallback(response) {
    							console.log("ffff");
						});
				}

}
});