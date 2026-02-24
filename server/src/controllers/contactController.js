const Joi = require('joi')
const Contact = require('../models/Contact')

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().allow('').max(20),
  message: Joi.string().trim().min(10).max(2000).required(),
})

// POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false })
    if (error) {
      const messages = error.details.map((d) => d.message)
      return res.status(422).json({ error: 'Validation failed', messages })
    }

    const contact = await Contact.create(value)

    // Optional: send email notification here via Nodemailer

    res.status(201).json({ success: true, id: contact._id })
  } catch (err) {
    next(err)
  }
}

module.exports = { submitContact }
