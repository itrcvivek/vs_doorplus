const ErrorHandler = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{
    err.statusCode =  err.statusCode || 500;
    err.message =  err.message || "server issue";
    // wrong mongodb id error
    if(err.name=== "CastError"){
        const message = 'Resource not found. Invaild: $(err.path)';
        err = new ErrorHandler(message, 400 );
    }
    res.status( err.statusCode).json({
        success:false,
        message:err.message,
    });
    // duplicate key error
    if(err.code===11000){
        const message =`Duplicate ${Object.keys(err.keyvalue)} Entered`
      err= new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};