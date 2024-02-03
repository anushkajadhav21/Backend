const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email:{ 
        type: String, 
        required: true,
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
        password: {type: String, required: true},
        contactNo: {type:Number},
        gender: {type: String}


});

const model = mongoose.model('Customer', customerSchema);

module.exports = model;