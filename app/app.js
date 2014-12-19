'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'textAngular',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.notes',
  'myApp.login'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/notes'});
}]);
//<input focus-on="noteCleared">link
app.directive('focusOn', function(){
  return function(scope, element, attributes) {
    scope.$on(attributes.focusOn, function(){
      element[0].focus();
    });
  };

});
