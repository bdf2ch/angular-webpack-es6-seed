import angular from 'angular';
import { UsersModule } from './users.module'
import { User } from '../models/user';

export const UsersService = angular
    .module(UsersModule.name)
    .factory('UsersService', ['$log', '$http', 'API', function ($log, $http, API) {
        let users = [];

        let api = {

            /**
             * Получает всех пользователей с сервера
             * @param success
             * @param error
             */
            fetchAllUsers: function (success, error) {
                let parameters = {
                    action: 'getAllUsers'
                };
                return $http.post(API, parameters);
            },


            parseUsers: function (data) {
                if (data !== undefined) {
                    data.forEach((item) => {
                        let user = new User(item);
                        users.push(user);
                    });
                    return users;
                }
            },


            getAllUsers: function () {
                return users;
            }

        };

        return api;
    }]);
