'use strict';

angular.module('myApp.folders', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/folders', {
    templateUrl: 'folders/folders.html',
    controller: 'FoldCtrl'
  });
}])

.controller('FoldCtrl', function($scope,$http,$rootScope,$location,$cookieStore,$route) {				
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/folderdisplay',
						data:{"token":$cookieStore.get("Usertoken")}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
									$scope.allData = response.data;
									$rootScope.allData =$scope.allData ;	

						}, function errorCallback(err) {
    							console.log(response);
						});

$http({

						method:'POST',
						url:'http://127.0.0.1:3000/generaldisplay',
						data:{"token":$cookieStore.get("Usertoken")}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
									$scope.genData = response.data;
									$rootScope.genData =$scope.genData ;	
									//console.log(response.data.general[0].created);
						}, function errorCallback(response) {
    							console.log(response);
						});

$scope.specified=function(x){
	$scope.FolderID=x;
	console.log(x);
	$scope.myData;
	$rootScope.myData=[];
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/searchByClick',
						data:{"token":$cookieStore.get("Usertoken"),"FolderID":$scope.FolderID}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
			            			//$scope.myData = response.data;
									$scope.myData = response.data.content[0].details;
									$rootScope.myData =$scope.myData ; 			
									//console.log(JSON.stringify(response.data.content[0].details));



								},function errorCallback(response) {
    							console.log(response);});
										
				}
$scope.showall=function(){
	$scope.myVar = !$scope.myVar;
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/moredisplay',
						data:{"token":$cookieStore.get("Usertoken"),"FolderID":$scope.FolderID}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
									$scope.moreData = response.data;
									$rootScope.moreData =$scope.moreData ; 
									
									//console.log(response.data.success);
									//console.log(JSON.stringify(response.data.content[0].details[0].created));*/
								});			

		}	
		$scope.new=function(name){

			$scope.folder_name=name;
	$http({

						method:'POST',
						url:'http://127.0.0.1:3000/folderadd',
						data:{"token":$cookieStore.get("Usertoken"),"folder_name":$scope.folder_name}
			})
			            .then(function successCallback(response) {
			            			$scope.groundFlag = true;
									$scope.newData = response.data;
									$rootScope.newData =$scope.newData ;
									$route.reload()
									//console.log(response.data.success);
									//console.log(JSON.stringify(response.data.content[0].details[0].created));*/
								});			

		}	




		 
});