import angular from 'angular';

export const UiModule = angular.module('ui', [])
    .run(['$log', function ($log) {
        $log.log('ui module');
    }]);