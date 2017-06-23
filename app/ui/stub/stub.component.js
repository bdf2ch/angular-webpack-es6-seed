import { UiModule } from '../ui.module';
import './stub.component.html';
import './stub.component.css';


export const StubComponent = angular
    .module(UiModule.name)
    .component('stub', {
        templateUrl: 'ui/stub/stub.component.html',
        bindings: {
            icon: '@',
            text: '@'
        },
        controller: [function () {
            this.stubIcon = '';
            this.stubText = '';

            this.$onInit = function () {
                this.stubIcon = this.icon !== undefined && this.icon !== '' ? this.icon : '';
                this.stubText = this.text !== undefined && this.text !== '' ? this.text : '';
            };

        }]
    });
