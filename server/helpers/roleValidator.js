const { check, body } = require('express-validator');
const asyncHandler = require("express-async-handler");

const addRoleValidator = [
   //  check('ten', 'Tên Loại Mẫu Thực Nghiệm Không Được Trống.').not().isEmpty(),
    // check('ghichu', 'Ghi Chú Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
];

const updateRoleValidator = [
   //  check('ten', 'Tên Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
    // check('ghichu', 'Ghi Chú Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
];
const deleteRoleValidator = [
   
];
const findRoleValidator = [
];


module.exports = {
    addRoleValidator,
    updateRoleValidator, 
    deleteRoleValidator,
    findRoleValidator,
}

