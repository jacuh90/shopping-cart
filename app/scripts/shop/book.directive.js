'use strict';

angular.module('cartApp')
    .directive('book', function () {
        return {
            templateUrl: 'views/bookDirective.html'
        };
    });