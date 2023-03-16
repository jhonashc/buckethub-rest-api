import * as Joi from 'joi';

export const JoiValidatonSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.string().default('postgres'),
  DB_USERNAME: Joi.string().default('postgress'),
  DB_PASSWORD: Joi.string().default('password'),
});
