import * as Joi from 'joi';

export const JoiValidatonSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
});
