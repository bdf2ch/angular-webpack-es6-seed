export class Model {


    constructor () {
        this.backup = {};
        this.backup.data = {};

        this.backup.setup = (fields) => {
            if (fields !== undefined) {
                fields.forEach((item, index, array) => {
                    if (this.hasOwnProperty(item)) {
                        this.backup.data[item] = this[item];
                    }
                });
            }
        };


        this.backup.restore = (fields) => {
            if (fields !== undefined && Array.isArray(fields)) {
                fields.forEach((item, index, array) => {
                    if (this.backup.data.hasOwnProperty(item)) {
                        this[item] = this.backup.data[item];
                    }
                });
            } else {
                for (let field in this.backup.data) {
                    this[field] = this.backup.data[field];
                }
            }
        };
    };
};