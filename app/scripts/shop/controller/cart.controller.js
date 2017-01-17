'use strict';

angular.module('cartApp')
    .controller('CartController', CartController);

CartController.$inject = [
    'cart',
    'cartService',
    'bookService',
    'BASE_URL',
    'toastr'
];

function CartController(cart, cartService, bookService, BASE_URL, toastr) {
    vm = this;

    vm.BASE_URL = BASE_URL;
    vm.cart = cart;
    vm.total = 0;

    vm.addItem = addItem;
    vm.removeItem = removeItem;
    vm.checkout = checkout;

    init();

    function addItem(id, quantity) {
        cartService.addToCart(id, quantity);
        _getBooks(vm.cart);
    }

    function removeItem(id, quantity) {
        cartService.deleteFromCart(id, quantity);
        _getBooks(vm.cart);
    }

    function checkout() {
        toastr.success('Wish you a great day!', 'Amount to pay: ' + vm.total);
    }

    function init() {
        _getBooks(vm.cart);
    }

    function _getBooks(cart) {
        vm.books = [];
        vm.total = 0;
        angular.forEach(cart, function(value) {
            bookService.get({id:parseInt(value.id, 10)}).$promise.then(function(response) {
                response.quantity = value.quantity;
                vm.books.push(response);
                vm.total += value.quantity * response.price;
            });
        });
    }
}