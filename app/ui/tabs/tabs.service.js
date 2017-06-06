import angular from 'angular';
import { UiModule } from '../ui.module';


export const TabsService = angular
    .module(UiModule.name)
    .factory('TabsService', ['$log', function ($log) {
        let tabs = [];

        let api = {

            register: function (tab) {
                if (tabs !== undefined) {
                    tabs.push(tab);
                }
            },

            getById: function (id) {
                if (id !== undefined && id !== '') {
                    const found = (item, index, tabs) => item.id === id;
                    return tabs.find(found);
                }
            }

        };

        return api;
    }]);