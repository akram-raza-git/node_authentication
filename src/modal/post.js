const { Schema, model } = require("mongoose");

const postSchema = Schema(
  {
    title: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
