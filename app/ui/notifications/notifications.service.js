import { UiModule } from '../ui.module';


export const NotificationsService = angular
    .module(UiModule.name)
    .factory('NotificationsService', [function () {
        let notifications = [];

        let api = {

            /**
             * Возвращает все уведомления
             * @returns {Array}
             */
            getAll: function() {
                return notifications;
            },

            push: function (notifiacation) {
                if (notifiacation) {
                    notifications.push(notifiacation);
                }
            }

        };

        return api;
    }]);
