import { UiModule } from '../ui.module';
import './action-button.component.html';
import './action-button.component.css';


export const ActionButtonComponent = angular
    .module(UiModule.name)
    .component('actionButton', {
        templateUrl: 'ui/action-button/action-button.component.html',
        bindings: {
            icon: '@',
            onClick: '&'
        },
        controller: [function () {
            this.actionButtonIcon = '';

            this.$onInit =  () => {
                if (this.icon !== undefined && this.icon !== '') {
                    this.actionButtonIcon = this.icon;
                }
            };

        }]
    });