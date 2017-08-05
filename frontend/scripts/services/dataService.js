/*
* Servicio proveedor de links para datos/requests
*
* Author: Facundo Caselles
*/

app.service('dataService', ['$mdDialog','$mdToast', '$q', '$http', '$stateParams', '$rootScope', function($mdDialog, $mdToast, $q, $http, $stateParams, $rootScope){

    var local = this;
    local.isLoading = true;

    $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
        if(local.isLoading){
            local.isLoading = false;
        }
    })
}]);
