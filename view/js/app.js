'use strict';

/* App Module */

var newchicApp = angular.module('newchicApp',[
	'ngRoute',
	'newchicAppControllers',
	'newchicAppServices'
]);

newchicApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/product',{
		templateUrl:'libs/product-list.html',
		controller:'ProductListCtrl'
	}).otherwise({
		redirectTo: '/product'
	});
}]);
