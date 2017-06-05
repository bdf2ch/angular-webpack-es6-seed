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
        controller: ['$log', '$element', '$timeout', 'ModalsService', function ($log, $element, $timeout, ModalsService) {
            var modalOpened = this.modalOpened = false;
            var modalWidth = this.modalWidth = '300px';
            var modalHeight = this.modalHeight = 'auto';
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


            this.$onChanges = function (changes) {
                //$log.log(changes);
            };


            this.open = function () {
                this.modalOpened = true;
                this.onOpen();
                $timeout(() => {
                    if (this.modalHeight === 'auto') {
                        let height = angular.element($element[0].children[0].children[0].children[1])[0].clientHeight;
                        this.modalHeight = height + 'px';
                    }
                }, 100);
                return this;
            };


            this.close = function () {
                this.modalOpened = false;
                this.onClose();
                return this;
            };

        }]
    });