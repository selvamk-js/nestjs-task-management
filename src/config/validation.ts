import * as Joi from 'joi';

export const validationSchema = Joi.object({
  server: {
    transportPort: Joi.number(),
    port: Joi.number().default(3000).required(),
    jwtSecretKey: Joi.string().required(),
    jwtExpiration: Joi.number().default(3600).required(),
  },
  database: {
    host: Joi.string().required(),
    port: Joi.number().default(5432).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  },
  typeorm: {
    type: Joi.string().required(),
    synchronize: Joi.boolean(),
  },
  swagger: {
    enable: Joi.boolean().default(true),
    appVersion: Joi.string(),
    appName: Joi.string().required(),
  },
});
