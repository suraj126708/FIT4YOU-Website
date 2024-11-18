import joi from "joi";

export const signUpValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    contact: joi
      .string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required(),
    address: joi.string().min(5).required(),
    age: joi.number().integer().min(18).required(),
    gender: joi.string().valid("male", "female", "other").required(),
    workerID: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
