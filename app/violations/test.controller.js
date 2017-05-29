import angular from 'angular';
import { ViolationsModule } from './violations.module';

export const TestController = angular
    .module(ViolationsModule.name)
    .controller('TestController', ['$scope', '$log', 'ModalsService', function ($scope, $log, ModalsService) {
        $log.log('TEST CONTROLLER');
        $log.log(ModalsService);

        $scope.test = 'test string';

        $log.log('test modal found = ', ModalsService.getById('test-modal'));


        $scope.openModal = function () {
            ModalsService.getById('test-modal').open();
        };


        $scope.openSecondModal = function () {
            $log.log('second modal');
            ModalsService.getById('second-modal').open();
        };

        $scope.onOpenModal = function () {
            $log.log('on open modal');
        };

        $scope.onCloseModal = function () {
            $log.log('on close modal');
        };
    }]);