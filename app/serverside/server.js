const express = require('express');
const parser = require('body-parser');
const async = require('async');
const mysql = require('mysql');

var app = express();
const connection = mysql.createConnection({
    host     : '192.168.91.24',
    user     : 'wfs_base',
    password : 'iuh',
    database : 'wfs_base',
    multipleStatements: true
});
connection.connect();


const cors = function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Credentials', true);
    next();
};


app.use(cors);
app.use(parser.json());
app.post('/api', function (request, response) {
    console.log(request.body);
    let query = '';
    switch (request.body.action) {
        case 'getAllUsers': query = 'SELECT * FROM users ORDER BY surname, name, id ASC'; break;
        case 'getUserById': query = getUserById();
        case 'saveUser': query = saveUser(request.body.data); break;
        case 'addUser':  query = addUser(request.body.data); break;
        case 'getAllDivisions': query = 'SELECT * FROM divisions ORDER BY parent_id ASC'; break;
        case 'getViolationById': query = getViolationById(request.body.data); break;
    }

    function getUserById(params) {
        return `SELECT * FROM users WHERE id = ${params.userId}`;
    };


    function saveUser(params) {
        console.log(params);
        return `UPDATE users 
                SET division_id = ${params.divisionId},
                    surname = '${params.surname}', 
                    name = '${params.name}', 
                    fname = '${params.fname}',
                    position = '${params.position}',
                    email = '${params.email}',
                    login = '${params.account}',
                    allow_edit = ${params.allowEditViolations === true ? 1 : 0},
                    allow_confirm = ${params.allowConfirmViolations === true ? 1 : 0},
                    allow_add_files = ${params.allowAddFiles === true ? 1 : 0},
                    allow_delete_files = ${params.allowDeleteFiles === true ? 1 : 0},
                    is_administrator = ${params.isAdministrator === true ? 1 : 0}
                WHERE id = ${params.userId}`;
    };


    function addUser(params) {
        return `INSERT INTO users (division_id, surname, name, fname, position, email, login, allow_edit, allow_confirm, allow_add_files, allow_delete_files, is_administrator)
                VALUES (${params.divisionId}, 
                        '${params.surname}', 
                        '${params.name}', 
                        '${params.fname}', 
                        '${params.position}', 
                        '${params.email}', 
                        '${params.account}', 
                        ${params.allowEditViolations === true ? 1 : 0}, 
                        ${params.allowConfirmViolations === true ? 1 : 0}, 
                        ${params.allowAddFiles === true ? 1 : 0}, 
                        ${params.allowDeleteFiles === true ? 1 : 0}, 
                        ${params.isAdministrator === true ? 1 : 0}); 
                SET @lastID := LAST_INSERT_ID(); 
                SELECT * FROM users WHERE id = @lastId;`;
    };


    function getViolationById (params) {
        return `SELECT * FROM violations WHERE id = ${params.violationId}`;
    };

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error;
        };
        //console.log(results);
        response.end(JSON.stringify(results));
    });
});
app.listen(3000);
