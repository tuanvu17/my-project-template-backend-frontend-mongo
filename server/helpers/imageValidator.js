const { check, body } = require('express-validator');
const asyncHandler = require("express-async-handler");

const uploadImageValidator = [
   //  check('ten', 'Tên Loại Mẫu Thực Nghiệm Không Được Trống.').not().isEmpty(),
    // check('ghichu', 'Ghi Chú Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
];

const getallImageValidator = [
 ];
 const getaImageValidator = [
    //  check('ten', 'Tên Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
     // check('ghichu', 'Ghi Chú Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
 ];
const updateImageValidator = [
   //  check('ten', 'Tên Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
    // check('ghichu', 'Ghi Chú Loại Mẫu Thực Nghiệm Không Được Trống.').optional().not().isEmpty(),
];

const deleteImageValidator = [
];

const findImageValidator = [

];

module.exports = {
    uploadImageValidator,
    getaImageValidator,
    updateImageValidator, 
    deleteImageValidator,
    findImageValidator,
    getallImageValidator
}

