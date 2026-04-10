const seedAdmin = require('./adminSeeder');

/**
 * Chạy tất cả các seeder
 */
const runSeeders = async () => {
    try {
        console.log('🌱 Bắt đầu seed dữ liệu...');

        // Seed admin
        await seedAdmin();

        // Có thể thêm các seeder khác ở đây
        // await seedRoles();
        // await seedCategories();1

        console.log('✅ Seed dữ liệu hoàn tất!');
    } catch (error) {
        console.error('❌ Lỗi khi seed dữ liệu:', error.message);
        throw error;
    }
};

module.exports = runSeeders;
