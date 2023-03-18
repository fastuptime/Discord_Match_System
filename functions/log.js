global.colors = require('colors');

function log(message, type = "success") {
    let msg = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] -> ${message}`;
    switch (type) {
        case "success":
            console.log(msg.green);
            break;
        case "error":
            console.log(msg.red);
            break;
        case "warn":
            console.log(msg.yellow);
            break;
        case "info":
            console.log(msg.blue);
            break;
        default:
            console.log(msg);
            break;

    }
}

module.exports = log;