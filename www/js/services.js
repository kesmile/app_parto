angular.module('starter').service('TokenServices',['$document',
      function($document){
    var _isActive = false;
    var _token = '';
    this.isActive = function(){
      return _isActive;
    }
    this.setToken = function(token){
      _token = token;
    }
    this.getToken = function(){
      return _token;
    }
}]);
