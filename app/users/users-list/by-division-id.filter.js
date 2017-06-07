import angular from 'angular';
import { UsersModule } from '../users.module';


/**
 * byDivisionId Filter
 * Фильтр списка пользователей по принадлежности к структурному подразделению
 */
export const byDivisionIdFilter = angular
    .module(UsersModule.name)
    .filter('byDivisionId', ['$log', function ($log) {
        return function (input, divisionId) {
            if (divisionId !== undefined && divisionId !== 0) {
                const filteredByDivisionId = (item, index, array) => item.divisionId === divisionId;
                const result = input.filter(filteredByDivisionId);
                return result;
            } else
                return input;
        }
    }]);