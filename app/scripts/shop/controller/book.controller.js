'use strict';

angular.module('cartApp')
    .controller('BookController', BookController);

BookController.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    'book',
    'BASE_URL'
];

//TODO - implement the Book details Page
function BookController(book, BASE_URL) {
    var vm = this;

    vm.BASE_URL = BASE_URL;
    vm.book = book;

    console.log(vm.book);
}