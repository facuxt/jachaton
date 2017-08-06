'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                });
            }
        ]
    )
    .config(['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG', function($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $urlRouterProvider
            .otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                //templateUrl: 'views/pages/home.html',
                controller: 'HomeController',
                controllerAs: 'm',
                //resolve: load(['scripts/controllers/SampleController.js'])
                templateUrl: "views/home.html"
            })
            .state('predictivo', {
                url: '/predictivo',
                //templateUrl: 'views/pages/home.html',
                controller: 'PredictivoController',
                controllerAs: 'm',
                //resolve: load(['scripts/controllers/SampleController.js'])
                templateUrl: "views/predictivo.html"
            })


        function mainResolver(srcs, callback){
            var toReturn = load(srcs, callback);
            toReturn.auth = ['authorization',
                function(authorization) {
                    return authorization.authorize();
                }
            ]
            return toReturn;
        }
        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function(src) {
                            promise = promise.then(function() {
                                angular.forEach(MODULE_CONFIG, function(module) {
                                    if (module.name == src) {
                                        if (!module.module) {
                                            name = module.files;
                                        } else {
                                            name = module.name;
                                        }
                                    } else {
                                        name = src;
                                    }
                                });
                                return $ocLazyLoad.load(name);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function() {
                            return callback();
                        }) : promise;
                    }
                ]
            }
        }
    }]);
