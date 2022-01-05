var mysql = require('mysql2');

module.exports = () =>{
    return mysql.createConnection({ // create connection between mysql object and database
        host:'127.0.0.1',
        user:'root',
        port:'3307',
        password:'',
        database:'patient_monitoring'
        },(err,result)=>{
        if(err) throw err;
        console.log('Connection with database established.');
    });
}