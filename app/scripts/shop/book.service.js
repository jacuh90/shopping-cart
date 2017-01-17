'use strict';

angular.module('cartApp')
    .factory('bookService', bookService);

bookService.$inject = [
    '$resource',
    'BASE_URL'
];

function bookService($resource, BASE_URL) {
    return $resource(BASE_URL + "books/:id", null, {
        'update' : {
            method : 'PUT'
        }
    });
}