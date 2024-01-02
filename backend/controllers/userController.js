const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


// Register a User

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }); 

    sendToken(user,201,res);
});

//Login User

exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user has given both pass and email
    if(!email || !password)
        return next(new Errorhandler("Please Enter Both Email And Password",400));

        try {
            const user = await User.findOne({ email: req.body.email }).select("+password");
    
            if (!user) {
                return next(new Errorhandler("Invalid Email Or Password", 401));
            }
    
            const isPasswordMatched = await user.comparePassword(password);
    
            if (!isPasswordMatched) {
                return next(new Errorhandler("Invalid Email Or Password", 401));
            }
    
            sendToken(user, 200, res);
        } catch (error) {
            return next(new Errorhandler("An Error Occurred While Processing Your Request, Please Try Again", 500));
        }
});

//Logout User

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
});

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user)
    {
        return next(new Errorhandler("User Not Found",404));
    }

    //Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your Password ResetToken Is: \n\n ${resetPasswordUrl}\n\n If You Have Not Requested This Email Then Please Ignore`;

    try{
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email Sent To ${user.email} Successfully`
        });

    }catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new Errorhandler(error.message,500));
    }
});

//Reset Password

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    //Creating token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    });

    if(!user)
        return next(new Errorhandler("Reset Password Token Is Invalid Or Has Expired",400));

    if(req.body.password !== req.body.confirmPassword)
        return next(new Errorhandler("Passwords Do Not Match",400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user,200,res);
});

//Get User Details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    sendToken(user,200,res);
});

// Update User Password

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new Errorhandler("Old Password Is Incorrect", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new Errorhandler("Passwords Don't Match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    // Check if avatar field exists in the request body
    if (req.body.avatar !== undefined && req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      // If user has an existing avatar, delete it from cloudinary
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
  
      // Upload the new avatar to cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(
      req.user.id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  
//Get All Users --Admin
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    })
});

//Get Single User --Admin
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User Doesn't Exit With Id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    })
});

// Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);
    if(!user)
        return next(new Errorhandler(`User Not Found With Id: ${req.params.id}`));

    if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message: "User Deletion Successful",
    })
});
