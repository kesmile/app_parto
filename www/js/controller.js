angular.module('starter')
.controller('LoginCtrl',function($scope, $http, $location,$ionicPopup,
            TokenServices,$cordovaSQLite,$cordovaToast,$rootScope,$timeout,$ionicHistory){
  if(TokenServices.isActive()){
    $location.path( "/" );
  }
  $scope.loading = false;
  $scope.form = {
    token: ''
  };
  var db = {};
  $scope.url_p = 'http://fotoscomadronas.herokuapp.com/'; //http://fotoscomadronas.herokuapp.com/
  //base de datos
  $scope.status = false;
   $timeout(function () {
    db = $cordovaSQLite.openDB( 'parto.db', 1 );
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT  EXISTS login (id integer primary key,token TEXT, status INTEGER DEFAULT 0)");
      $cordovaSQLite.execute(db,"SELECT * FROM login WHERE id = ?", [1]).then(function(res) {
        if(res.rows.length > 0){
          TokenServices.setToken(res.rows.item(0).token);
          $ionicHistory.nextViewOptions({
              disableBack: true
            });
          $location.path( "/" );
        }
      }, function (err) {
          //$location.path( "/login" );
        });
   }, 500);

  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS login (id integer primary key, status INTEGER DEFAULT 0)");
  $scope.ingresar = function(form){
    $scope.loading = true;
    $http({
         method: 'POST',
         url: $scope.url_p + 'login/validate_token',
         data: 'token=' + form.token,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function(data, status, headers, config) {
         if(data.status == 'ok'){
           $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS login (id integer primary key,token TEXT, status INTEGER DEFAULT 0)");
           var query = "INSERT OR REPLACE INTO login (id,token,status) VALUES (?,?,?)";
             $cordovaSQLite.execute(db, query, [1,form.token,1]).then(function(res) {
               TokenServices.setToken(form.token);
               $ionicHistory.nextViewOptions({
                   disableBack: true
                 });
               $location.path( "/" );
             }, function (err) {
               $cordovaToast
                 .show('Error en guardar', 'long', 'center')
                 .then(function(success) {
                   // success
                 }, function (error) {
                   // error
                 });
             });
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
.controller('HomeCtrl',function($scope, $http, $location,$ionicPopup,
                  TokenServices,$cordovaToast,$cordovaMedia){
  var media = new Media('/android_asset/www/img/audios/1.m4a', null, null, null);
      media.play();
  $scope.url_p = 'http://fotoscomadronas.herokuapp.com/';
  $scope.selectSub = function(){
    console.log('sub');
    $location.path( "/sub" );
  };
  $scope.popUp = function(tipo){
    if(tipo== 'ataques'){
      media = new Media('/android_asset/www/img/audios/2.m4a', null, null, null);
          media.play();
    }else if (tipo=='infeccion') {
      media = new Media('/android_asset/www/img/audios/3.m4a', null, null, null);
          media.play();
    }
    var confirmPopup = $ionicPopup.confirm({
     title: 'Enviar notificacion',
     template: '¿Esta seguro que de desea enviar una notificacion?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $http({
            method: 'POST',
            url: $scope.url_p + 'dashboard/add_evento',
            data: 'token=' + TokenServices.getToken() +'&tipo=' + tipo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
            var media = new Media('/android_asset/www/img/audios/s.m4a', null, null, null);
                media.play();
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
angular.module('starter')
.controller('SubCtrl',function($scope, $http, $location,$ionicPopup,TokenServices,$cordovaToast,$timeout){
  $scope.url_p = 'http://fotoscomadronas.herokuapp.com/';
  $scope.popUpSub = function(tipo){
    if(tipo== 'hemorragia-mucha-sangre'){
      media = new Media('/android_asset/www/img/audios/sub/1.m4a', null, null, null);
          media.play();
    }else if (tipo=='hemorragia-necesito-ayuda') {
      media = new Media('/android_asset/www/img/audios/sub/2.m4a', null, null, null);
          media.play();
    }else if (tipo=='hemorragia-placenta') {
      media = new Media('/android_asset/www/img/audios/sub/3.m4a', null, null, null);
          media.play();
    }
    var confirmPopup = $ionicPopup.confirm({
     title: 'Enviar notificacion',
     template: '¿Esta seguro que de desea enviar una notificacion?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       $http({
            method: 'POST',
            url: $scope.url_p + 'dashboard/add_evento',
            data: 'token=' + TokenServices.getToken() +'&tipo=' + tipo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
            var media = new Media('/android_asset/www/img/audios/s.m4a', null, null, null);
                media.play();
                $timeout(function(){
                  $location.path( "/" );
                },5000);
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
