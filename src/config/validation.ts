import * as Joi from 'joi';

export const validationSchema = Joi.object({
  server: {
    transportPort: Joi.number(),
    port: Joi.number().default(3000),
    jwtSecretKey: Joi.string(),
    jwtExpiration: Joi.number().default(3600),
    appName: Joi.string(),
  },
  database: {
    host: Joi.string(),
    port: Joi.number().default(5432),
    username: Joi.string(),
    password: Joi.string(),
    name: Joi.string(),
  },
  typeorm: {
    type: Joi.string(),
    synchronize: Joi.boolean(),
  },
});
