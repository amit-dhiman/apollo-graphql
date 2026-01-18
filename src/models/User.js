const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password:{
      type: String,
      required: true,
      minlength: 6
    }
  },{
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false
  }
);

// Optional: index for faster lookups
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
