const { required, bool, boolean } = require('joi');
const mongoose= require('mongoose');
const validator= require('validator');

const AdminSchema= new mongoose.Schema({
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
    employeeID:{
        type:String,
        required:true,
        unique:true
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
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
},
{
    timestamps:true
});

const AdminAccess= mongoose.model('AdminAccess',AdminSchema)

module.exports=AdminAccess;