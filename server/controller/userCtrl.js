
const asyncHandler = require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const { validateMongoDbId } = require('../utils/validateMongodbId')
const { generateRefreshToken } = require('../config/refreshtoken');
const jwt = require("jsonwebtoken");
const _ = require('lodash')
const User = require('../models/userModel');
const { helperForGetAll } = require('../helpers/helperForGetAll');

const { validationResult } = require('express-validator');

const createUser = asyncHandler(async (req, res) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { username } = req.body;

            const exits_username = await User.findOne({
                  username
            });

            if (exits_username) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Tài khoản đã tồn tại, vui lòng nhập lại!'
                  });
            }

            const user = {
                  "username": req.body.username,
                  "displayname": req.body.displayname || '',
                  "mobile": req.body.mobile || '',
                  "password": req.body.password,
                  "email": req.body.email,
                  "role": req.body.role,
            }

            const newUser = await User.create(user);
            const filteredUser = _.pick(newUser, ['username', 'displayname', "mobile", "role", "capbac", "chucvu", "donvi", "bophan", "isBlocked", "_id"]);

            return res.status(200).json({
                  success: true,
                  msg: 'You have successfully register user.',
                   
                  data: filteredUser
            });

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: error.message,
            });
      }
})

// Login User

const loginUser = asyncHandler(async (req, res) => {
      
      try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { username, password } = req.body;
            const findUser = await User.findOne({ username });

            //check User Block
            if (username !== 'SUPERADMIN' && findUser?.isBlocked) {
                  return res.status(400).json({
                        success: false,
                        msg: 'You are Blocked!',
                        data: ''
                  });
            }

            if (findUser) {
                  if (await findUser?.isPasswordMatched(password)) {
                        const token = generateToken(findUser?._id);
                        const user = {
                              _id: findUser?._id,
                              username: findUser?.username,
                              displayname: findUser?.displayname,
                              mobile: findUser?.mobile,
                              email: findUser?.email,
                              role: findUser?.role,
                              capbac: findUser?.capbac,
                              chucvu: findUser?.chucvu,
                              donvi: findUser?.donvi,
                              bophan: findUser?.bophan,
                              isBlocked: findUser?.isBlocked,
                        }

                        return res.status(200).json({
                              success: true,
                              msg: 'You have successfully logged in.',

                              data: { token, user }
                        });

                  } else {
                        return res.status(400).json({
                              success: false,
                              msg: 'Password NOT matched',
                               
                              data: ''
                        });
                  }
            } else {
                  return res.status(400).json({
                        success: false,
                        msg: 'Không tìm thấy người dùng.',
                         
                        data: ''
                  });

            }
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: error.message
            });
      }

})

//logout
const logoutUser = asyncHandler(async (req, res) => {
      try {
            req.user.token = '';
            return res.status(200).json({
                  success: true,
                  msg: 'You have successfully logout.',
                   
            });
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'You have faild logout.',
                  error: error.message
            });
      }

})


const getaUser = asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: errors.array()
            });
      }

      const { id } = req.params;
      if (!validateMongoDbId(id)) {
            return res.status(400).json({
                  success: false,
                  msg: "The ID is invalid! Check ID Again",
            });
      };
      try {
            const getaUser = await User.findById(id).select('-password');
            console.log("🚀 ~ getaUser ~ getaUser:", getaUser)
            if (!getaUser) {
                  return res.status(400).json({
                        success: false,
                        msg: 'User not found',
                  });
            }
            res.json({
                  success: true,
                  msg: 'You have successfully get All User',
                   
                  data: getaUser
            })
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})

const getallUser = asyncHandler(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: "errors.array()"
            });
      }

      try {
            const queryObj = { ...req.body }
            if (req.user.role !== 'Admin') queryObj.role = { $ne: 'Admin' }

            const result = await helperForGetAll(queryObj, User);
            if (result?.length > 0) {
                  res.status(200).json({
                        success: true,
                        msg: 'You have successfully get All User',
                         
                        data: result
                  });
            } else {
                  return res.status(200).json({
                        success: true,
                        data: result
                  });
            }
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})

const deleteaUser = asyncHandler(async (req, res) => {



      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { id } = req.params;
            if (!validateMongoDbId(id)) {
                  return res.status(400).json({
                        success: false,
                        msg: "The ID is invalid! Check ID Again",
                  });
            };
            const deleteaUser = await User.findByIdAndDelete(id);
            if (!deleteaUser) {
                  return res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                  });
            }
            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Delete.',
                   
                  data: deleteaUser
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})

const updatedUser = asyncHandler(async (req, res) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            // only Super Admin to change role
            if (req.user.role !== 'Admin' && req.body.role && req.body.role !== req.user.role) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Only Admin to change Role',
                  });
            }

            // check is Me
            if (req.user.role !== 'Admin' && req.user._id.toString() !== req.body._id) {
                  return res.status(400).json({
                        success: false,
                        msg: 'You cannot edit other user information.',
                  });
            }

            const { _id } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                  _id,
                  { ...req.body },
                  {
                        new: true,
                  }
            ).select("-password");

            if (!updatedUser) {
                  return res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                  });
            }

            res.json({
                  success: true,
                  msg: 'You have successfully Update.',
                   
                  data: updatedUser
            })
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Failed to update user',
            });
      }
})

// Logout : // clear Token
const logout = asyncHandler(async (req, res) => {
})

