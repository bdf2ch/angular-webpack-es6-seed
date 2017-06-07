import angular from 'angular';
import { UiModule } from '../ui.module';

export const ModalFooterComponent = angular
    .module(UiModule.name)
    .component('modalFooter', {
        transclude: true,
        template: '<div class="modal-footer"><div class="modal-footer-content-wrapper" ng-transclude></div></div>',
        require: {
            modalCtrl: '^modal'
        },
        controller: ['$log', function ($log) {}]
    });
