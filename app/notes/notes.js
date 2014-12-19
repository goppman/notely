'use strict';

var noteApp = angular.module('myApp.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

noteApp.controller('NotesController', function($scope, NotesBackend) {

  NotesBackend.fetchNotes();

  //  $scope.buttonDelete = function(note){
  //    if (note.id) {
  //
  //    }else {
  //
  //    }
  //  };

  $scope.user = function() {
    return NotesBackend.getUser();
  };

   $scope.buttonText = function(note) {
     if (note && note.id) {
       return 'update note';
     } else {
       return 'create note';
     }

   };

   $scope.notes = function(){
     return NotesBackend.getNotes();
   };

   $scope.hasNotes = function () {
     return this.notes().length > 0;
   };

   $scope.findNote = function(noteId){
     var notes = this.notes();
     for (var i=0; i < notes.length; i++){
       if (notes[i].id === noteId){
         return notes[i];
       }

     }

   };



  $scope.clearNote = function(){
   //clearing note in entry form
    $scope.note = {};
    $scope.$broadcast('noteCleared');

  };

  $scope.deleteNote = function(){
    NotesBackend.deleteNote($scope.note);
    $scope.clearNote();

  };

   $scope.loadNote = function(noteId) {
     $scope.note = JSON.parse(JSON.stringify(this.findNote(noteId)));
   };

  $scope.commit = function(){
    if ($scope.note && $scope.note.id){

        NotesBackend.updateNote($scope.note);

    }else {
      NotesBackend.postNote($scope.note);

      //post new not
    }

  };


});
