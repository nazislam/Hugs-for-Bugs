const express = require('express');
const registerRouter = express.Router();
const passport = require('passport');
const mysql = require('mysql');
const config = require('../config');

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'main',
};

const db = mysql.createConnection(options);

// common route for registration (advertiser/user)
registerRouter.route('/')
  .get(function(req, res) {
    res.json({ message: 'in register router...' });
  })
  .post(function(req, res) {
    let data = req.body;
    console.log(data);
    let sql = 'INSERT INTO User SET ?';
    let query = db.query(sql, data, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json({ message: 'New advertiser created' , user: req.body });
    });
  });

/*
registerRouter.route('/productOwner')
  .get(function(req, res) {
    // res.render('register');
    res.json({ message: 'in register router...' });
  })
  .post(function(req, res) {
    let data = req.body;
    console.log(data);
    let sql = 'INSERT INTO User SET ?';
    let query = db.query(sql, data, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json({ message: 'New product owner created' , user: req.body });
    });
  });

registerRouter.route('/advertiser')
  .get(function(req, res) {
    // res.render('register');
    res.json({ message: 'in register router...' });
  })
  .post(function(req, res) {
    let data = req.body;
    console.log(data);
    let sql = 'INSERT INTO User SET ?';
    let query = db.query(sql, data, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json({ message: 'New advertiser created' , user: req.body });
    });
  });
*/

registerRouter.route('/signin')
  .get(function(req, res) {
    // res.render('signin');
    res.json({message: 'in sign in'});
  })
  .post(passport.authenticate('local'), 
    // If this function is called, user is authenticated
    function(req, res) {
      if (req.user) {
        res.json({ message: 'user logged in', user: req.user });
      }
    }
    /*{
      successRedirect: '/register/profile',
      failureRedirect: '/'
    }*/
  );

registerRouter.route('/profile')
  .get(function(req, res) {
    console.log('req.user:', req.user);
    res.json({ message: 'user signed in', user: req.user });
    // const user = req.user;
    // res.render('profile', { email: user.email, password: user.password });
  });

module.exports = registerRouter;
