/**
* Services Module with api GitHub
*/
angular.module('Services',[])
.factory('repositoriesService', ['$http', function($http){
	var respositoryRequest = function(){
		return $http({
			method: 'JSONP',
			url: 'https://api.github.com/users/globocom/repos?callback=JSON_CALLBACK'
		});
	};
	return {
		event: function(){
			return respositoryRequest();
		}
	};
}]).factory('commitsRepositoryService', ['$http', function($http){
	var commitsRequest = function(repos){
		return $http({
			method: 'JSONP',
			url: 'https://api.github.com/repos/globocom/'+repos+'/commits?callback=JSON_CALLBACK'
		});
	};
	return {
		event: function(repos){
			return commitsRequest(repos);
		}
	};
}]);

/**
* Main Module
*/
var app = angular.module('ApiGit', ['Services', 'ngRoute', 'angularUtils.directives.dirPagination']);

/**
* Config - Single Page Application
* $routeProvider
* description: To define the routes the page application
**/
app.config(function($routeProvider, $locationProvider) {
 $routeProvider
 .when('/', {controller: 'repositoriesController'})
 .when('/:nameRepo', {templateUrl:'/views/repositories.html', controller: 'routeNameController'})
 .otherwise({redirectTo: '/'});
 $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
 });
});

/**
* repositoriesController
* description: bring Globocom repositories
**/
app.controller('repositoriesController', function($scope, repositoriesService, commitsRepositoryService){
	$scope.repositories = [];
	$scope.repos = [];
	
	/* Bring the Globocom repositories */
	repositoriesService.event().success(function(data,status) {
		$scope.repositories = data.data;
	});

	/* Pass data of repository */
	$scope.dataRepository = function(obj) {
		$scope.repository = obj;
		$scope.repos = obj.name;
	};
	
	/* bring list commits */
	$scope.$watch('repos', function(newRepos){
		if(newRepos) {
			commitsRepositoryService.event(newRepos).success(function(data,status) {
				$scope.commits = data.data;
				console.info($scope.commits);
			});
		}
	});
	
});

/**
* routeNameController
* description: control routes names
**/
app.controller('routeNameController', function($scope, $routeParams){
 $scope.nameRepo=$routeParams.nameRepo;
});