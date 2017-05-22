import angular from 'angular';
import { ViolationsModule } from './violations.module';

export const TestController = angular
    .module(ViolationsModule.name)
    .controller('TestController', ['$scope', '$log', 'ModalsService', function ($scope, $log, ModalsService) {
        $log.log('TEST CONTROLLER');
        $log.log(ModalsService);
    }]);