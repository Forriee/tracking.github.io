const mysql = require('mysql2')
const configDB = require('../config/configDB')
const connection = mysql.createConnection(configDB.connection)
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { resetpassword } = require('../functions/resetpassword')
const { sendmail } = require('../functions/sendmail')

module.exports = {

    getDoctorSignup: function(req, res, next){
        return res.render('../views/doctor/register')
    },

    postDoctorSignup: passport.authenticate('local-signup-doctor', {
        successRedirect : '/authenticate/home', 
        failureRedirect : 'register', 
        failureFlash : true, 
        session: false
    }),

    getDoctorLogin: function(req, res, next){
        res.render('../views/admin/login')
    },

    postDoctorLogin: passport.authenticate('local-login-doctor', {
        successRedirect : '/admin/equipment', 
        failureRedirect : 'login', 
        failureFlash : true 
    }),

    logout: function(req, res, next){ 
        req.logout()
        req.session.passport.user = null;
        res.redirect("/authenticate/admin/login")
    },

    getForget: function(req, res, next){
        return res.render('../views/basic/forget')
    },

    getHome: function(req, res, next){
        return res.render('../views/basic/home')
    },

    getForpass: function(req, res, next) {
        return res.render('../views/basic/postforget')
    },

    putForpass: function(req, res, next) {
        if(req.body.newpassword!=req.body.confirmpassword){
            req.flash('error', 'Password does not match with confirmatory password!')
            return res.redirect('/authenticate/Forpass/')
        }else{
            const email = decode.email
            const hash = bcrypt.hashSync(req.body.newpassword, saltRounds)
            if(resetpassword(email, hash)){
                req.flash('success', 'Password Changed!')
                return res.redirect('/authenticate/admin/login')
            }else{
                req.flash('error', 'User does not exist')
                return res.redirect('/authenticate/Forpass')
            }
        }
    },

    postForget: function(req, res, next){
        const reciever = req.body.email
        const subject = 'Reset Password'

        const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '1h' }) 
        const url = `http://localhost:1010/authenticate/forget/${token}`;
        const message = `Please click this link to reset your password(link is only valid for an hour): <a href="${url}">Reset Password</a>`
        sendmail(reciever, subject, message)
        req.flash('success', `${url}`)
        return res.redirect('/authenticate/forpass')
    },

    getResetPassword: function(req, res, next){
        jwt.verify(req.params.token, process.env.SECRET_KEY, function(error, decode){
            if(error){
                console.log(error.name)
                console.log(error.message)
                console.log(error.expiredAt)
                req.flash('error', 'Invalid Token!')
                return res.redirect('/authenticate/forget')
            }else{
                return res.render('../views/basic/resetpassword',{ token: req.params.token })
            }
        })
    },

    putResetPassword: function(req, res, next){
        jwt.verify(req.params.token, process.env.SECRET_KEY, function(error, decode){
            if(error){
                console.log(error.name)
                console.log(error.message)
                console.log(error.expiredAt)
                req.flash('error', 'Invalid Token!')
                return res.redirect('/authenticate/forget')
            }else if(req.body.newpassword!=req.body.confirmpassword){
                req.flash('error', 'Password does not match with confirmatory password!')
                return res.redirect('/authenticate/forget/'+req.params.token)
            }else{
                const email = decode.email
                const hash = bcrypt.hashSync(req.body.newpassword, saltRounds)
                if(resetpassword(email, hash)){
                    req.flash('success', 'Password Changed!')
                    return res.redirect('/authenticate/admin/login')
                }else{
                    req.flash('error', 'User does not exist')
                    return res.redirect('/authenticate/forget')
                }
            }
        })
    },

    getVerifyAccount: function(req, res, next){
        jwt.verify(req.params.token, process.env.SECRET_KEY, function(error, decode){
            if(error){
                console.log(error.name)
                console.log(error.message)
                console.log(error.expiredAt)
                req.flash('error', 'Invalid Token!')
                return res.redirect('/authenticate/admin/login')
            }else{
                const email = decode.email
                connection.query("UPDATE DOCTOR SET VERIFIED=TRUE WHERE EMAIL = ?",
                    [email],
                    function(error, rows, fields){
                        if(error){
                            console.log(error)
                            req.flash('error', 'Some error occurred!')
                            return res.redirect('/authenticate/admin/login')
                        }else if(rows.changedRows){
                            req.flash('success', 'Account verified')
                            return res.redirect('/authenticate/admin/login')
                        }
                    })
            }
        })
    },

    getVerifyAccountAgain: function(req, res, next){
        return res.render('../views/basic/verifyaccount')
    },

    putVerifyAccountAgain: function(req, res, next){
        const reciever = req.body.email
        const subject = 'Verify Account'

        const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY) 
        const url = `http://localhost:1010/authenticate/verifyaccount/${token}`;
        const message = `Please click this link to verify your account: <a href="${url}">Verify Account</a>`
        
        sendmail(reciever, subject, message)
        req.flash('info', 'Email sent! Do not forget to check your spam')
        return res.redirect('/authenticate/admin/login')
    },
}