export default () => ({
  server: {
    transportPort: parseInt(process.env.TRANSPORT_PORT, 10),
    port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION_TIME,
    appName: process.env.APP_NAME,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
  typeorm: {
    type: process.env.TYPE_ORM_DB,
    synchronize: process.env.TYPE_ORM_SYNC,
  },
});
