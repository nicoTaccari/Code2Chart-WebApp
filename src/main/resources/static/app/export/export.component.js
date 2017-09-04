(function () {
    'use strict';
 
    angular
        .module('code2chart')
        .component('exportComponent', {
            templateUrl:  'app/export/export.html',
            controller: 'exportController',
            controllerAs: 'vm',
            require: {
                // access to the functionality of the parent component called 'formComponent'
                parent: '^formComponent'
            },
            bindings: {
                // send a changeset of 'formData' upwards to the parent component called 'formComponent'
                formData: '<'
            }
        })
})();