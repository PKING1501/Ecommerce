const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Shouldn't Exceed 30 Characters"],
        minLength:[4,"Name Should be more than 4 Characters"]
    },
    email: {
        type: String,
        required: [true,"Please Enter Your Email"],
        unique:true,
        validate: [validator.isEmail,"Please Enter A Valid Email"],
    },
    password: {
        type: String,
        required: [true,"Please Enter Your Password"],
        minLength: [8,"Password Should Have Atleast 8 Characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:[true,]
        },
        url:{
            type:String,
            required:[true,]
        },
    },
    role:{
        type:String,
        default: "user",
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save",async function(next){
    if(this.isModified("password"))
        this.password = await bcrypt.hash(this.password,10);
    else
        next();   
});

// JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating Password Request Token
userSchema.methods.getResetPasswordToken = function(){
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);