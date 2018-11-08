const express = require('express');
const profileRouter = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'db01'
});

profileRouter.route('/edit')
  .get((req, res) => {
    res.json({message: 'in profile edit route get'});
  })
  .post((req, res) => {
    console.log('on profile edit');
    let user = req.body;
    let email = user.email; let password= user.password;
    let id = user.id;
    let sql = 'UPDATE User SET email=${email} WHERE if=${id}';
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json({message: 'updated user information'});
    });
  });


module.exports = profileRouter;
