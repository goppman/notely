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


app.service('NotesBackend', function($http) {

    var apiBasePath =  'https://elevennote-nov-2014.herokuapp.com/api/v1/';
    var postNotePath = apiBasePath +  'notes';
    var apiKey = '$2a$10$zO5VPjSSrfJn3tXjk873VubX/ckdlj5HQC7/yTZ/WF.6dwjzehSd.';
    var notes = [];


   this.deleteNote= function(note){
            var self = this;
             $http.delete(apiBasePath + 'notes/' + note.id + '?api_key=' + apiKey)
             .success(function() {
              self.fetchNotes();

             });
   };



    this.getNotes = function () {
      // get retrieves an object in a http server
      return notes;
    };

    this.fetchNotes = function () {
      $http.get(apiBasePath + 'notes.json?api_key=' + apiKey).success(function(noteData){
        notes = noteData;
      });

    };
    this.postNote = function(note) {
// post adds an object in a http server
          $http.post(postNotePath, {
            api_key: apiKey,
            note:{
              title: note.title,
              body_html: note.body_html
            }
          }).success(function(noteData){
             notes.unshift(noteData);
        });
    };

    this.replaceNote = function(note){
            for(var i=0; i <notes.length; i++){
              if (notes[i].id === note.id){
                notes[i] = note;

            }
          }
    };



    this.updateNote = function(note){
      // put updates an object in a http server
      var self = this;
      $http.put(apiBasePath + 'notes/' + note.id, {
        api_key: apiKey,
        note: note,
      }).success(function(newNoteData) {
      //  self.fetchNotes();
      self.replaceNote(newNoteData)

      })
    };

});
