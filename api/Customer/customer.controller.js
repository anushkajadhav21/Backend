const customerModel = require("./customerModel");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res, next) => {

  console.log("V");
  
  const encryptedPassword = await bcrypt.hash(req.body.password,10)
  
  const newUser = new customerModel({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptedPassword,
    contactNo:req.body.contactNo,
    gender:req.body.gender
  });
  
  await newUser
    .save()
    .then((result) => {
      res.status(201).json({
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};


exports.jwtLogin = (req, res, next) => {
    customerModel.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "password incorrect..."
          });
        }

        if(result)
        {
          console.log(process.env.JWT_KEY)
          const token = jwt.sign(
          {
            email:user.email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          });

          return res.status(200).json({
            msg:'Auth Successfull...',
            token: token
          });
        }
        // res.status(401).json({
        //   msg:'Auth failed'
        // });
    })
  })
};

exports.adminLogin = (req, res, next) =>{
  if((req.body.email == 'admin@gmail.com') && (req.body.password == 'admin@123'))
  {
    res.status(200).json({
      msg: 'Admin Login Success...'
  });
  }else 
  {
        res.status(400).json({ message: 'You are not Admin...' });
  }
}

