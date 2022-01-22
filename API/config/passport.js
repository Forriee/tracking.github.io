const LocalStrategy = require('passport-local').Strategy
const mysql = require('mysql2')
const configDB = require('./configDB')
const connection = mysql.createConnection(configDB.connection)
const bcrypt = require('bcrypt')
const generateUserId = require('../functions/generateuserid')
const { sendmail } = require('../functions/sendmail')
const jwt = require('jsonwebtoken')
const saltRounds = 10

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        if( user.Admin_id )
            done(null, { Admin_id:user.Admin_id })
        else if(user.Doctor_id )
            done(null, { Doctor_id:user.Doctor_id })
        else
            done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        if( user.Admin_id ){
            connection.query("SELECT * FROM HADMIN WHERE ADMIN_ID = ?", [user.Admin_id], (err,rows) =>{
                done(null, rows[0])
            })
        }
        else if(user.Doctor_id ){
            connection.query("SELECT * FROM DOCTOR WHERE DOCTOR_ID = ?", [user.Doctor_id], (err,rows) =>{
                done(null, rows[0])
            })
        }else{
            done(null, user)
        }
    })


    passport.use('local-login-doctor', new LocalStrategy({
        usernameField : 'email', 
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        if(!email || !password) {
            return done(null, false, req.flash('error', 'Fill all required fields(* means field is required)'))
        }

        connection.query("SELECT * FROM DOCTOR WHERE EMAIL = ?",[email],function(err,rows){
            if(err){
                return done(err)
            }
            if(!rows.length){ 
                req.flash('error', 'No admin found.')
                return done(null, false)
            }

            bcrypt.compare(password, rows[0].Pass, function(err, result) {
                if(err){
                    console.log(err)
                }
                if(!result){
                    req.flash('error', 'Wrong password.')
                    return done(null, false)
                }else{
                    return done(null, rows[0] )
                }
            });	
        })}
    ))
}