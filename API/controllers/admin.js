const mysql = require('mysql2')
const configDB = require('../config/configDB')
const connection = mysql.createConnection(configDB.connection)
const bcrypt = require('bcrypt')
const saltRounds = 10
const {v4 : uuidv4} = require('uuid')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
    getDoctorDashboard: function(req, res, next){
        return res.render('../views/admin/dashboard')
    },

    getDoctorsProfile: function(req, res, next){
        return res.render('../views/admin/updateprofile')
    },

    getDoctorProfile: function(req, res, next){
        return res.render('../views/admin/profile')
    },

    putDoctorProfile: function(req, res, next){
        connection.query("UPDATE DOCTOR SET FNAME = ?, MNAME = ?, LNAME = ? WHERE DOCTOR_ID = ?",
        [req.body.fname, req.body.mname, req.body.lname, req.user.Doctor_id],
        function(error, rows, fields){
            if(error){
                console.log(error)
            } else{
                        req.flash('success', 'Successfully update profile')
                        return res.redirect('/admin/profile')
                    }
        })
    },

    postNewitem: function(req, res, nex){
        const newID = uuidv4();
        let query="insert into item (Item_id, name, brand, cond, price, location, lifespan) values (?,?,?,?,?,?,?)"
        connection.query(query,
            [newID, req.body.itemname, req.body.brand, req.body.condition, req.body.price, req.body.location, req.body.span],
            (err, rows) =>{
                if(err){
                    req.flash('error', 'Error in appointment post')
                    console.log('Err in appt post: '+err)
                    res.redirect('/admin/dashboard')
                }
                else{
                    req.flash('success', 'Item Successfully Added')
                    console.log("Appointment post: "+rows)
                    res.redirect("/admin/equipment")
                }
            })
    },

    postEmail: function(req, res, nex){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.GMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: 'forrester.johnston@ctu.edu.ph', 
            to: req.body.email,
            subject: 'Equipment Maintenance',
            text: req.body.about
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error occurs');
            }else{
                console.log('Email sent!!!');
                res.redirect("/admin/equipment")
            }
        });
        

    },

    putAppointment: function(req, res, next){
        
          connection.query("update item set name=?, brand = ?, cond=?, price=?, location=?, lifespan=? where item_id = ? and maintenance=false", [req.body.itemname, req.body.brand, req.body.condition, req.body.date, req.body.user, req.body.span, req.params.id, req.user.maintenance], (err, result) =>{
            
            if(err){
                  console.log(err)
                  res.redirect("/admin/equipment")
            }else{
                  console.log("Assigned time: "+result)
                  req.flash("success", "Successfully Updated the Equipment")
                  res.redirect("/admin/equipment")
          
              }
          })
    },

    getEmailChange: function(req, res, next){
        return res.render('../views/admin/emailchange')
    },

    putEmailChange: function(req, res, next){
        if(req.user.Email!=req.body.email){
            connection.query("SELECT EMAIL FROM DOCTOR WHERE EMAIL = ?",
            [req.body.email],
            function(error, rows, field){
                if(error){
                    console.log(error)
                    return res.redirect('profile')
                }else if(rows.length){
                    req.flash('error', 'Email already taken')
                    return res.redirect('profile')
                }else{
                    connection.query("UPDATE DOCTOR SET EMAIL = ? WHERE DOCTOR_ID = ?",
                    [req.body.email, req.user.Doctor_id],
                    function(error, rows, fields){
                        if(error){
                            console.log(error)
                            return res.redirect('profile')
                        }else if(rows.length){
                            req.flash('error', 'Email already taken')
                            return res.redirect('profile')
                        }else{
                            req.flash('success', 'Successfully update email')
                            return res.redirect('profile')
                        }
                    })
                }
            })
        }else{
            req.flash('info', 'Same email as old one!')
            return res.redirect('profile')
        }
    },

    getPasswordChange: function(req, res, next){
        return res.render('../views/admin/passwordchange')
    },

    putPasswordChange: function(req, res, next){
        connection.query("SELECT PASS FROM DOCTOR WHERE DOCTOR_ID = ?",
        [req.user.Doctor_id],
        function(error, rows, fields){
            if(error){
                console.log(error)
                return res.redirect('equipment')
            }else{
                bcrypt.compare(req.body.oldpassword, rows[0].PASS, function(err, result) {
                    if(err){
                        console.log(err)
                    }
                    if(!result){
                        req.flash('error', 'Wrong Old Password!')
                        return res.redirect('equipment')
                    }else{
                        bcrypt.hash(req.body.newpassword, saltRounds, function(err, hash) {
                            connection.query("UPDATE DOCTOR SET PASS = ? WHERE DOCTOR_ID = ?",
                            [hash, req.user.Doctor_id],
                            function(error, rows, fields){
                                if(error){
                                    console.log(error)
                                    return res.redirect('equipment')
                                }else{
                                    req.flash('success', 'Password Changed!')
                                    return res.redirect('equipment')
                                }
                            })
                        })
                    }
                })
            }
        })
    },
}