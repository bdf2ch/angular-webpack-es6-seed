import { UiModule } from '../ui.module';
import './checkbox.component.html';
import './checkbox.component.css';


export const CheckBoxComponent = angular
    .module(UiModule.name)
    .component('checkbox', {
        templateUrl: 'ui/checkbox/checkbox.component.html',
        require: {
            ngModelCtrl: 'ngModel'
        },
        controller: ['$log', function ($log) {
            $log.log('ngModel', this.ngModelCtrl);

            let checked = this.checked = false;
        }]
    });
