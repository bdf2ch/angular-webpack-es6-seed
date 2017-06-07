import angular from 'angular';
import { DivisionsModule } from '../divisions.module';


/**
 * DivisionsTreesService
 * Сервис управления деревьями структурных подразделений
 * @type {*}
 */
export const DivisionsTreesService = angular
    .module(DivisionsModule.name)
    .factory('DivisionsTreesService', ['$log', function ($log) {
        let trees = [];

        let api = {

            /**
             * Регистрирует компонент дерева структурных подразделений
             * @param tree
             */
            register: function (tree) {
                if (tree !== undefined) {
                    trees.push(tree);
                }
            },


            /**
             * Поиск дерева структурных подразделений по идентификатору
             * @param id {String} - идентификатор дерева
             * @returns {*}
             */
            getById: function (id) {
                if (id !== undefined) {
                    const tree = (item, index, array) => item.id === id;
                    return trees.find(tree);
                }
            }

        };

        return api;
    }]);