const changeRoleUser = asyncHandler(async (req, res) => {



      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { _id, role } = req.body;
            const findUser = await User.findByIdAndUpdate(
                  _id,
                  { role },
                  {
                        new: true,
                  }
            ).select("-password");
            if (!findUser) {
                  return res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                  });
            }
            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Change Role.',
                   
                  data: { "role": `${findUser.role}` }
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})


const changePwdUser = asyncHandler(async (req, res) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { _id, password } = req.body;
            // check is Me
            if (req.user.role !== 'Admin' && req.user._id.toString() !== req.body._id) {
                  return res.status(400).json({
                        success: false,
                        msg: 'You cannot edit other user information.',
                  });
            }


            const findUser = await User.findByIdAndUpdate(
                  _id,
                  { password },
                  {
                        new: true,
                  }
            ).select("-password");

            if (!findUser) {
                  res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                         
                  })
            }

            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Change Password.',
                   
                  data: findUser
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})


const forgotPwdUser = asyncHandler(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: errors.array()
            });
      }

      const { _id, password } = req.body;
      if (!validateMongoDbId(_id)) {
            return res.status(400).json({
                  success: false,
                  msg: "The ID is invalid! Check ID Again",
            });
      };
      try {
            const findUser = await User.findByIdAndUpdate(
                  _id,
                  { password },
                  {
                        new: true,
                  }
            ).select("-password");
            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Change Password.',
                   
                  data: findUser
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})

const blockUser = asyncHandler(async (req, res) => {



      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { _id } = req.body;
            const findUser = await User.findByIdAndUpdate(
                  _id,
                  { isBlocked: true },
                  {
                        new: true,
                  }
            ).select("-password");
            if (!findUser) {
                  res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                         
                  })
            }
            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Block User.',
                   
                  data: findUser
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})

const unblockUser = asyncHandler(async (req, res) => {



      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { _id } = req.body;
            const findUser = await User.findByIdAndUpdate(
                  _id,
                  { isBlocked: false },
                  {
                        new: true,
                  }
            ).select("-password");
            if (!findUser) {
                  res.status(400).json({
                        success: false,
                        msg: 'User not found!',
                         
                  })
            }
            res.status(200).json({
                  success: true,
                  msg: 'You have successfully UnBlock User.',
                   
                  data: findUser
            })

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})


const findUser = asyncHandler(async (req, res) => {

      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { anyquery } = req.body;
            const findUser = await User.find()
                  .where({
                        $or: [
                              { username: { $regex: `${anyquery}`, $options: 'i' } },
                              { displayname: { $regex: `${anyquery}`, $options: 'i' } },
                              { email: { $regex: `${anyquery}`, $options: 'i' } },
                              { role: { $regex: `${anyquery}`, $options: 'i' } },
                              { mobile: { $regex: `${anyquery}`, $options: 'i' } },
                              { capbac: { $regex: `${anyquery}`, $options: 'i' } },
                              { chucvu: { $regex: `${anyquery}`, $options: 'i' } },
                              { donvi: { $regex: `${anyquery}`, $options: 'i' } },
                        ], // Nếu là Admin thì trả về all, nếu không là Admin thì trả all và trừ Admin
                        ...(req.user.role === 'Admin' ? {} : { role: { $nin: "Admin" } }),
                        ...(req.body.role ? { role: req.body.role} : ''),
                        
                  })
                  .limit(10)
                  .sort({ displayname: 1 })
                  .select("-password")

            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Find User By Username.',
                   
                  data: findUser
            });

      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})


const findGroupUser = asyncHandler(async (req, res) => {


      try {
            // 
            // const findUserByRole = await User.find({
            //       $and: [
            //             { role: `${role}` },
            //       ],
            //       ...(req.user.role === 'Admin' ? {} : { role: { $nin: ["Admin"] } }),
            // })
            //       .sort({ username: 1 }); 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        msg: 'Errors',
                        errors: errors.array()
                  });
            }

            const { role } = req.body;
            const queryObj = {
                  ...req.body, ...{
                        $and: [
                              { role: `${role}` },
                        ],
                        ...(req.user.role === 'Admin' ? {} : { role: { $nin: ["Admin"] } }),
                  }
            }

            const result = await helperForGetAll(queryObj, User);

            res.status(200).json({
                  success: true,
                  msg: 'You have successfully Find User By Role.',
                   
                  data: result
            })
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: error
            });
      }
})


// Get current user profile (self)
const getMe = asyncHandler(async (req, res) => {
      try {
            const user = await User.findById(req.user._id).select('-password');
            if (!user) {
                  return res.status(404).json({
                        success: false,
                        msg: 'User not found',
                  });
            }
            res.json({
                  success: true,
                  msg: 'Profile retrieved successfully',
                  data: user
            });
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: error.message,
            });
      }
});

// Update current user profile (self)
const updateMe = asyncHandler(async (req, res) => {
      try {
            // Only allow updating safe fields
            const allowedFields = ['displayname', 'mobile', 'email', 'capbac', 'chucvu', 'donvi', 'bophan'];
            const updates = {};
            for (const field of allowedFields) {
                  if (req.body[field] !== undefined) {
                        updates[field] = req.body[field];
                  }
            }

            const updatedUser = await User.findByIdAndUpdate(
                  req.user._id,
                  updates,
                  { new: true }
            ).select('-password');

            if (!updatedUser) {
                  return res.status(404).json({
                        success: false,
                        msg: 'User not found',
                  });
            }

            res.json({
                  success: true,
                  msg: 'Profile updated successfully',
                  data: updatedUser
            });
      } catch (error) {
            return res.status(400).json({
                  success: false,
                  msg: error.message,
            });
      }
});

module.exports = {
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
}

