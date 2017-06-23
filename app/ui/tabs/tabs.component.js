import angular from 'angular';
import { UiModule } from '../ui.module';
import './tabs.template.html';
import './tabs.component.css';


export let TabsComponent = angular
    .module(UiModule.name)
    .component('tabs', {
        transclude: true,
        templateUrl: 'ui/tabs/tabs.template.html',
        bindings: {
            id: '@'
        },
        controller: ['$log', 'TabsService', function ($log, TabsService) {
            let tabs = this.tabs = [];  // Массив вкладок


            /**
             * Инициализация компонента
             * Проиизводит регистрацию компоеннта в сервисе
             */
            this.$onInit = function () {
                TabsService.register(this);
            };


            /**
             * Регистрирует дочернюю вкладку компонента
             * @param tab {Object} - контроллер компонента вкладки
             */
            this.register = function (tab) {
                if (tab !== undefined) {
                    this.tabs.push(tab);
                    tab.tabActive = this.tabs.length === 1 ? true : false;
                }
            };


            /**
             * Производит выбор вкладки
             * @param id {String} - идентификатор вкладки
             */
            this.selectTabById = function (id) {
                if (id !== undefined && id !== '') {
                    tabs.forEach(function (item, index, array) {
                        item.tabActive = item.id === id ? true : false;
                    });
                }
            };
        }]
    });