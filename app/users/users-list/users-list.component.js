import angular from 'angular';
import { UsersModule } from '../users.module';
import './users-list.template.html';
import './users-list.component.css';
import { DivisionsTreeComponent } from '../../divisions/divisions-tree/divisions-tree.component';
import { DivisionsTreeItemComponent } from '../../divisions/divisions-tree/divisions-tree-item.component';


export const UsersListComponent = angular
    .module(UsersModule.name)
    .component('usersList', {
        bindings: {
            users: '<'
        },
        templateUrl: 'users/users-list/users-list.template.html',
        controller: ['$log', '$scope', 'UsersService', 'DivisionsService', 'ModalsService', 'TabsService', function ($log, $scope, UsersService, DivisionsService, ModalsService, TabsService) {
            let search = this.search = '';
            let selectedUser = this.selectedUser = null;
            let tabs = this.tabs = TabsService;
            let divisions = this.divisions = DivisionsService;



            this.selectUser = function (user) {
                if (user !== undefined) {
                    this.selectedUser = user;
                    //$log.log('fio = ', this.selectedUser.fio);
                    ModalsService.getById('edit-user-modal').open().modalCaption = this.selectedUser.fio;
                }
            };


            this.closeEditUserModal = function () {
                //$log.log('onClose');
                if (this.form.$dirty) {
                    this.selectedUser.backup.restore();
                    this.form.$setPristine();
                    this.form.$setUntouched();
                }
                this.selectedUser = null;
                ModalsService.getById('edit-user-modal').close(false);
            };


            this.selectEditUserDivision = function (item) {
                $log.log(item);
                this.selectedUser.divisionId = item.id;
            };


            this.clearSearch = function () {
                this.search = '';
            };


            this.openDivisionsModal = function () {
                ModalsService.getById('users-list-divisions-modal').open();
            };


            this.openEditUserDivisionsModal = function () {
                ModalsService.getById('edit-user-divisions-modal').open();
            };

        }]
    });