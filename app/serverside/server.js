const express = require('express');
const parser = require('body-parser');
const async = require('async');
const mysql = require('mysql');

var app = express();
const connection = mysql.createConnection({
    host     : '192.168.91.24',
    user     : 'wfs_base',
    password : 'iuh',
    database : 'wfs_base'
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
    }
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error
        };
        //console.log(results);
        response.end(JSON.stringify(results));
    });
});
app.listen(3000);
