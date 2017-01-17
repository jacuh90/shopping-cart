'use strict';

angular.module('cartApp')
    .controller('BooksController', BooksController);

BooksController.$inject = [
    'books',
    'cartService',
    'BASE_URL',
    'toastr'
];

function BooksController(books, cartService, BASE_URL, toastr) {
    var vm = this;

    vm.BASE_URL = BASE_URL;
    vm.books = books;
    vm.tab = 1; // corresponds to all categories
    vm.category = '';

    // Public Functions
    vm.addToCart = addToCart;
    vm.selectCategory = selectCategory;
    vm.isTabSelected = isTabSelected;

    function addToCart(book) {
        cartService.addToCart(book.id, 1);

        toastr.success('has ben added to the cart!', book.title);
    }

    function selectCategory(id) {
        vm.tab = id;
        switch (id) {
            case 2:
                vm.category = 'fiction';
                break;
            case 3:
                vm.category = 'fantasy';
                break;
            case 4:
                vm.category = 'classic';
                break;
            case 5:
                vm.category = 'biography';
                break;
            default:
                vm.category = '';
        }
    }

    function isTabSelected(id) {
        return (vm.tab === id);
    }
}