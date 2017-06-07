import angular from 'angular';
import { UsersModule } from '../users.module';
import './users-list.template.html';
import './users-list.component.css';
import { DivisionsTreeComponent } from '../../divisions/divisions-tree/divisions-tree.component';
import { DivisionsTreeItemComponent } from '../../divisions/divisions-tree/divisions-tree-item.component';
import { byDivisionIdFilter } from './by-division-id.filter';


export const UsersListComponent = angular
    .module(UsersModule.name)
    .component('usersList', {
        bindings: {
            users: '<'
        },
        templateUrl: 'users/users-list/users-list.template.html',
        controller: ['$log', '$scope', 'UsersService', 'DivisionsService', 'ModalsService', 'TabsService', 'DivisionsTreesService', 'byDivisionIdFilter', function ($log, $scope, UsersService, DivisionsService, ModalsService, TabsService, DivisionsTreesService, byDivisionIdFilter) {
            let search = this.search = '';
            let selectedUser = this.selectedUser = null;
            let selectedDivisionId = this.selectedDivisionId = 0;
            let filtered = this.filtered = false;
            let modals = this.modals = ModalsService;
            let tabs = this.tabs = TabsService;
            let divisions = this.divisions = DivisionsService;
            let trees = this.trees = DivisionsTreesService;


            /**
             * Выбор текущего пользователя и показ модального окна с данными пользователя.
             * @param user {User} - выбранный пользователь
             */
            this.selectUser = function (user) {
                if (user !== undefined) {
                    this.selectedUser = user;
                    ModalsService.getById('edit-user-modal').open().setCaption(this.selectedUser.fio);
                }
            };


            this.closeEditUserModal = function () {
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


            /**
             * Очищает форму поиска пользователей
             */
            this.clearSearch = function () {
                this.search = '';
            };


            /**
             * Открывает модальное окно выбора структурного подразделения
             * для фильтрации списка пользователей
             */
            this.openDivisionsModal = function () {
                ModalsService.getById('users-list-divisions-modal').open();
            };


            /**
             * Закрывает модальное окно выбора структурного подразделения
             * для фильтрации списка пользователей
             */
            this.closeDivisionsModal = function () {
                this.trees.getById('users-list-divisions-tree').deselect();
            };


            /**
             * Выбор структурного подразделения для фильтрации списка пользователей
             * @param item {Object} - элемент дерева структурных подразделений
             */
            this.selectUserListDivision = function (item) {
                this.selectedDivisionId = item !== undefined ? item.id : 0;
            };


            /**
             * Выполняет фильтрацию списка пользователей по структурному подразделению,
             * закрывает модальное окно выбора стрктурного подразделения
             */
            this.filterUserList = function () {
                this.users = byDivisionIdFilter(UsersService.getAllUsers(), this.selectedDivisionId);
                this.filtered = true;
                ModalsService.getById('users-list-divisions-modal').close();
                DivisionsTreesService.getById('users-list-divisions-tree').deselect();
            };


            /**
             * Сброс фильтра списка пользователей по структурному подразделению
             */
            this.cancelUserListDivisionFilter = function () {
                this.selectedDivisionId = 0;
                this.filtered = false;
                this.users = byDivisionIdFilter(UsersService.getAllUsers(), 0);
            };


            /**
             * Открывает модальное окно выбора структурного подразделения пользователя
             */
            this.openEditUserDivisionsModal = function () {
                ModalsService.getById('edit-user-divisions-modal').open();
            };

        }]
    });