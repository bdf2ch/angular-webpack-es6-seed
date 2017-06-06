import angular from 'angular';
import { UiModule } from '../ui.module';
import './tab.template.html';
import './tab.component.css';


export let TabComponent = angular
    .module(UiModule.name)
    .component('tab', {
        transclude: true,
        template: '<div class="tab" ng-show="$ctrl.tabActive === true" ng-transclude></div>',
        bindings: {
            id: '@',
            title: '@',
            width: '@',
        },
        require: {
            tabsCtrl: '^tabs'
        },
        controller: ['$log', function ($log) {
            let tabActive = this.tabActive = false; // Флаг активной вкладки
            let tabWidth = this.tabWidth = 'auto';  // Ширина вкладки


            /**
             * Инициализация компонента
             * Производит регистрацию вкладки в контроллере родительского компонента
             */
            this.$onInit = function () {
                if (this.id === undefined || this.id === '') {
                    $log.error('tab directive: "id" attribute must be specified');
                    return;
                }
                if (this.title === undefined || this.title === '') {
                    $log.error('tab directive: "title" attribute must be specified');
                    return;
                }
                if (this.width !== undefined && this.width !== '') {
                    this.tabWidth = this.width;
                }
                this.tabsCtrl.register(this);
            };
        }]
    });
