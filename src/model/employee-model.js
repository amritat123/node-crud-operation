// Employee Schema --------------------
const mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let mongoosePaginate = require("mongoose-paginate-v2");

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        // required: true,
        enum: ["Employee" , "Admin"]
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        default:true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
}, { timestamps: false});

employeeSchema.plugin(mongoosePaginate);
employeeSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Employee', employeeSchema);