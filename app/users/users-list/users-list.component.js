import angular from 'angular';
import { UsersModule } from '../users.module';
import './users-list.template.html';
import './users-list.component.css';


export const UsersListComponent = angular
    .module(UsersModule.name)
    .component('usersList', {
        templateUrl: 'users/users-list/users-list.template.html',
        controller: ['$log', 'UsersService', function ($log, UsersService) {

            this.$onInit = function () {
                //UsersService.fetchAllUsers();
            };

        }]
    });