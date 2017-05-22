import angular from 'angular';

export const ViolationsModule = angular.module('violations', [])
    .run(['$log', function ($log) {
        $log.log('violations module');
    }]);