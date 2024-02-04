const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName:{type:String, required:true},
    email:{ 
        type: String, 
        required: true,
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    phoneNo: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true}
});

const model = mongoose.model('Customer', customerSchema);

module.exports = model;