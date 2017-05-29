import angular from 'angular';
import { UiModule } from '../ui.module';
import { ModalsService } from './modals.service';
import './modal.template.html';
import './modal.component.css';


export const ModalComponent = angular
    .module(UiModule.name)
    .component('modal', {
        templateUrl: 'ui/modal/modal.template.html',
        bindings: {
            id: '@',
            width: '@',
            height: '@',
            depth: '@',
            title: '@',
            caption: '@',
            description: '@',
            icon: '@',
            onOpen: '&',
            onClose: '&'
        },
        transclude: true,
        controller: ['$log', 'ModalsService', function ($log, ModalsService) {
            var modalOpened = this.modalOpened = true;
            var modalWidth = this.modalWidth = '300px';
            var modalHeight = this.modalHeight = '300px';
            var modalDepth = this.modalDepth = 1;
            var modalCaption = this.modalCaption = '';
            var modalDescription = this.modalDescription = '';
            var modalIcon = this.modalIcon = '';


            this.$postLink = function () {};


            this.$onInit = function () {
                if (this.width !== undefined && this.width !== '' && !isNaN(this.width)) {
                    this.modalWidth = parseInt(this.width) + 'px';
                }
                if (this.height !== undefined && this.height !== '' && !isNaN(this.height)) {
                    this.modalHeight = parseInt(this.height) + 'px';
                }
                if (this.depth !== undefined && this.depth !== '' && !isNaN(this.depth)) {
                    this.modalDepth = parseInt(this.depth);
                }
                if (this.caption !== '') {
                    this.modalCaption = this.caption;
                }
                if (this.description !== undefined && this.description !== '') {
                    this.modalDescription = this.description;
                }
                if (this.icon !== undefined && this.icon !== '') {
                    this.modalIcon = this.icon;
                }
                ModalsService.register(this);
            };


            this.open = function () {
                this.modalOpened = true;
                this.onOpen();
            };


            this.close = function () {
                this.modalOpened = false;
                this.onClose();
            };

        }]
    });