import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName : {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[],
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[],
    }],
    profileImg:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;