import angular from 'angular';
import { UiModule } from '../ui.module';
import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
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
            depth: '@',
            label: '@',
            caption: '@',
            description: '@',
            icon: '@',
            fullScreenOnMobile: '=',
            onOpen: '&',
            onClose: '&'
        },
        transclude: true,
        controller: ['$log', '$element', '$timeout', 'ModalsService', function ($log, $element, $timeout, ModalsService) {
            var modalOpened = this.modalOpened = false;
            var modalWidth = this.modalWidth = '300px';
            var modalDepth = this.modalDepth = 1;
            var modalCaption = this.modalCaption = '';
            var modalDescription = this.modalDescription = '';
            var modalIcon = this.modalIcon = '';
            let modalFullScreenOnMobile = this.modalFullScreenOnMobile = false;


            this.$onInit = function () {
                if (this.width !== undefined && this.width !== '' && !isNaN(this.width)) {
                    this.modalWidth = parseInt(this.width) + 'px';
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
                if (this.fullScreenOnMobile !== undefined && typeof this.fullScreenOnMobile === 'boolean') {
                    this.modalFullScreenOnMobile = this.fullScreenOnMobile;
                }
                ModalsService.register(this);
            };


            this.$onChanges = function (changes) {
                $log.log(changes);
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


            this.close = function (withCallback) {
                if (withCallback !== undefined && typeof withCallback === 'boolean' && withCallback === true) {
                    this.modalOpened = false;
                    this.onClose();
                } else if (withCallback === undefined || withCallback !== undefined && typeof withCallback === 'boolean' && withCallback === false) {
                    this.modalOpened = false;
                }
                return this;
            };


            this.setCaption = function (caption) {
                if (caption !== undefined && caption !== '') {
                    this.modalCaption = caption.toString();
                }
                return this;
            };

        }]
    });