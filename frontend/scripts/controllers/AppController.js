
 app.config(function($httpProvider) {
		//Enable cross domain calls
		$httpProvider.defaults.useXDomain = true;
});
angular.module('app')
	.controller('AppController', ['$scope', '$window', '$document', '$location', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette', 'dataService', '$http', '$q',
				  function ( $scope,   $window,   $document,   $location,   $rootScope,   $timeout,   $mdSidenav,   $mdColorPalette,   dataService,   $http ,  $q) {

	// config
	$scope.app = {
		name: 'AngularSeed for twomonkeys',
		version: '0.0.0',
		setting: {
			theme: {
				primary: 'cyan',
				accent: 'blue',
				warn: 'light-blue'
			},
			asideFolded: true
		},
		search: {
			content: '',
			show: false
		}
	}

}]);

app.factory('httpInterceptor', function($q, $injector, $rootScope) {
    return {
      request: function(config) {
            //console.log(JSON.stringify(config));
            // var $sessionStorage = $injector.get('$sessionStorage');
            // config.headers.Authorization = $sessionStorage.token;
            return config;
      },
      responseError: function(rejection) {
      	//var stateService = $injector.get('$state');
        //var mdDialog = $injector.get('$mdDialog');
        // var $sessionStorage = $injector.get('$sessionStorage');
        // var $state = $injector.get('$state');
        // var $mdDialog = $injector.get('$mdDialog')
        // var $stateParams = $injector.get('$stateParams')
        switch(rejection.status){
        	// case 404:
         //      $mdDialog.cancel(); //shortcut dialog force close.
        	// 	  $state.go("404", {operator: $stateParams.operator});
        	//   break;
        	default:
        		alert("Se detectó un error al tratar de llamar al servicio \""+rejection.config.url+"\": ERROR "+rejection.status);
        	  break;
        }
        return $q.reject(rejection);
      }
    };
  });

app.config(['$httpProvider', function($httpProvider) {
		//Http Intercpetor to check auth failures for xhr requests
		//$httpProvider.interceptors.push('httpInterceptor');
}]);

app.config(function($mdDateLocaleProvider, $mdThemingProvider) {
  $mdThemingProvider.theme('default').dark(); 
  $mdDateLocaleProvider.months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  $mdDateLocaleProvider.shortMonths = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  $mdDateLocaleProvider.days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mie', 'Jue', 'Vie', 'Sab'];
  $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Semana ' + weekNumber;
  };
  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'D/M/YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
    // Example uses moment.js to parse and format dates.
  $mdDateLocaleProvider.formatDate = function(date) {
  	if(date==null || date == undefined || date == ""){
  		return ""
  	}else{
    	return moment(date).format('D/M/YYYY');
  	}
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir en calendario';
});

app.filter('makeLittle', function() {
  return function(item) {
    if(item){
      if(item.length>20){
        return item.substr(0,17)+"...";
      }else{
        return item;
      }
    }
    return item;
  };
});
