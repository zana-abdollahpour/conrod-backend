import Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().port().required(),

  DATASOURCE_USERNAME: Joi.required(),
  DATASOURCE_PASSWORD: Joi.required(),
  DATASOURCE_HOST: Joi.required(),
  DATASOURCE_PORT: Joi.number().port().required(),
  DATASOURCE_DATABASE: Joi.required(),
  DATASOURCE_URL: Joi.required(),
});
