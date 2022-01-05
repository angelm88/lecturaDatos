const express = require('express');
const router = express.Router();
const numberOfPatients = 8; // temporal
var messageRegister = '';
var messageLogin = '';

// Database connection
const dbconnection = require('../database/databaseconnection.js');
const mysql_connection = dbconnection();

// HTTP Requests (GET, POST, PUT, ETC.)

// GET routes
router.get('/', (req, res) => {
    if(req.session.logged)
        res.render('profile', {numberOfPatients});
    else
        res.render('login', {
            message: messageLogin
        });
});

router.get('/login', (req, res) => {
    res.render('login', {
        message: messageLogin
    });
});

router.get('/sign_up', (req, res) => {
    res.render('sign_up', {
        message: messageRegister
    });
});

router.get('/history', (req, res) => {
    mysql_connection.query('Select * from patient_monitoring.data',  (err, resultData) => {
        res.render('history', { historys: resultData}); 
    });
    // res.render('history');
});

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});

// POST routes
router.post('/login', (req, res) => {
    req.session.logged = false; 
    mysql_connection.query('Select * from patient_monitoring.physician where medical_license=? AND password = ?', [req.body.medical_license, req.body.password],  (err, result) => {
        console.log(result);
        if (result.length > 0){
            req.session.logged = true; 
            mysql_connection.query('Select * from patient_monitoring.patient',  (err, resultPatient) => {
                res.render('profile', { patients: resultPatient}); 
            });


        }else{
            res.render('login', {
                message: 'Please confirm your username and password.'
            });
        }
    });
});

router.post('/sign_up', (req, res) => {
    mysql_connection.query('Select * from patient_monitoring.physician where medical_license=? ', [req.body.medical_license],  (err, result) => {
    if (err){
        console.log(err);
    }

    if (result.length > 0){
       return res.render('sign_up', {
        message: 'That medical license number is alredy in use.'
        })
    } else if (req.body.password !== req.body.passwordConfirm){
        return res.render('sign_up', {
            message: 'Passwords do not match.'
            })
    }

    mysql_connection.query('insert into patient_monitoring.physician set ? ', {medical_license: req.body.medical_license, name: req.body.first_name, last_name: req.body.last_name, password: req.body.password},  (err, result) => {
        if (err){
            console.log(err);
            return res.render('sign_up', {
                message: 'Save error'
                })
        }
        return res.render('login', {
                message: ''
                })
    });

    });
});
// PUT routes

router.post('/add_patient', (req, res) =>{
    mysql_connection.query('insert into patient_monitoring.patient set ? ', { medical_license: 5, name: req.body.name, last_name: req.body.last_name, sex: req.body.sex, age: req.body.age},  (err, result) => {
        if (err){
            console.log(err);
        }
    return res.send(true);
    });
    
});


router.get('/searhHistory', (req, res) => {
    mysql_connection.query('CALL HistoryDataByPatientId (?, ?, ?, ?)', [ req.query.id_patient, req.query.startdatetime, req.query.enddatetime, req.query.period ], (err, result) => {
        if (err){
            console.log(err);
        }
    return res.send(result);
    });
})

module.exports = router;