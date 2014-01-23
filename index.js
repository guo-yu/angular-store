exports.config = function(apis) {
    if (!angular) return false;
    if (!apis) return false;
    if (typeof(apis) !== 'object') return false;
    angular.module('store', ['ngResource']).factory('Store', function($resource) {
        var router = {}
        Object.keys(apis).forEach(function(item) {
            var route = apis[item];
            if (typeof(route) === 'string') router[item] = $resource(route, {})
            if (typeof(route) === 'object') router[item] = $resource(
                route.url,
                route.params ? route.params : {},
                route.actions ? route.actions : {}
            )
        })
        return router
    });
}