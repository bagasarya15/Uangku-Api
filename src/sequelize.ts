import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  username: 'root',
  password: '',
  database: 'uangku',
  host: 'localhost',
  dialect: 'mysql',
  models: [__dirname + '/models'],
});

export default sequelize;
