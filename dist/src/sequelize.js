"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    username: 'root',
    password: '',
    database: 'uangku',
    host: 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map