(function () {
    'use strict';
 
    angular
        .module('code2chart')
        .controller('aboutController', aboutController);
 
    aboutController.$inject = ['$scope','$mdDialog'];
 
    function aboutController($scope,$mdDialog) {
    	
    	$scope.openFromLeft = function() {
    		$mdDialog.show(
    			$mdDialog.alert()
    			.clickOutsideToClose(true)
		        .title('Additional Information')
		        .textContent('Closing to the right!')
		        .ariaLabel('Left to right demo')
		        .ok('Nice!')
		        // You can specify either sting with query selector
		        .openFrom('#left')
		        // or an element
		        .closeTo(angular.element(document.querySelector('#right')))
    		);
    	};
    	
    	function Person (fullname,age,bio){
    		    this.name = fullname;
    		    this.age = age;
    		    this.bio = bio;
    		};
    	
    	$scope.team = [];
    	
    	var rodri = new Person("Rodrigo Vazquez",22,"Universidad Tecnologica Nacional - FRBA" +
    			"Trabaja en Ford Motor Company");
    	var koiffo = new Person("Ivan Koiffman",22,"Universidad Tecnologica Nacional - FRBA" +
    			"Trabaja en Base4");
    	var santi = new Person("Santiago Varela",23,"Universidad Tecnologica Nacional - FRBA" +
    			"Trabaja en Siemens");
    	var jony = new Person("Jonatan Martinez",22,"Universidad Tecnologica Nacional - FRBA" +
    			"Trabaja en EY");
    	var nico = new Person("Nicolas Taccari",22,"Universidad Tecnologica Nacional - FRBA" +
    			"Trabaja en ExxonMobil");
    	
    	$scope.team.push(rodri);
    	$scope.team.push(koiffo);
    	$scope.team.push(santi);
    	$scope.team.push(jony);
    	$scope.team.push(nico);
    }
})();