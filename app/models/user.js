import { Model } from './model';

export class User extends Model {
    constructor (parameters) {
        super();
        if (parameters) {
            this.id = parameters['ID'] !== undefined ? parameters['ID'] : 0;
            this.divisionId = parameters['DIVISION_ID'] !== undefined ? parameters['DIVISION_ID'] : 0;
            this.surname = parameters['SURNAME'] !== undefined ? parameters['SURNAME'] : '';
            this.name = parameters['NAME'] !== undefined ? parameters['NAME'] : '';
            this.fname = parameters['FNAME'] !== undefined ? parameters['FNAME'] : '';
            this.position = parameters['POSITION'] !== undefined ? parameters['POSITION'] : '';
            this.email = parameters['EMAIL'] !== undefined ? parameters['EMAIL'] : '';
            this.account = parameters['LOGIN'] !== undefined ? parameters['LOGIN'] : '';
            this.allowEditViolations = parameters['ALLOW_EDIT'] !== undefined && parseInt(parameters['ALLOW_EDIT']) === 1 ? true : false;
            this.allowConfirmViolations = parameters['ALLOW_CONFIRM'] !== undefined && parseInt(parameters['ALLOW_CONFIRM']) === 1 ? true : false;
            this.allowDeleteViolations = parameters['ALLOW_DELETE'] !== undefined && parseInt(parameters['ALLOW_DELETE']) === 1 ? true : false;
            this.allowAddFiles = parameters['ALLOW_ADD_FILES'] !== undefined && parseInt(parameters['ALLOW_ADD_FILES']) === 1 ? true : false;
            this.allowDeleteFiles = parameters['ALLOW_DELETE_FILES'] !== undefined && parseInt(parameters['ALLOW_DELETE_FILES']) === 1 ? true : false;
            this.isAdministrator = parameters['IS_ADMINISTRATOR'] !== undefined && parseInt(parameters['IS_ADMINISTRATOR']) === 1 ? true : false;
            this.fio = this.surname + ' ' + this.name + ' ' + this.fname;
        } else {
            this.id = 0;
            this.divisionId = 0;
            this.surname = '';
            this.name = '';
            this.fname = '';
            this.position = '';
            this.email = '';
            this.account = '';
            this.allowEditViolations = false;
            this.allowConfirmViolations = false;
            this.allowDeleteViolations = false;
            this.allowAddFiles = false;
            this.allowDeleteFiles = false;
            this.isAdministrator = false;
            this.fio = '';
        }
    };
};
