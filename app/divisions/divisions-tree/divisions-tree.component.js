import angular from 'angular';
import { DivisionsModule } from '../divisions.module';
import { DivisionsTreesService } from './divisions-trees.service';
import './divisions-tree.template.html';
import './divisions-tree.component.css';

export const DivisionsTreeComponent = angular
    .module(DivisionsModule.name)
    .component('divisionsTree', {
        templateUrl: 'divisions/divisions-tree/divisions-tree.template.html',
        bindings: {
            id: '@',
            divisions: '<',
            expandOnSelect: '@',
            collapseOnSelect: '@',
            onSelect: '&'
        },
        controller: ['$log', 'DivisionsTreesService', function ($log, DivisionsTreesService) {
            let stack = this.stack = [];
            let root = this.root = [];
            let selectedItem = this.selectedItem = undefined;


            /**
             * Инициализация компонента
             * Регистрирует компонент в серисе управления деревьями структурных подразделений
             */
            this.$onInit = function () {
                DivisionsTreesService.register(this);
            };


            this.$onChanges = function (changes) {
                if (changes.divisions) {
                    var length = changes.divisions.currentValue.length;
                    for (var i = 0; i < length; i++) {
                        this.addItem({
                            id: changes.divisions.currentValue[i].id,
                            parentId: changes.divisions.currentValue[i].parentId,
                            title: changes.divisions.currentValue[i].titleShort
                        });
                    }
                }
                if (changes.expandOnSelect) {
                    switch (changes.expandOnSelect.currentValue) {
                        case 'true': this.expandOnSelect = true; break;
                        case 'false': this.expandOnSelect = false; break;
                        default: this.expandOnSelect = false; break;
                    }
                }
                if (changes.collapseOnSelect) {
                    switch (changes.collapseOnSelect.currentValue) {
                        case 'true': this.collapseOnSelect = true; break;
                        case 'false': this.collapseOnSelect = false; break;
                        default: this.collapseOnSelect = false; break;
                    }
                }
                if (changes.level) {
                    this.level = parseInt(level);
                }
            };


            this.addItem = function (parameters) {
                //$log.log(parameters);
                if (parameters !== undefined) {
                    if (parameters.id !== undefined && parameters.parentId !== undefined && parameters.title !== undefined) {
                        var division = {
                            id: parameters.id,
                            parentId: parameters.parentId,
                            title: parameters.title,
                            opened: false,
                            selected: false,
                            children: []
                        };
                        if (division.parentId === 0) {
                            this.root.push(division);
                        } else {
                            var length = this.stack.length;
                            for (var i = 0; i < length; i++) {
                                if (this.stack[i].id === division.parentId) {
                                    this.stack[i].children.push(division);
                                }
                            }
                        }
                        this.stack.push(division);
                        return division;
                    }
                }

                return null;
            };


            /**
             * Разворачивает элемент по идентификатору
             * @param id {String} - идентификатор элемента
             */
            this.expandItem = function (id) {
                const itemById = (item, index, array) => item.id === id;
                const item = stack.find(itemById);
                item.opened = item !== undefined ? true : true;
            };


            /**
             * Сворачивает элемент по идентификатору
             * @param id {String} - идентификатор элемнта
             */
            this.collapseItem = function (id) {
                const itemById = (item, index, array) => item.id === id;
                const item = stack.find(itemById);
                item.opened = item !== undefined ? false : false;
            };


            this.collapseAll = function () {
                this.stack.forEach((item) => {
                    item.opened = false;
                });
            };


            /**
             * Выбирает элемент дерева по идентификатору
             * @param id {String} - идентификатор элемента
             */
            this.selectItem = function (id) {
                if (id !== undefined) {
                    var length = this.stack.length;
                    for (var i = 0; i < length; i++) {
                        if (this.stack[i].id === id) {
                            if (this.stack[i].selected === true) {
                                this.stack[i].selected = false;
                                if (this.collapseOnSelect === true) {
                                    this.stack[i].opened = false;
                                }
                                this.selectedItem = this.stack[i];
                                this.onSelect({item: this.stack[i]});
                            } else {
                                this.stack[i].selected = true;
                                if (this.expandOnSelect === true) {
                                    this.stack[i].opened = true;
                                }
                                this.onSelect({item: this.stack[i]});
                                this.selectedItem = this.stack[i];
                            }
                        } else {
                            this.stack[i].selected = false;
                        }
                    }
                }
            };


            /**
             * Возвращает выбранный элемент дерева
             * @returns {string|null|undefined|*|Object}
             */
            this.getSelectedItem = function () {
                return this.selectedItem;
            };


            /**
             * Сбрасывает выбранный элемент
             */
            this.deselect = function () {
                stack.forEach((item) => {
                    item.selected = false;
                });
                this.selectedItem = undefined;
            };

        }]
    });