import { ViolationsModule } from '../violations.module';
import './violation.component.html';
import './violation.component.css';


export const ViolationComponent = angular
    .module(ViolationsModule.name)
    .component('violation', {
        templateUrl: 'violations/violation/violation.component.html',
        bindings: {
            violation: '<'
        },
        controller: [function () {

        }]
    });
