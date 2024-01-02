const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token)
        return next(new Errorhandler("Please Login To Gain Access",401));
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();

});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role: ${req.user.role} Isn't Allowed To Gain Access`,403));
        }
        next();
    };
};

