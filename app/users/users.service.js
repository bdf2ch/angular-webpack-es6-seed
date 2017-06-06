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
             * @returns {HttpPromise}
             */
            fetchAllUsers: function (success, error) {
                let parameters = { action: 'getAllUsers' };
                return $http.post(API, parameters);
            },


            /**
             * Выполняет разбор полученных с сервера данных и заполняет массив пользователей
             * @param data {Array}
             * @returns {Array}
             */
            parseUsers: function (data) {
                if (data !== undefined) {
                    data.forEach((item) => {
                        let user = new User(item);
                        user.backup.setup(['divisionId', 'surname', 'name', 'fname', 'position', 'email', 'account']);
                        users.push(user);
                    });
                    //$log.log(users);
                    return users;
                }
            },


            /**
             * Возвращает массив со всеми пользователями
             * @returns {Array}
             */
            getAllUsers: function () {
                return users;
            }

        };

        return api;
    }]);
