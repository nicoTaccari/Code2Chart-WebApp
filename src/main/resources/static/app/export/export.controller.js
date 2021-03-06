(function () {
    'use strict';
 
    angular
        .module('code2chart')
        .controller('exportController', exportController);
    	
    exportController.$inject = ['$location','dataFactory','toaster','$scope','gapiAuthService','driveService'];
    	
    function exportController($location,dataFactory,toaster,$scope,gapiAuthService,driveService) {
        var vm = this;
        vm.title = '¿Que desea hacer con su archivo?';
        vm.formData = {};
        var saveLocal = true;
                
        $scope.redirectToNewForm = function(){
        	$location.url('/fileUpload.html');
        };
        
        $scope.generateLocal = function(){
        	saveLocal = true;
        	$scope.generate();
        }
        
        $scope.checkConnection = function(){
        	saveLocal = false;
        	$scope.check();
        }
        
        $scope.generateDrive = function(){
        	if(!($scope.loggedIn)){
        		$scope.login();
        	}    	
        	
        	$scope.generate();
        }
        
        $scope.generate = function(){
        	
        	var formData = new FormData();
        	
        	if(vm.parent.getFile()[0] == null){
        		var dummyFile = new File(["foo"], "foo.txt");
        		vm.parent.getFile().push(dummyFile);
        	}
        	formData.append("file", vm.parent.getFile()[0]);
        	formData.append('model', new Blob([JSON.stringify(vm.parent.getData())], {
        	                type: "application/json"
        	            }));
	
	    	dataFactory.generarDiagrama(formData)
	    		.then(function (response){
	    			var fileName = vm.parent.getData().name + '-' + vm.parent.getData().author +  '.png';
	    			if(saveLocal){
		    			saveAs(response, fileName);
		    			toaster.success("Su archivo ha sido generado con exito!");
	    			}else{
	    				var driveFile = new File([response],fileName);
	    				var filesArray = [];
	    				filesArray.push(driveFile);
	    				$scope.upload(filesArray);
	    			}
	    			
	    		}, function (error){
	    			toaster.error("No se ha podido generar el diagrama. Vuelva a intentarlo"); 
	    		});
        };
        
        $scope.check = function(){
        	gapiAuthService.checkLogin().then(function(){
                $scope.loggedIn=true;
            },function(){
                $scope.loggedIn=false;
            }).finally(function(){
                $scope.generateDrive();
            })
        };
        
        $scope.login=function(){
            gapiAuthService.login().then(function(){
                $scope.loggedIn=true;
            },function(authResult){
                $scope.loggedIn = false;
                console.err(authResult);
            })
        };

        //Drive

        $scope.images=[];

        $scope.upload=function(filesArray){
            $scope.uploading=true;
            
            var file = filesArray[0];

            driveService.insertFile(file, file.name).then(function(link){
                $scope.images.push(link);
            }).finally(function(){
                $scope.uploading=false;
                toaster.success("Su archivo ha sido subido a su cuenta de Google Drive")
            });
        }
    }
})();