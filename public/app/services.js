var app = angular.module('textSupport');

app.service('MessageService', function($http){

	this.sendMessage = function(message, number){
		console.log(11111)
		return $http({
			method: 'POST',
			url: 'http://localhost:8888/support/messages/',
			data: {
				message: message,
				to: number
			}
		})
	}
})