const express = require("express");
const {
    createUser,
    loginUser,
    logoutUser,
    getaUser,
    getallUser,
    deleteaUser,
    updatedUser,
    changeRoleUser,
    changePwdUser,
    forgotPwdUser,
    blockUser,
    unblockUser,
    findUser,
    findGroupUser,
    getMe,
    updateMe
} = require("../controller/userCtrl");

const { auth, onlyAdminCanAccess, notVisitor, apiEndpointName } = require("../middlewares/authMiddleware");

const { 
    registerValidator,
    loginValidator, 
    updateUserValidator, 
    getAllUserValidator,
    deleteUserValidator,
    changeRoleUserValidator,
    changePasswordUserValidator,
    forgotUserValidator,
    blockUserValidator,
    unblockUserValidator,
    findUserValidator,
    findGroupUserValidator
 } = require('../helpers/userValidator');

const router = express.Router();

router.post("/register",registerValidator, createUser);
router.post("/login", loginValidator, loginUser);
router.get("/logout", auth, logoutUser);
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);
router.post("/all-users",auth, notVisitor, getAllUserValidator, getallUser); // Only Admin + User
router.get("/:id", auth, notVisitor, getaUser);
router.delete("/:id", auth, onlyAdminCanAccess, deleteUserValidator, deleteaUser); // Admin
router.put("/edit-user", auth, notVisitor, updateUserValidator, updatedUser); 
router.put("/change-role", auth, onlyAdminCanAccess, changeRoleUserValidator, changeRoleUser);
router.put("/change-password", auth, notVisitor, changePasswordUserValidator, changePwdUser);
router.post("/forgot-password", auth, onlyAdminCanAccess, forgotUserValidator, forgotPwdUser);
router.put("/block-user", auth, onlyAdminCanAccess, blockUserValidator, blockUser);
router.put("/unblock-user", auth, onlyAdminCanAccess, unblockUserValidator, unblockUser);
router.post("/find-user", auth, notVisitor, findUserValidator, findUser);
router.post("/find-group-user", auth, notVisitor, findGroupUserValidator, findGroupUser);


module.exports = router;