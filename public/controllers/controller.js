var myApp = angular.module('RecipediaApp', ['ngRoute']);

myApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'home.html',
			controller: 'MainController'
		}).
		when('/submit', {
			templateUrl: 'submit.html',
			controller: 'SubmitController'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

myApp.controller('MainController', ['$scope', '$http',
	function($scope, $http) {
		console.log("Hello World from controller");

		var refresh = function() {
			$http.get('/recipedia').success(function(response) {
				console.log("Got the data I requested!");
				$scope.recipedia = response;
				$scope.recipe = "";
			});
		};

		refresh();

		$scope.incrementUpvotes = function(recipeId) {
			console.log(recipeId);
			$http.get('/recipedia/' + recipeId).success(function(response) {
				$scope.recipe = response;
				refresh();
			});
		};


		$scope.showRecipe = function() {
			console.log("showRecipe");
		}
/**
		var refresh = function() {
			$http.get('/contactlist').success(function(response) {
				console.log("I got the data I requested");
				$scope.contactlist = response;
				$scope.contact = "";

			});
		}

		refresh();

		$scope.addContact = function() {
			console.log($scope.contact);
			$http.post('/contactlist', $scope.contact).success(function(response) {
				console.log(response);
				refresh();
			});
		}

		$scope.removeContact = function(contactId) {
			console.log(contactId);
			$http.delete('/contactlist/' + contactId).success(function(response) {
				console.log(response);
				refresh();
			});
		}

		$scope.edit = function(contactId) {
			$http.get('/contactlist/' + contactId).success(function(response) {
				$scope.contact = response;
			})
		}

		$scope.update = function() {
			console.log($scope.contact._id);
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
				refresh();
			})
		}

		$scope.deselect = function() {
			$scope.contact = "";
		} */
	}]
);

myApp.controller('SubmitController', ['$scope', '$http',
	function($scope, $http) {
		console.log("Hello World from Submit Controller"); 

		$scope.submitRecipe = function() {
			console.log("Clicked submit recipe!");

			$scope.recipe.upvotes = 0;

			$http.post('/recipedia', $scope.recipe).success(function(response) {
				console.log(response);
			});

			window.location = "#/";
		};
	}]
);