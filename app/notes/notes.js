'use strict';

angular.module('myApp.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', function($scope, $http) {
  var apiBasePath =  'https://elevennote-nov-2014.herokuapp.com/api/v1/';
  var postNotePath = apiBasePath +  'notes';
  var apiKey = '$2a$10$zO5VPjSSrfJn3tXjk873VubX/ckdlj5HQC7/yTZ/WF.6dwjzehSd.';
  var notes = [];

    $http.get(apiBasePath + 'notes.json?api_key=' + apiKey).success(function(noteData){
      $scope.notes = noteData;
    });

  $scope.commit = function(){

    console.log('it is commited');
    $http.post(postNotePath, {
      api_key: apiKey,
      note:{
        title: 'Cool Title',
        body_html: 'Less Cool Body'
      }
    }).success(function(successData){
    console.log('Success');
    console.log(successData)
  }).error(function(errorData){
      console.log('error');
      console.log(errorData);
    });
  };


});
