const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../../logs/app.log');
const logger = {
    info: (message) => {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] INFO: ${message}\n`;
        console.log(logEntry);
        // Đảm bảo thư mục logs tồn tại trước khi ghi
        if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath));
        fs.appendFileSync(logPath, logEntry);
    }
};
module.exports = logger;