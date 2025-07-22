import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_management",
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting to the database: ' + err.stack);
        return;
    }
    console.log('connected to the database successfully');
});

const connectionDB = connection.promise();

export default connectionDB;