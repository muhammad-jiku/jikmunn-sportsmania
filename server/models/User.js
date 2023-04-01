const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    password: {
      type: String,
      required: [true, 'Please Enter Your Password'],
      minLength: [6, 'Password should be greater than 6 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        default:
          'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    phone: {
      type: String,
      // maxLength: [30, 'Phone cannot exceed 30 characters'],
      minLength: [11, 'Phone should have more than 11 characters'],
    },
    address: {
      type: String,
      maxLength: [100, 'Address cannot exceed 100 characters'],
      minLength: [10, 'Address should have more than 10 characters'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//  Hashing Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      // expiresIn:  process.env.JWT_EXPIRE ,
      expiresIn: `${process.env.JWT_EXPIRE}s`,
    }
  );
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(64).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model.Users || new mongoose.model('User', userSchema);

// exporting module
module.exports = User;
