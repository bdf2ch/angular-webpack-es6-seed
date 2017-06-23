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
                return $http.post(API, parameters).then((data) => {
                    data.data.forEach((item) => {
                        let user = new User(item);
                        user.backup.setup([
                            'divisionId',
                            'surname',
                            'name',
                            'fname',
                            'position',
                            'email',
                            'account',
                            'allowEditViolations',
                            'allowConfirmViolations',
                            'allowAddFiles',
                            'allowEditFiles',
                            'isAdministrator']);
                        users.push(user);
                    });
                });
            },


            /**
             * Возвращает массив со всеми пользователями
             * @returns {Array}
             */
            getAllUsers: function () {
                return users;
            },


            /**
             * Отправляет на сервер данные о пользователе
             * @param user {User} - информация о пользователе
             * @returns {HttpPromise}
             */
            saveUser: function (user) {
                let parameters = { action: 'saveUser',
                    data: {
                        userId: user.id,
                        divisionId: user.divisionId,
                        surname: user.surname,
                        name: user.name,
                        fname: user.fname,
                        position: user.position,
                        email: user.email,
                        account: user.account,
                        allowEditViolations: user.allowEditViolations,
                        allowConfirmViolations: user.allowConfirmViolations,
                        allowDeleteViolations: user.allowDeleteViolations,
                        allowAddFiles: user.allowAddFiles,
                        allowDeleteFiles: user.allowDeleteFiles,
                        isAdministrator: user.isAdministrator
                    }
                };
                return $http.post(API, parameters);
            },


            /**
             * Отправляет на сервер данные о новом пользователе
             * @param user {User} - информация о новом пользователе
             */
            addUser: function (user) {
                if (user) {
                    let parameters = {
                        action: 'addUser',
                        data: {
                            divisionId: user.divisionId,
                            surname: user.surname,
                            name: user.name,
                            fname: user.fname,
                            position: user.position,
                            email: user.email,
                            account: user.account,
                            allowEditViolations: user.allowEditViolations,
                            allowConfirmViolations: user.allowConfirmViolations,
                            allowDeleteViolations: user.allowDeleteViolations,
                            allowAddFiles: user.allowAddFiles,
                            allowDeleteFiles: user.allowDeleteFiles,
                            isAdministrator: user.isAdministrator
                        }
                    };
                    return $http.post(API, parameters).then((data) => {
                        let user = new User(data.data[2][0]);
                        console.log(user);
                        user.backup.setup([
                            'divisionId',
                            'surname',
                            'name',
                            'fname',
                            'position',
                            'email',
                            'account',
                            'allowEditViolations',
                            'allowConfirmViolations',
                            'allowAddFiles',
                            'allowEditFiles',
                            'isAdministrator']);
                        users.push(user);
                    });
                }
            }

        };

        return api;
    }]);
