import angular from 'angular';
import { UiModule } from '../ui.module';

const ModalFooterComponent = angular
    .module(UiModule.name)
    .component('modalFooter', {
        transclude: true,
        requires: {
            modalCtrl: '^modal'
        },
        controller: ['$log', function ($log) {

        }]
    });
