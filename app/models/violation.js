import { Model } from './model';

export class Violation extends Model {

    constructor(parameters) {
        super();
        if (parameters) {
            this.id = parameters['ID'] !== undefined ? parameters['ID'] : 0;
            this.divisionId = parameters['DIVISION_ID'] !== undefined ? parameters['DIVISION_ID'] : 0;
            this.userId = parameters['USER_ID'] !== undefined ? parameters['USER_ID'] : 0;
            this.eskGroupId = parameters['ESK_GROUP_ID'] !== undefined ? parameters['ESK_GROUP_ID'] : 0;
            this.happened = parameters['DATE_HAPPENED'] !== undefined ? new Date(parameters['DATE_HAPPENED'] * 1000) : new Date();
            this.ended = parameters['DATE_ENDED'] !== undefined ? new Date(parameters['DATE_ENDED'] * 1000) : new Date();
            this.added = parameters['DATE_ADDED'] !== undefined ? new Date(parameters['DATE_ADDED'] * 1000) : new Date();
            this.duration = parameters['DURATION'] !== undefined ? parameters['DURATION'] : 0;
            this.object = parameters['ESK_OBJECT'] !== undefined ? parameters['ESK_OBJECT'] : '';
            this.description = parameters['DESCRIPTION'] !== undefined ? parameters['DESCRIPTION'] : '';
            this.isConfirmed = parameters['IS_CONFIRMED'] !== undefined && parameters['IS_CONFIRMED'] === 1 ? true : false;
            this.isMarkedForDelete = parameters['IS_MARKED_FOR_DELETE'] !== undefined && parameters['IS_MARKED_FOR_DELETE'] === 1 ? true : false;
        } else {
            this.id = 0;
            this.divisionId = 0;
            this.userId = 0;
            this.eskGroupId = 0;
            this.happened = new Date();
            this.ended = new Date();
            this.added = new Date();
            this.duration = 0;
            this.object = '';
            this.description = '';
            this.isConfirmed = false;
            this.isMarkedForDelete = false;
        }
    };

};
