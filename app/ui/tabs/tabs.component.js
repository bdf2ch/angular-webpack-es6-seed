import angular from 'angular';
import { UiModule } from '../ui.module';
import './tabs.template.html';
import './tabs.component.css';


export let TabsComponent = angular
    .module(UiModule.name)
    .component('tabs', {
        transclude: true,
        templateUrl: 'ui/tabs/tabs.template.html',
        controller: ['$log', function ($log) {
            var tabs = this.tabs = [];

            this.$onInit = function () {
                $log.log('tabs', this.tabs);
            };

            this.register = function (tab) {
                $log.log(tab);
                if (tab !== undefined) {
                    this.tabs.push(tab);
                    tab.tabActive = this.tabs.length === 1 ? true : false;
                }
            };


            this.select = function (tab) {
                if (tab !== undefined) {
                    let length = this.tabs.length;
                    for (let i = 0; i < length; i++) {
                        if (this.tabs[i].id === tab.id)
                            this.tabs[i].tabActive = true;
                        else
                            this.tabs[i].tabActive = false;
                    }
                }
            };

        }]
    });