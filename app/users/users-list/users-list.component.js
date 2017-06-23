import { UsersModule } from '../users.module';
import './users-list.template.html';
import './users-list.component.css';
import { User } from '../../models/user';
import { DivisionsTreeComponent } from '../../divisions/divisions-tree/divisions-tree.component';
import { DivisionsTreeItemComponent } from '../../divisions/divisions-tree/divisions-tree-item.component';
import { byDivisionIdFilter } from './by-division-id.filter';
import { ActionButtonComponent } from '../../ui/action-button/action-button.component';


export const UsersListComponent = angular
    .module(UsersModule.name)
    .component('usersList', {
        templateUrl: 'users/users-list/users-list.template.html',
        controller: ['$log', '$scope', 'UsersService', 'DivisionsService', 'ModalsService', 'TabsService', 'DivisionsTreesService', function ($log, $scope, UsersService, DivisionsService, ModalsService, TabsService, DivisionsTreesService) {
            this.search = '';
            this.newUser = new User();
            this.selectedUser = null;
            this.selectedDivisionId = 0;
            this.temp = {
                usersListDivisionId: 0,
                selectedUserDivisionId: 0,
                newUserDivisionId: 0
            };
            this.users = UsersService;
            this.modals = ModalsService;
            let tabs = this.tabs = TabsService;
            let divisions = this.divisions = DivisionsService;
            this.trees = DivisionsTreesService;


            /**
             * Инициализация компонента
             */
            this.$onInit = function () {
                this.newUser.backup.setup([
                    'divisionId',
                    'surname',
                    'name',
                    'fname',
                    'position',
                    'email',
                    'account',
                    'allowEditViolations',
                    'allowConfirmViolations',
                    'allowDeleteViolations',
                    'allowAddFiles',
                    'allowDeleteFiles',
                    'isAdministrator'
                ]);
            };


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


            /**
             * Выбор структурного подразделения у выбранного / нового пользователя
             * @param item {Object} - элемент иерархического списка дерева структурных подразделений
             */
            this.selectUserDivisionsTreeItem = function (item) {
                if (this.selectedUser !== null)
                    this.temp.selectedUserDivisionId = item !== null ? item.id : 0;
                else
                    this.temp.newUserDivisionId = item !== null ? item.id : 0;
            };


            /**
             * Выбор структурного подразделения выбранного / нового пользователя
             */
            this.selectUserDivision = function () {
                if (this.selectedUser !== null) {
                    this.selectedUser.divisionId = this.temp.selectedUserDivisionId;
                    this.editUserForm.$setDirty();
                    this.temp.selectedUserDivisionId = 0;
                } else {
                    this.newUser.divisionId = this.temp.newUserDivisionId;
                    this.newUserForm.$setDirty();
                    this.temp.newUserDivisionId = 0;
                }
                ModalsService.getById('user-divisions-modal').close();
                DivisionsTreesService.getById('user-divisions-tree').deselect();
                DivisionsTreesService.getById('user-divisions-tree').collapseAll();
            };


            /**
             * Закрывает модальное окно выбора структурного подразделения выбранного / нового пользователя
             */
            this.closeUserDivisionModal = function () {
                ModalsService.getById('user-divisions-modal').close();
                DivisionsTreesService.getById('user-divisions-tree').deselect();
                DivisionsTreesService.getById('user-divisions-tree').collapseAll();
                this.temp.selectedUserDivisionId = 0;
                this.temp.newUserDivisionId = 0;
            };


            /**
             * Закрывает модальное окно редактирования выбранного пользователя
             */
            this.closeEditUserModal = function () {
                if (this.editUserForm.$dirty) {
                    this.selectedUser.backup.restore();
                    this.editUserForm.$setPristine();
                    this.editUserForm.$setUntouched();
                }
                ModalsService.getById('edit-user-modal').close(false);
                TabsService.getById('selected-user-tabs').selectTabById('selected-user-info');
                this.selectedUser = null;
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
            this.openUsersListDivisionsModal = function () {
                ModalsService.getById('users-list-divisions-modal').open();
            };


            /**
             * Закрывает модальное окно выбора структурного подразделения
             * для фильтрации списка пользователей
             */
            this.closeUsersListDivisionsModal = function () {
                this.trees.getById('users-list-divisions-tree').deselect();
            };


            /**
             * Выбор структурного подразделения для фильтрации списка пользователей
             * @param item {Object} - элемент дерева структурных подразделений
             */
            this.selectUserListDivision = function (item) {
                this.temp.usersListDivisionId = item !== undefined ? item.id : 0;
            };


            /**
             * Выполняет фильтрацию списка пользователей по структурному подразделению,
             * закрывает модальное окно выбора стрктурного подразделения
             */
            this.filterUserList = function () {
                ModalsService.getById('users-list-divisions-modal').close();
                this.selectedDivisionId = this.temp.usersListDivisionId;
            };


            /**
             * Сброс фильтра списка пользователей по структурному подразделению
             */
            this.cancelUserListDivisionFilter = function () {
                this.temp.usersListDivisionId = 0;
                this.selectedDivisionId = 0;
            };


            /**
             * Открывает модальное окно выбора структурного подразделения пользователя
             */
            this.openEditUserDivisionsModal = function () {
                ModalsService.getById('user-divisions-modal').open();
            };


            /**
             * Триггер изменения прав доступа выбранного пользователя
             */
            this.onChangeUserPermissions = function () {
                this.editUserForm.$setDirty();
            };


            /**
             * Сохраняет изменения у выбранного пользователя
             */
            this.saveChangedUser = function () {
                UsersService.saveUser(this.selectedUser).then(() => {
                    this.selectedUser.backup.setup(
                        [
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
                            'allowDeleteFiles',
                            'isAdministrator'
                        ]
                    );
                    this.selectedUser.fio = this.selectedUser.surname + ' ' + this.selectedUser.name + ' ' + this.selectedUser.fname;
                    this.editUserForm.$setPristine();
                    this.editUserForm.$setUntouched();
                    ModalsService.getById('edit-user-modal').close(false);
                    TabsService.getById('selected-user-tabs').selectTabById('selected-user-info');
                });
            };


            /**
             * Открывает модальное окно добавления нового пользователя
             */
            this.openNewUserModal = function () {
                ModalsService.getById('new-user-modal').open();
            };


            /**
             * Триггер изменения прав доступа нового пользователя
             */
            this.onChangeNewUserPermissions = function () {
                this.newUserForm.$setDirty();
            };



            this.addUser = function () {
                UsersService.addUser(this.newUser).then(() => {
                    ModalsService.getById('new-user-modal').close();
                    this.newUser.backup.restore();
                    this.newUserForm.$setPristine();
                    this.newUserForm.$setUntouched();
                });
            };


            /**
             * Закрывает модальное окно добавления нового пользователя
             */
            this.closeNewUserModal = function () {
                this.newUser.backup.restore();
                this.newUserForm.$setPristine();
                this.newUserForm.$setUntouched();
                ModalsService.getById('new-user-modal').close(false);
                TabsService.getById('new-user-tabs').selectTabById('new-user-info');
            };

        }]
    });