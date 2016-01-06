angular.module('starter')
.controller('LoginCtrl',function($scope, $http, $location){
  $scope.loading = false;
  $scope.form = {
    token: ''
  };
  $scope.ingresar = function(form){
    $scope.loading = true;
    console.log(form.token);
    $http({
         method: 'POST',
         url: 'http://localhost:3000/login/validate_token',
         data: 'token=' + form.token,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function(data, status, headers, config) {
         if(data.status == 'ok'){
           $location.path( "/" );
         }else{
           console.log('error');
         }
       });
  }
});
angular.module('starter')
.controller('HomeCtrl',function($scope, $http, $location,$ionicPopup){
  $scope.popUp = function(){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Enviar notificacion',
     template: 'Are you sure you want to eat this ice cream?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
  }
});
