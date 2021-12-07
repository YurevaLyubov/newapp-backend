const StringCrypto = require('string-crypto');
require('dotenv').config()
const User = require('../Models/user');

const {
  encryptString,
  // decryptString,
} = new StringCrypto();


const allUsers = function(req, res) {
  let perPage = req.query.perPage || 10;
  perPage = parseInt(perPage, 10);

  let page = req.query.page;

  User.find()
    .select()
    .limit(perPage)
    .skip(perPage * (page-1))
    .sort({
      _id: 'asc'
    })
    .exec(function(err, users) {
      User.find().count().exec(function(err, count) {
        if(err) return res.status(400).send('Something broke!');
        res.send({
          users: users,
          page: page,
          pages: Math.ceil(count / perPage),
        })
      })
    })
};

const newUser = function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const userLogin = req.body.login;
  const userEmail = req.body.email;
  const userRole = req.body.role;
  let userPassword = req.body.password;
  userPassword = encryptString(userPassword, process.env.SALT);
  const userName = req.body.name;
  const userAge = req.body.age;
  const userGender = req.body.gender;

  const user = new User({
    login: userLogin,
    email: userEmail,
    password: userPassword,
    name: userName,
    age: userAge,
    gender: userGender,
    role: userRole,
  });
  
  user.save(function(err, userr){
    if(err) return res.status(400).send('Something broke!');
    res.send(userr);
  });
};

const deleteUser = function(req, res) {
  const id = req.body._id;
  User.deleteOne({_id: id}, function(err, user){
    if(err) return res.status(400).send('Something broke!');
    res.send(user);
  });
};

const changeUser = function(req, res){
  if(!req.body) return res.sendStatus(400);

  const id = req.body._id;
  let userPassword = req.body.password;
  userPassword = encryptString(userPassword, process.env.SALT);
  const userLogin = req.body.login;
  const userEmail = req.body.email;
  const userRole = req.body.role;
  const userName = req.body.name;
  const userAge = req.body.age;
  const userGender = req.body.gender;

  const newUser = {
    login: userLogin,
    email: userEmail,
    password: userPassword,
    name: userName,
    age: userAge,
    gender: userGender,
    role: userRole,
  };
  
  User.findOne({_id: id}, function(err, user){
    if(err) return res.status(400).send('Something broke!');

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, userLocal){
      if(err) return res.status(400).send('Something broke!');
      res.send(userLocal);
    });

  });
};

module.exports = {
  allUsers,
  newUser,
  deleteUser,
  changeUser,
};