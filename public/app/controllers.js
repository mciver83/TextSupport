var app = angular.module('textSupport');

app.controller('mainCtrl', function($scope, $firebaseObject, MessageService){

$scope.numbers = $firebaseObject(new Firebase('https://textsupport01.firebaseio.com/numbers'));

$scope.sendMessage = function(message, number){
	MessageService.sendMessage(message, number).then(function(response){
		$scope.newMessage = ''
	})
}

})