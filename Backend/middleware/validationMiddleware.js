// middleware/validationMiddleware.js
const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('donor', 'charity', 'admin').required(),
  phone: Joi.string().optional(),
  organization: Joi.string().when('role', {
    is: 'charity',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const donationSchema = Joi.object({
  donationType: Joi.string().lowercase().valid('food', 'clothes', 'toys', 'electronics', 'books', 'other').required(),
  quantity: Joi.number().integer().min(1).required(),
  description: Joi.string().max(1000).required(),
  contactPhone: Joi.string().optional(),
  contactEmail: Joi.string().email().optional()
}); 

const claimSchema = Joi.object({
  postId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  notes: Joi.string().optional()
});

module.exports = { validate, registerSchema, loginSchema, donationSchema, claimSchema };