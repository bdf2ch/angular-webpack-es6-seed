import angular from 'angular';
import { UsersModule } from '../users.module';
import './users-list.template.html';
import './users-list.component.css';


export const UsersListComponent = angular
    .module(UsersModule.name)
    .component('usersList', {
        bindings: {
            users: '<'
        },
        templateUrl: 'users/users-list/users-list.template.html',
        controller: ['$log', 'UsersService', 'ModalsService', function ($log, UsersService, ModalsService) {
            let search = this.search = '';
            let selectedUser = this.selectedUser = null;


            this.selectUser = function (user) {
                if (user !== undefined) {
                    this.selectedUser = user;
                    $log.log('fio = ', this.selectedUser.fio);
                    ModalsService.getById('edit-user-modal').open().modalCaption = this.selectedUser.fio;
                }
            };


            this.closeEditUserModal = function (form) {
                this.selectedUser = null;
                form.$setPristine();
                form.$setUntouched();
                ModalsService.getById('edit-user-modal').close();
            };


            this.clearSearch = function () {
                this.search = '';
            };


            this.openDivisionsModal = function () {
                ModalsService.getById('users-list-divisions-modal').open();
            };


            this.openEditUserDivisionsModal = function () {
                $log.log('open');
                ModalsService.getById('edit-user-divisions-modal').open();
            };
        }]
    });