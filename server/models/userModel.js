// Mô hình User (Người dùng)
// Các trường được giải thích chi tiết bên dưới
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { type } = require('os');
var userSchema = new mongoose.Schema({
    // Tên đăng nhập (bắt buộc, duy nhất)
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    // Tên hiển thị
    displayname: {
        type: String,
        trim: true,
    },
    // Số điện thoại
    mobile: {
        type: String,
    },
    // Email
    email: {
        type: String,
    },
    // Mật khẩu (bắt buộc, được mã hóa)
    password: {
        type: String,
        required: true,
    },
    // Vai trò (Admin, User, Visitor), mặc định là Visitor
    role: {
        type: String,
        default: "Visitor",
        enum: [
            "Admin", "User", "Visitor"
        ],
    },
    // Trạng thái khóa tài khoản
    isBlocked: {
        type: Boolean,
        default: false,
        enum: [
            false, true
        ],
    },
}, {
    // Tự động thêm trường createdAt và updatedAt
    timestamps: true,
}
);


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.pre(['updateOne','findOneAndUpdate', 'findByIdAndUpdate'], async function (next) {
    let update = {...this.getUpdate()};
    // Only run this function if password was modified
    if (update.password){
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    update.password = await bcrypt.hash(this.getUpdate().password, salt);
    this.setUpdate(update);
    }
    next();
})

// userSchema.index({ username: 'text', displayname: 'text'});

module.exports = mongoose.model('User', userSchema);
