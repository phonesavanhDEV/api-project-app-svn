
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'db-app-cost-do-user-13626213-0.b.db.ondigitalocean.com',
  port: 25060,
  database: 'PP',
  username: 'phoneDev',
  password: 'AVNS_Apf1cyij8zg4VGoE80c',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  session: {
    name: 'session',
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoicGhvbmVzYXZhbmgiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMjUiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTAxIiwiZW1haWwiOiJwaG9uZXNvbXBob25nQGdtYWlsLmNvbSJ9.2HxQQxiXK7G2OyzCHkKwLOdxq7YK9Y2Thy-9UqB3lRk',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  jwt: {
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoicGhvbmVzYXZhbmgiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMjUiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTAxIiwiZW1haWwiOiJwaG9uZXNvbXBob25nQGdtYWlsLmNvbSJ9.2HxQQxiXK7G2OyzCHkKwLOdxq7YK9Y2Thy-9UqB3lRk',
    expiresIn: '1h',
  },
});


sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });


module.exports = sequelize;


