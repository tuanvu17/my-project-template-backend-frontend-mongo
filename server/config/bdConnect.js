const mongoose = require('mongoose');
const config = require('./config');
const runSeeders = require('../seeders');

const dbConnect = async() => {
    try {
        const dbConfigure = process.env.DB_USERNAME && process.env.DB_PASSWORD
            ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
            : '';

        const dConnection = `${process.env.DB_CONNECTION}://${dbConfigure}${config.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

        console.log("🚀 ~ dbConnect ~ dConnection:", dConnection);

        await mongoose.connect(dConnection);
        console.log("✅ Kết nối MongoDB thành công!");

        // Chạy seeders để khởi tạo dữ liệu mặc định
        await runSeeders();

    } catch (error) {
        console.error("❌ Lỗi kết nối MongoDB:", error.message);
        throw error;
    }
};

module.exports = dbConnect;