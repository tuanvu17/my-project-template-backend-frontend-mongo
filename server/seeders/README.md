# Hệ thống Seed Dữ liệu - Qnews

## Tổng quan

Hệ thống seed dữ liệu tự động khởi tạo tài khoản admin và các dữ liệu mặc định khi cài đặt hệ thống lần đầu.

## Cấu trúc

```
server/
├── seeders/
│   ├── index.js           # Quản lý tất cả seeders
│   └── adminSeeder.js     # Seed tài khoản admin
├── scripts/
│   └── seed.js            # CLI tool để chạy seeders
└── .env                   # Cấu hình admin mặc định
```

## Cấu hình Admin trong .env

```env
# Admin Account Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123456
ADMIN_DISPLAYNAME=Super Admin
ADMIN_CAPBAC=Trung Tuong
ADMIN_CHUCVU=Tu Lenh
ADMIN_DONVI=BTL 86
ADMIN_EMAIL=admin@qnews.com
ADMIN_MOBILE=0123456789
```

## Cách sử dụng

### 1. Tự động (Khuyến nghị)

Khi chạy server, hệ thống sẽ tự động kiểm tra và tạo admin nếu chưa tồn tại:

```bash
npm start
# hoặc
npm run server
```

### 2. Chạy thủ công

#### Seed tất cả dữ liệu
```bash
npm run seed
```

#### Chỉ seed admin
```bash
npm run seed:admin
```

#### Reset database và seed lại
```bash
npm run seed:reset
```

## Tính năng

✅ **Tự động kiểm tra**: Không tạo trùng lặp nếu admin đã tồn tại
✅ **Cấu hình linh hoạt**: Tất cả thông tin admin đều lấy từ .env
✅ **Mở rộng dễ dàng**: Có thể thêm seeders khác (roles, categories, v.v.)
✅ **CLI tiện lợi**: Chạy seeders độc lập không cần khởi động server

## Thêm Seeder mới

1. Tạo file seeder trong `seeders/`:

```javascript
// seeders/categorySeeder.js
const Category = require('../models/categoryModel');

const seedCategories = async () => {
    const categories = [
        { name: 'Thời sự', slug: 'thoi-su' },
        { name: 'Thể thao', slug: 'the-thao' }
    ];

    for (const cat of categories) {
        const exists = await Category.findOne({ slug: cat.slug });
        if (!exists) {
            await Category.create(cat);
            console.log(`✅ Đã tạo category: ${cat.name}`);
        }
    }
};

module.exports = seedCategories;
```

2. Thêm vào `seeders/index.js`:

```javascript
const seedCategories = require('./categorySeeder');

const runSeeders = async () => {
    await seedAdmin();
    await seedCategories(); // Thêm dòng này
};
```

## Bảo mật

⚠️ **LƯU Ý**: Trong môi trường production:
- Thay đổi `ADMIN_PASSWORD` thành mật khẩu mạnh
- Không commit file `.env` vào git
- Sau khi đăng nhập lần đầu, nên đổi mật khẩu admin ngay

## Troubleshooting

### Lỗi: Admin đã tồn tại
Đây không phải lỗi, hệ thống chỉ thông báo admin đã được tạo trước đó.

### Muốn tạo lại admin
```bash
# Xóa admin cũ và tạo mới
npm run seed:reset
```

### Muốn thay đổi thông tin admin
1. Cập nhật file `.env`
2. Xóa admin cũ trong database
3. Chạy `npm run seed:admin`
