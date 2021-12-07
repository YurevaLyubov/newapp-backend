const StringCrypto = require('string-crypto');
require('dotenv').config()
const User = require('../Models/user');

const {
  encryptString,
  decryptString,
} = new StringCrypto();

const me = function(req, res) {
  const user = req.user;

  User.findById(user.id, function(err, userLocal){
    if(err) return res.status(400).send('Something broke!');
    res.send(userLocal);  
  });
};
    
const changeUsers = function(req, res){
  if(!req.body) return res.sendStatus(400);
  const id = req.body._id;
  const userName = req.body.name;
  const userAge = req.body.age;
  const userGender = req.body.gender;
  const newUser = {name: userName, age: userAge, gender: userGender};
    
  User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
    if(err) return res.status(400).send('Something broke!'); 
    res.send(user);
  });
};

const changePassword = function(req, res){
  if(!req.body) return res.sendStatus(400);

  const id = req.body._id;
  let userPassword = req.body.password;
  userPassword = encryptString(userPassword, process.env.SALT);
  const newUser = {password: userPassword};
  const password2 = req.body.password2;
  
  User.findOne({_id: id}, function(err, user){
    user.password = decryptString(user.password, process.env.SALT);

    if(err) return res.status(400).send('Something broke!');

    if (user.password === password2) {

      User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, userLocal){
        if(err) return res.status(400).send('Something broke!');
        res.send(userLocal);
      });

    } else {
      res.status(400).send({ message: 'Неверно указан текущий пароль!' });
    }
  });
};

module.exports = {
  me,
  changeUsers,
  changePassword,
}