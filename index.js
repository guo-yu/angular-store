require('angular-resource');

var defaults = {
    params: {},
    actions: {
        post: {
            method: 'POST'
        },
        put: {
            method: 'PUT'
        }
    }
}

exports.config = function(apis) {
    if (!angular) return false;
    if (!apis) return false;
    if (typeof(apis) !== 'object') return false;
    angular.module('store', ['ngResource']).factory('Store', function($resource) {
        var router = {}
        Object.keys(apis).forEach(function(item) {
            var route = apis[item];
            router[item] = (typeof(route) === 'string') ?
           $resource(route, defaults.params, defaults.actions) :
           $resource(route.url, route.params || defaults.params, route.actions || defaults.actions)
        })
        return router
    });
}