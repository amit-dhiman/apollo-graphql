const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   title: String,
   content: String,
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   }
  },{
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false
  }
);

module.exports = mongoose.model("Post", PostSchema);
