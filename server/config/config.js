// config.js
const os = require('os');
const dotenv = require('dotenv');
// const hostIP = 'host.docker.internal';

// Load biến môi trường từ file .env
dotenv.config();

function getLocalIPAddress() {

    // Nếu server chạy trong Docker
    if (process.env.IN_DOCKER === 'true') {
        return 'host.docker.internal';
    }

    const interfaces = os.networkInterfaces();
    // console.log("🚀 ~ getLocalIPAddress ~ interfaces:", interfaces);

    for (const name of Object.keys(interfaces)) {
        if (!name.toLowerCase().includes("wsl") && !name.toLowerCase().includes("vethernet") && !name.toLowerCase().includes("loopback")) {
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    // console.log("🚀 ~ getLocalIPAddress ~ iface.address:", iface.address);
                    return iface.address;
                }
            }
        }
    }

    return null;
}

const hostIP = getLocalIPAddress() || 'host.docker.internal';
console.log("🚀 ~ hostIP:", hostIP)

// Kiểm tra và đảm bảo các biến môi trường có giá trị
const username = process.env.DB_USERNAME || 'default_user';
const password = process.env.DB_PASSWORD || 'default_pass';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'mySpecimen';
const authSource = process.env.DB_AUTH_SOURCE || 'mySpecimen';



const MONGODB_URL = `mongodb://${username}:${password}@${hostIP}:${port}/${database}?authSource=${authSource}`;
const DB_HOST = hostIP;

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL,
    DB_HOST
};