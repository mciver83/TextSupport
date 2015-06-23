var app = angular.module('textSupport', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/main.html'
	})
	.when('/support', {
		templateUrl: 'app/views/support.html',
		controller: 'mainCtrl'
	})
	.otherwise('/')
});