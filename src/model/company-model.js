// how company schema look like ------------
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    company_name : {
        type : String,
        required : true
    },
    company_place:{
        type : String,
        required :false
    },
    company_email:{
        type : String,
        required : true
    },
    company_phone:{
        type : Number,
        required : true
    },
    company_employee:{
        type : Number,
        required : true
    },
    company_website:{
        type : String,
        required : true
    },
    company_description:{
        type : String,
        required : true
    }
},{timeStamps: false}
);
module.exports = mongoose.model('Company',Schema);
