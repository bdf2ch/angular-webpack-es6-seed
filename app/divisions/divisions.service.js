import angular from 'angular';
import { DivisionsModule } from './divisions.module';
import { Division } from '../models/division';


export const DivisionsService = angular
    .module(DivisionsModule.name)
    .factory('DivisionsService', ['$log', '$http', 'API', function ($log, $http, API) {
        let divisions = [];

        let api = {

            /**
             * Получает все структурные подразделения с сервера
             * @returns {HttpPromise}
             */
            fetchAllDivisions: function () {
                let parameters = { action: 'getAllDivisions' };
                return $http.post(API, parameters);
            },


            /**
             * Выполняет разбор полученных с сервера данных и заполняет массив структурных подразделений
             * @param data {Array}
             * @returns {Array}
             */
            parseDivisions: function (data) {
                if (data !== undefined) {
                    data.forEach((item) => {
                        let division = new Division(item);
                        division.backup.setup(['parentId', 'departmentId', 'titleShort', 'titleFull', 'storage', 'order', 'isDepartment']);
                        divisions.push(division);
                    });
                    //$log.log(divisions);
                    return divisions;
                }
            },


            /**
             * Возвращает массив со всеми структурными подразделениями
             * @returns {Array}
             */
            getAllDivisions: function () {
                return divisions;
            },


            /**
             * Возвращает структурное подразделение по идентификатору
             * @param id
             * @returns {*}
             */
            getDivisionById: function (id) {
                if (id !== undefined && id !== '') {
                    const found = (item, index, array) => item.id === id;
                    return divisions.find(found);
                }
            },


            getDepartmentByDivisionId: function (id) {
                if (id !== undefined) {
                    const divisionById = (item, index, array) => item.id === id;
                    const division = divisions.find(divisionById);
                    if (division !== undefined) {
                        const departmentByDivisionId = (item, index, array) => item.id === division.departmentId;
                        const department = divisions.find(departmentByDivisionId);
                        return department;
                    }
                }
            }

        };

        return api;
    }]);