const { check, body } = require('express-validator');
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require('../utils/validateMongodbId')

const registerValidator = [
    check('username', 'Username is Required.').not().isEmpty(),
    check('username').custom(async username => {
        if (!(/^\S{4,64}$/.test(username))) {
            throw new Error('Invalid username. Username must be between 4 and 64 characters in length, and should not contain spaces or special characters.');
        }
    }),
    // check('email', 'Please Enter a valid E-mail Address').optional().isEmail().normalizeEmail({
    //     gmail_remove_dots: true
    // }),
    check('mobile', 'Please Enter a valid Number Phone').optional().isMobilePhone()
        .isLength({
            min: 10,
        })
        .withMessage('Please Enter a valid Number Phone')
        .isLength({
            max: 10,
        })
        .withMessage('Please Enter a valid Number Phone'),
    check('password', 'Password is Required.').not().isEmpty(),
    check('password', 'Password more than 6 degits').optional().isLength({ min: 6 }),
    check('role').optional().isIn(['Admin', 'User', 'Visitor']).withMessage('Role must be Admin | user | User | Visitor'),
];

const loginValidator = [
    check('username').custom(async username => {
        if (!(/^\S{4,64}$/.test(username))) {
            throw new Error('Invalid username. Username must be between 4 and 64 characters in length, and should not contain spaces or special characters.');
        }
    }),
    check('username', 'Username is Required.').not().isEmpty()
        .trim()
        .isLength({
            min: 2,
            max: undefined,
        })
        .withMessage('Username too short')
        .isLength({
            min: 0,
            max: 64
        })
        .withMessage('Username too long'),
    check('password', 'Password is Required!').not().isEmpty(),
];

const updateUserValidator =
    [
        check('_id', 'UID is Required.').not().isEmpty(),
        check('_id', 'UID is Required.').optional().custom(async _id => {
            if (!validateMongoDbId(_id)) {
                throw new Error('The ID is invalid! Check ID Again!');
            }
        }),
        check('username').optional().custom(async value => {
            throw new Error('You can not change username when updating user. Contact the Admin');
        }),
        check('password').optional().custom(async value => {
            throw new Error('You can not change password when updating user. Contact the Admin to change Password');
        }),
        check('role').optional().custom(async value => {
            throw new Error('You can not change Role when updating user. Contact the Admin to change Password');
        }),
        check('isBlocked').optional().custom(async value => {
            throw new Error('You can not change isBlocked when updating user. Contact the Admin to change Password');
        }),

        check('mobile', 'Please Enter a valid Number Phone').optional().isMobilePhone()
            .isLength({
                min: 10,
            })
            .withMessage('Please Enter a valid Number Phone')
            .isLength({
                max: 10,
            })
            .withMessage('Please Enter a valid Number Phone'),
        // check('email', 'Please Enter a valid E-mail Address').optional().isEmail().normalizeEmail({
        //     gmail_remove_dots: true
        // }),
        check('role').optional().isIn(['Admin', 'User', 'Visitor']).withMessage('Role must be Admin | user | User | Visitor'),
    ];

const getAllUserValidator = [

]

const deleteUserValidator = [
    // check('_id', 'The ID is required.').not().isEmpty(),
]

const changeRoleUserValidator = [
    check('_id', 'The ID is required.').not().isEmpty(),
    check('_id', 'UID is Required.').optional().custom(async _id => {
        if (!validateMongoDbId(_id)) {
            throw new Error('The ID is invalid! Check ID Again!');
        }
    }),
    check('role', "Please Enter The Role").notEmpty(),
    check('role').isIn(['Admin', 'User', 'Visitor']).withMessage('Role must be Admin | User | Visitor'),
]


const changePasswordUserValidator = [
    check('_id', 'The ID is required.').not().isEmpty(),
    check('_id', 'UID is Required.').optional().custom(async _id => {
        if (!validateMongoDbId(_id)) {
            throw new Error('The ID is invalid! Check ID Again!');
        }
    }),
    check('password', 'Password is Required.').not().isEmpty(),
    check('password', 'Password more than 6 degits').isLength({ min: 6 }),
]

const forgotUserValidator = [
    check('_id', 'The ID is required.').not().isEmpty(),
    check('_id', 'UID is Required.').optional().custom(async _id => {
        if (!validateMongoDbId(_id)) {
            throw new Error('The ID is invalid! Check ID Again!');
        }
    }),
]

const blockUserValidator = [
    check('_id', 'The ID is required.').not().isEmpty(),
    check('_id', 'UID is Required.').optional().custom(async _id => {
        if (!validateMongoDbId(_id)) {
            throw new Error('The ID is invalid! Check ID Again!');
        }
    }),
    check('isBlocked').optional().isIn([true, false]).withMessage('isBlocked must be true | false'),

]

const unblockUserValidator = [
    check('_id', 'The ID is required.').not().isEmpty(),
    check('_id', 'UID is Required.').optional().custom(async _id => {
        if (!validateMongoDbId(_id)) {
            throw new Error('The ID is invalid! Check ID Again!');
        }
    }),
    check('isBlocked').optional().isIn([true, false]).withMessage('isBlocked must be true | false'),

]
const findUserValidator = [
    check('anyquery', 'The filed query is required.').trim().not().isEmpty(),
]

const findGroupUserValidator = [
    check('role', "Please Enter The Role").notEmpty(),
    check('role').isIn(['Admin', 'User', 'Visitor']).withMessage('Role must be Admin | User | Visitor')
]

module.exports = {
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
}

