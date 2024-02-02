const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongodb).then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.log(error);
  console.log('Error connecting to Mongo');
});


var customerroute = require('./api/Customer/customerroute');
var productroute = require('./api/Product/productRoutes');
var app1 = express();

app1.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());
app.use('/customer',customerroute);
app.use('/product',productroute)

app.use((req, res, next) => {
  const error = new Error('Not Found');  
  error.status= 404;
  next(error);
})

app.use((error, req, res, next) =>{
res.status(error.status || 500);
res.json({
   error: {
     message: error.message                                                                                 
   }                                                                                   
})                                                                                      
})

// app.use((req, res, next)=>{
//   res.status(200).json({
//        msg: 'It works!!!'                                                                                   
//   })                                                                                        
// })
app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
module.exports = app;