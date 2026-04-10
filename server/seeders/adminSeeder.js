const User = require('../models/userModel');

/**
 * Seed dữ liệu admin mặc định
 * Chỉ tạo nếu chưa tồn tại trong database
 */
const seedAdmin = async () => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || '123456';

        // Kiểm tra xem admin đã tồn tại chưa
        const existingAdmin = await User.findOne({ username: adminUsername });

        if (existingAdmin) {
            console.log(`✅ Admin account '${adminUsername}' đã tồn tại`);
            return existingAdmin;
        }

        // Tạo tài khoản admin mới
        const adminData = {
            username: adminUsername,
            displayname: process.env.ADMIN_DISPLAYNAME || 'Super Admin',
            email: process.env.ADMIN_EMAIL || 'admin@pandadict.com',
            mobile: process.env.ADMIN_MOBILE || '0123456789',
            password: adminPassword,
            role: 'Admin',
            isBlocked: false
        };

        const admin = await User.create(adminData);
        console.log(`🎉 Đã tạo tài khoản admin mặc định: ${adminUsername}`);

        return admin;
    } catch (error) {
        console.error('❌ Lỗi khi seed admin:', error.message);
        throw error;
    }
};

module.exports = seedAdmin;
