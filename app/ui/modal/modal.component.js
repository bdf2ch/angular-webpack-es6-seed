import angular from 'angular';
import { UiModule } from '../ui.module';
import { ModalsService } from './modals.service';


export const ModalComponent = angular
    .module(UiModule.name)
    .component('modal', {
        templateUrl: 'ui/modal/modal.template.html',
        bindings: {
            title: '@'
        },
        transclude: true,
        controller: ['$log', 'ModalsService', function ($log, ModalsService) {
            var opened = this.$ctrl.opened = true;

            this.$onInit = function () {

            };

            this.$ctrl.open = function () {
                this.$ctrl.opened = true;
            };

            this.$ctrl.close = function () {
                this.$ctrl.opened = false;
            };
        }]
    });