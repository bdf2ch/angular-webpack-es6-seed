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
            this.fio = this.surname + ' ' + this.name + ' ' + this.fname;
        } else {
            this.id = 0;
            this.divisionId = 0;
            this.suranme = '';
            this.name = '';
            this.fname = '';
            this.position = '';
            this.email = '';
            this.account = '';
            this.fio = '';
        }
    };
};
