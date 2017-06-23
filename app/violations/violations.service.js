import { ViolationsModule } from './violations.module';
import { Violation } from '../models/violation';


export const ViolationsService = angular
    .module(ViolationsModule.name)
    .factory('ViolationsService', ['API', '$log', '$http', '$routeParams', function (API, $log, $http, $routeParams) {
        let violations = [];

        let api = {

            fetchViolationById: function (violationId) {
                let parameters = {
                    action: 'getViolationById',
                    data: {
                        violationId: violationId
                    }
                };
                return $http.post(API, parameters).then((data) => {
                    $log.log(data);
                    let violation = new Violation(data.data[0]);
                    $log.log(violation);
                    return violation;
                })
            }

        };

        return api;
    }]);
