import { Model } from './model';


export class Division extends Model {

    constructor (parameters) {
        super();
        if (parameters) {
            this.id = parameters['ID'] !== undefined ? parameters['ID'] : 0;
            this.parentId = parameters['PARENT_ID'] !== undefined ? parameters['PARENT_ID'] : 0;
            this.departmentId = parameters['DEPARTMENT_ID'] !== undefined ? parameters['DEPARTMENT_ID'] : 0;
            this.titleShort = parameters['TITLE_SHORT'] !== undefined ? parameters['TITLE_SHORT'] : '';
            this.titleFull = parameters['TITLE_FULL'] !== undefined ? parameters['TITLE_FULL'] : '';
            this.storage = parameters['FILE_STORAGE_HOST'] !== undefined ? parameters['FILE_STORAGE_HOST'] : '';
            this.path = parameters['PATH'] !== undefined ? parameters['PATH'] : '';
            this.order = parameters['SORT_ID'] !== undefined ? parameters['SORT_ID'] : 0;
            this.isDepartment = parameters['IS_DEPARTMENT'] !== undefined && parameters['IS_DEPARTMENT'] === 1 ? true : false;
        } else {
            this.id = 0;
            this.parentId = 0;
            this.departmentId = 0;
            this.titleShort = '';
            this.titleFull = '';
            this.storage = '';
            this.path = '';
            this.order = 0;
            this.isDepartment = false;
        }
    };

};
