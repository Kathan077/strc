const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: true,
    },
    name: {
      type: String,
      default: 'SRTC Administrator',
      trim: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'superadmin',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before save if modified
AdminUserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
AdminUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('AdminUser', AdminUserSchema);
