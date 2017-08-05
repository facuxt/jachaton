app.controller('HomeController', ['$mdDialog', function($mdDialog){
    var m=this;
    
    m.openDialog = function(title, uri){
        function DialogController($scope, $mdDialog, uri) {
            var m = this;
            m.uri = uri;
            $scope.hide = function() {
            $mdDialog.hide();
            };

            $scope.cancel = function() {
            $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            };
        }
        $mdDialog.show({
            templateUrl: 'views/iframe.html',
            controller: DialogController,
            controllerAs: 'm',
            locals: {
                uri: uri
            }
        })
    }
    
}])