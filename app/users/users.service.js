import angular from 'angular';
import { UsersModule } from './users.module'

export const UsersService = angular
    .module(UsersModule.name)
    .factory('UsersService', ['$log', '$http', 'API', function ($log, $http, API) {
        let api = {

            fetchAllUsers: function (success, error) {
                let parameters = {
                    action: 'getAllUsers'
                };
                $http.post(API, parameters)
                    .success((data) => {
                        if (data !== undefined) {
                            data.each(function (item) {
                                $log.log(item);
                            });
                        }
                        if (success !== undefined && typeof  success === 'function')
                            success();
                    })
                    .error((error) => {
                        $log.error('Error fetching list of users: ' + error);
                    });
            }

        };

        return api;
    }]);
