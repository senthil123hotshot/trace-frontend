'use strict';

angular.module('myApp.folders', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/folders', {
    templateUrl: 'folders/folders.html',
    controller: 'FoldCtrl'
  });
}])

.controller('FoldCtrl', function($scope,$http,$rootScope,$location,$cookieStore) {				
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
									$scope.myData = response.data.content;
									$rootScope.myData =$scope.myData ; 			
									console.log(JSON.stringify($scope.myData));
								},function errorCallback(response) {
    							console.log(response);});
										
				}
$scope.showall=function(){
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
});