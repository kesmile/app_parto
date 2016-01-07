angular.module('starter')
.controller('LoginCtrl',function($scope, $http, $location,$ionicPopup,TokenServices){
  $scope.loading = false;
  $scope.form = {
    token: ''
  };
  $scope.ingresar = function(form){
    $scope.loading = true;

    $http({
         method: 'POST',
         url: 'http://fotoscomadronas.herokuapp.com/login/validate_token',
         data: 'token=' + form.token,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function(data, status, headers, config) {
         if(data.status == 'ok'){
           TokenServices.setToken(form.token);
           $location.path( "/" );
         }else{
           var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'Token invalido'
            });

            alertPopup.then(function(res) {

            });
            $scope.loading = false;
         }
       }).error(function (data, status) {
         console.log(status);
         var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: data
          });

          alertPopup.then(function(res) {

          });
          $scope.loading = false;
        });
  }
});
angular.module('starter')
.controller('HomeCtrl',function($scope, $http, $location,$ionicPopup,TokenServices,$cordovaToast){
  $scope.popUp = function(tipo){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Enviar notificacion',
     template: '¿Esta seguro que de desea enviar una notificacion?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $http({
            method: 'POST',
            url: 'http://fotoscomadronas.herokuapp.com/dashboard/add_evento',
            data: 'token=' + TokenServices.getToken() +'&tipo=' + tipo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
            $cordovaToast
              .show('¡Mensaje enviado exitosamente!', 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
          });
     }
   });
  }
});
