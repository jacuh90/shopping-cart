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