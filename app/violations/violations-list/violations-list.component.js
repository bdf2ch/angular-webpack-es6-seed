import { ViolationsModule } from '../violations.module';
import './violations-list.template.html';
import './violations-list.component.css';

export const ViolationsListComponent = angular
    .module(ViolationsModule.name)
    .component('violationsList', {
        templateUrl: 'violations/violations-list/violations-list.template.html',
        bindings: {},
        controller: ['$scope', '$log', function ($scope, $log) {
            $log.info('violations list component');
        }]
    });
