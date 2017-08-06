app.controller('HomeController', ['$mdDialog', '$timeout', '$state', function($mdDialog, $timeout, $state){
    var m=this;
    m.searchText = "";
    m.simulateQuery = false;
    m.isDisabled    = false;

    // list of `state` value/display objects
    m.states        = loadAll();
    m.querySearch   = querySearch;

    m.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }
    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }
    m.selectedItemChange = selectedItemChange;
    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? m.states.filter( createFilterFor(query) ) : m.states,
          deferred;
      if (m.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'XWE23, XWE03, XWE04, XWE19, XWE23, XWA22';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
    m.goto = function(where){
        if(where=="predictivo.html"){
            $state.go("predictivo");
        }
    }
    m.openDialog = function(htmlFile){
        if(!htmlFile){
            return;
        }
        function DialogController($scope, $mdDialog) {
            var m = this;
            $scope.hide = function() {
            $mdDialog.hide();
            };

            $scope.cancel = function() {
            $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            };
            m.parts = [{
                description: "Motor",
                warn: false,
                danger: false,
                info: "Componente sin problemas."
            },{
                description: "Caja de cambios",
                warn: true,
                danger: false,
                info: "La pieza está llegando al limite de tiempo recomendado por el fabricante, aunque según nuestros registros, la pieza puede que siga funcionando 3 meses mas."
            },{
                description: "Cubiertas delanteras",
                warn: true,
                danger: false,
                info: "La pieza está llegando al limite de tiempo recomendado por el fabricante, aunque según nuestros registros, la pieza puede que siga funcionando 3 meses mas."
            },{
                description: "Cubiertas traseras",
                warn: false,
                danger: true,
                info: "Si bien aún no supera el tiempo recomendado por el fabricante, la pieza sobrepasó el limite de tiempo predictivo, se recomieda realizar el cambio"
            },{
                description: "Aceite",
                warn: false,
                danger: false,
                info: "Componente sin problemas"
            }]
        }
        $mdDialog.show({
            templateUrl: 'views/'+htmlFile,
            controller: DialogController,
            controllerAs: 'm',
        })
    }
    m.menuItems=[{
        name: "Laboratorio",
        qty: 10342
    },{
        name: "Observaciones",
        qty: 201
    },{
        name: "Reportes",
        qty: 34
    },{
        name: "Taller",
    },{
        name: "Predictivo",
        secondWord: "Preventivo",
        htmlFile: "predictivo.html"
    },{
        name: "Vims",
        //qty: 45
    },{
        name: "Dispatch",
        //qty: 12
    },]
    m.warnings=[{
        date: "26/06/2017",
        mionca: "XWE22",
        description: "Aceite superó las 1000ppm de hierro",
        codigo: "E4291-1",
        danger: true
    },{
        date: "26/06/2017",
        mionca: "XWE23",
        description: "Medición sonda lambda llegando a limite (<30ppm)",
        codigo: "F3829-2",
        danger: false
    },{
        date: "26/06/2017",
        mionca: "XWE11",
        description: "Aceite con niveles de nickel al límite (<40ppm)",
        codigo: "F3829-2",
        danger: false
    }]
    m.events=[{
        date: "26/06/2017",
        mionca: "XWE22",
        description: "Aceite con valores fuera de peligro.",
    },{
        date: "26/06/2017",
        mionca: "XWE12",
        description: "Checklist normal.",
    },{
        date: "26/06/2017",
        mionca: "XWE33",
        description: "Maquinaria operativa, ultimo reporte a las 14:31hs",
    }]

    types = []
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function addRandomVal(){
        $timeout(function(){
            var item=angular.copy(m.warnings[getRandomInt(0,2)])
            item.mionca = "XW"+getRandomInt(0,200);
            item.rand = new Date().getTime();
            m.warnings.push(item)

            var event = angular.copy(m.events[getRandomInt(0,2)]);
            event.mionca = "XWE"+getRandomInt(0,200);
            event.rand = new Date().getTime();
            m.events.push(event);
            addRandomVal();
        },5000)
    }
    addRandomVal();
}])
app.controller("PredictivoController", [function(){
    this.parts = [{
        description: "Motor",
        warn: true,
        danger: false,
        info: "Componente al límite de km sugeridos por el fabricante.",
        actual: 252,
        preventivo: 300,
        predictivo: 292.66
    },{
        description: "Caja de cambios",
        warn: false,
        danger: true,
        info: "La pieza está llegando al limite de tiempo recomendado.",
        actual: 340,
        preventivo: 380,
        predictivo: 349
    },{
        description: "Cubiertas delanteras",
        warn: true,
        danger: false,
        info: "La pieza está llegando al limite de tiempo recomendado por el fabricante, aunque según nuestros registros, la pieza puede que siga funcionando 3 meses mas.",
        actual: 123,
        preventivo: 200,
        predictivo: 500
    },{
        description: "Cubiertas traseras",
        warn: false,
        danger: true,
        info: "Si bien aún no supera el tiempo recomendado por el fabricante, la pieza sobrepasó el limite de tiempo predictivo, se recomieda realizar el cambio",
        actual: 123,
        preventivo: 200,
        predictivo: 500
    },{
        description: "Aceite",
        warn: false,
        danger: false,
        info: "Componente sin problemas",
        actual: 123,
        preventivo: 200,
        predictivo: 500
    }]
}])