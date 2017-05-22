import angular from 'angular';
import { UiModule } from '../ui.module';

export const ModalsService = angular
    .module(UiModule.name)
    .factory('ModalsService', ['$log', function ($log) {
        let modals = [];

        let api = {

            register: function (modal) {
                if (modal !== undefined) {
                    this.modals.push(modal);
                    return modal;
                }
            },

            getById: function (id) {
                if (id !== undefined) {
                    const found = (modal, index, array) => modal.id === id;
                    return this.modals.find(id);


                    //let length = this.modals.length;
                    //for (let i = 0; i < length; i++) {
                    //    if (this.modals[i].id === id)
                    //        return this.modals[i];
                    //}
                    //return null;
                }
            }
        };

        return api;
    }]);