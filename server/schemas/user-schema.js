const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required to proceed"],
    },
    lastName: {
      type: String,
      required: [true, "First Name is required to proceed"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required to proceed"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required to proceed"],
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users_details", userSchema);
