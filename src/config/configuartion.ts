export default () => ({
  server: {
    transportPort: parseInt(process.env.TRANSPORT_PORT, 10),
    port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiration: parseInt(process.env.JWT_EXPIRATION_TIME, 10),
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
  swagger: {
    enable: process.env.ENABLE_SWAGGER,
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
  },
});
