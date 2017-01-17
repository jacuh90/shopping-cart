angular
    .module('cartApp', [
        // Third Party
        'ui.router',
        'ngResource',
        'toastr',


        // Internal
        'sc-localstorage',
        'sc-back-img'
    ]);
angular
    .module('cartApp')
    .constant("BASE_URL", "http://localhost:3000/");
'use strict';

angular.module('cartApp')
    .controller('AppController', AppController);

AppController.$inject = [
    'BASE_URL'
];

//TODO implement the entire application controller

function AppController(BASE_URL) {

}
'use strict';

angular.module('cartApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for home page
            .state('app', {
                url : '/',
                views : {
                    'header' : {
                        templateUrl : 'views/header.html'
                    },
                    'content' : {
                        templateUrl : 'views/books.html',
                        controller : 'BooksController',
                        controllerAs : 'vm',
                        resolve: {
                            books: ['bookService', function (bookService) {
                                return bookService.query();
                            }]
                        }
                    },
                    'footer' : {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            //TODO implement the book details page
            //route for a book from the store
            .state('app.book', {
                url : 'books/:id',
                views : {
                    'content@' : {
                        templateUrl : 'views/book.html',
                        controller : 'BookController',
                        controllerAs : 'vm',
                        resolve: {
                            book: ['$stateParams','bookService', function($stateParams, bookService){
                                return bookService.get({id:parseInt($stateParams.id, 10)});
                            }]
                        }
                    }
                }
            })
            // route for Cart page
            .state('app.cart', {
                url : 'cart',
                views : {
                    'content@' : {
                        templateUrl : 'views/cart.html',
                        controller : 'CartController',
                        controllerAs : 'vm',
                        resolve : {
                            cart: ['cartService', function(cartService) {
                                return cartService.getCart();
                            }]
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });
'use strict';

angular.module('sc-back-img', []);
'use strict';

angular.module('sc-localstorage', []);
'use strict';

angular.module('sc-back-img')
    .directive('backImg', function(){
        return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        };
    });
'use strict';

angular.module('sc-localstorage')
    .factory('$localStorage', $localStorage);

$localStorage.$inject = [
    '$window'
];

function $localStorage($window) {
    return {
        store: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        storeObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key,defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}
'use strict';

angular.module('cartApp')
    .directive('book', function () {
        return {
            templateUrl: 'views/bookDirective.html'
        };
    });
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