import { validateResponse } from "@helper/apiResponse";
import { validateMsg } from "@helper/common";
import Joi from "joi";

const options = {
  abortEarly: false,
};

export const post = (body) => {
  const validateSchema = Joi.object().keys({
    name: Joi.string()
      .required()
      .label("name")
      .messages(validateMsg(null, null, "string")),
    email: Joi.string()
      .required()
      .email()
      .label("email")
      .messages(validateMsg(null, null, "string")),
    password: Joi.string()
      .required()
      .label("password")
      .messages(validateMsg(null, null, "string")),
  });
  const { error } = validateSchema.validate(body, options);
  if (error) {
    return error;
  } else {
    return false;
  }
};
export const patch = (body) => {
  const validateSchema = Joi.object().keys({
    name: Joi.string()
      .empty()
      .label("name")
      .messages(validateMsg(null, null, "string")),
  });
  const { error } = validateSchema.validate(body, options);
  if (error) {
    return error;
  } else {
    return false;
  }
};
