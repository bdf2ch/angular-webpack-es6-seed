import angular from 'angular';
import { UiModule } from '../ui.module';


export const ModalContentComponent = angular
    .module(UiModule.name)
    .component('modalContent', {
        transclude: true,
        template:
            `<div class="modal-content">
                <div class="modal-content-wrapper" ng-transclude ng-style="{'height': $ctrl.modalContentHeight}"></div>
            </div>`,
        require: {
            modalCtrl: '^modal'
        },
        bindings: {
            height: '@'
        },
        controller: ['$log', function ($log) {
            let modalContentHeight = this.modalContentHeight = 'auto';

            this.$onInit = function () {
                if (this.height !== undefined && this.height !== '') {
                    this.modalContentHeight = parseInt(this.height) + 'px';
                }
            };

        }]
    });
