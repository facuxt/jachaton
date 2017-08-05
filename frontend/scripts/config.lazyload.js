// lazyload config

angular.module('app')
  .constant('MODULE_CONFIG', [
      {
          name: 'ui.select',
          module: true,
          files: [
              '../libs/angular/angular-ui-select/dist/select.min.js',
              '../libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name: 'jquery.ui',
          module: false,
          files: [
              '../libs/jquery/jquery.ui/jquery-ui.min.css',
              '../libs/jquery/jquery.ui/jquery-ui.min.js',
              '../libs/jquery/jquery.ui/jquery-ui.structure.min.css',
              '../libs/jquery/jquery.ui/jquery-ui.theme.min.css',
          ]
      },
      {
          name: 'ui.bootstrap.datetimepicker',
          module: true,
          files: [
              '../libs/angular/bootstrap-ui-datetime-picker/ui.bootstrap.datetimepicker.js'
          ]
      },
      {
          name: 'isteven-multi-select',
          module: false,
          files: [
             '../libs/angular/angular-multi-select/isteven-multi-select.css'
          ]
      }
    ]
  )
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      $ocLazyLoadProvider.config({
          debug: false,
          events: false,
          serie: true, //Async
          modules: MODULE_CONFIG
      });
  }]);
