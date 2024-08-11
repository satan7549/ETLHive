const mongoose = require("mongoose");
const validator = require("validator");


const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [50, "name can't exceed 50 characters"],
    minLength: [3, "name should have more than 3 characters"],
  },
  number: {
    type: String,
    unique: true,
    required: [false],
    maxLength: [50, "number can't exceed 50 characters"],
    minLength: [3, "number should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [false],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  product: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validation to ensure either email or number is provided
leadSchema.pre("validate", function (next) {
  if (!this.email && !this.number) {
    this.invalidate("email", "Either email or number is required");
    this.invalidate("number", "Either email or number is required");
  }
  next();
});

const LeadModel = mongoose.model("Lead", leadSchema);

module.exports = LeadModel;
