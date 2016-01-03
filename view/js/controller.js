'use strict';

/* Controllers */

var newchicAppControllers = angular.module('newchicAppControllers',[]);

newchicAppControllers.controller('ProductListCtrl',['$scope','Product',	function($scope,Product){
		$scope.product = Product.query();
		//console.log($scope.product)
		var obj = Product.query();
		//console.log(obj);
		for (var pro in $scope.product){
			console.log(pro.$promise);
		}
		/*var datas = Product.query();
		console.log(datas);
		$scope.product=[];
		angular.forEach(datas,function(i,val){
			var pro=new Object();
			pro.title=val["products_name"];
			pro.price=val["products_price"];
			pro.img=val["image_url"];
			$scope.product.push(pro);
		});*/
	}
]);
