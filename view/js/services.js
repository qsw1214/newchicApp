'use strict';

/* Services */

var newchicAppServices = angular.module('newchicAppServices',['ngResource']);

newchicAppServices.factory('Product',['$resource',function($resource){
	return $resource('http://mbeta.newchic.com/index.php?com=index&t=huiText', {}, {
  		query: {method:'GET'}
	});
}]);