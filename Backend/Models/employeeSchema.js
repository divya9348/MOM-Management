const { required, bool, boolean } = require('joi');
const mongoose= require('mongoose');
const validator= require('validator');

const employeeSchema= new mongoose.Schema({
    employeeName:{
        type:String,
        required:true,
    },
    employeeEmail:{
        type:String,
        required:true,
        unique:true,
        default:null,
        index:true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email",
          },
    },
    phoneno:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
},
{
    timestamps:true
});

const employeeData= mongoose.model('employeedata',employeeSchema)

module.exports=employeeData;