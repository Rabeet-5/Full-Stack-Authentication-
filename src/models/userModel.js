import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a User Name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "PLease provide a e-mail"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
