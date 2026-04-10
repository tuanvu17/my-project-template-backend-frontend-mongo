const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {validateMongoDbId } = require('../utils/validateMongodbId');

const auth = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                console.log("🚀 ~ auth ~ user Role", user.role);
                if(user?._id) {
                    req.user = user;
                    req.user.token = token;
                    next();
                }else{
                    return res.status(403).json({
                        success: false,
                        msg: 'NOT Authorization token expired, Please Login again'
                    });
                }
            }
        } catch (error) {
            return res.status(403).json({
                success: false,
                msg: 'NOT Authorization token expired, Please Login again'
            });
            // throw new Error('NOT Authorization token expired, Please Login again')
        }
    } else {
        return res.status(403).json({
            success: false,
            msg: 'There is no token attached to header'
        });
        // throw new Error('There is no token attached to header')
    }
})


const notVisitor = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const Visitor = await User.findById({ _id });
    if (Visitor.role === "Visitor") {
        return res.status(400).json({
            success: false,
            msg: 'Access denied. Only Admin or Normal User have permission for this operation'
        });
    }
    else {
        next();
    }
})

const onlyAdminCanAccess = async (req, res, next) => {
    try {
        if (req.user.role != "Admin") { // Not Equal to admin (Access only when the user role is super admin)
            return res.status(400).json({
                success: false,
                msg: 'Access denied. Only Admin have permission for this operation.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            msg: 'Error When Check The Access Of Admin'
        });
    }
    return next();
};

const apiEndpointName = async (req, res, next) => {
    const apiEndpointName = req.originalUrl;
    const regex = /\/api\/(.*?)(?=\/)/;
    const match = apiEndpointName.match(regex);
    console.log("🚀 ~ apiEndpointName ~ req:", match[0]);
    next();
}

module.exports = { auth, onlyAdminCanAccess, notVisitor, apiEndpointName }