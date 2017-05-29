describe('TestController', function () {
    var $controller;

    beforeEach(module('violations'));
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('$scope.test should contain "test string"', function () {
        var $scope = {};
        var controller = $controller('TestController', {$scope} );
        $scope.test.toEqual('test string');
    });
});