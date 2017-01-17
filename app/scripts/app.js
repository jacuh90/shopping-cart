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