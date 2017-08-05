/**
 * Created by Facundo Caselles on 15/6/16.
 */
app.service('toasterService', ['$mdToast', function($mdToast){
    this.pop = function(type, title, message){
        //TODO cambiar color del toaster de mdesign acorde al type.
        if(!title){
            title = "";
        }
        if(!message){
            message= "";
        }
        $mdToast.show(
            $mdToast.simple()
                .content(title+" "+message)
                .position("top right")
                .hideDelay(3000)
        );
    }
}]);