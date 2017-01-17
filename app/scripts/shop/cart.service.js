'use strict';

angular.module('cartApp')
    .factory('cartService', cartService);

cartService.$inject = [
    '$localStorage'
];

function cartService($localStorage) {
    var cart = $localStorage.getObject('shopping-cart', '[]');

    return {
        addToCart: function(index, quantity){
            var length = cart.length,
                isNew = true;

            if (length == 0) {
                cart.push({id: index, quantity: quantity});
            } else {
                for (var i = 0; i < length; i++) {
                    if (cart[i].id == index) {
                        cart[i].quantity += quantity;
                        isNew = false;
                        break;
                    }
                }
                if (isNew) {
                    cart.push({id: index, quantity: quantity});
                }
            }
            $localStorage.storeObject('shopping-cart', cart);
        },
        getCart: function() {
            return cart;
        },

        deleteFromCart: function(index, quantity) {
            var length = cart.length;

            for (var i = 0; i < length; i++) {
                if (cart[i].id == index) {
                    if (typeof(quantity) == 'undefined') {
                        cart.splice(i, 1);
                        break;
                    }
                    cart[i].quantity -= quantity;
                    if (cart[i].quantity <= 0) {
                        cart.splice(i, 1);
                    }
                    break;
                }
            }

            $localStorage.storeObject('shopping-cart', cart);
        }
    }
}