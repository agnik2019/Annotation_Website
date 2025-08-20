import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: [
    {
      serial: Number,
      annotate: {
        question: String,
        score1: String,
        comment1: String,
        score2: String,
        comment2: String,
        score3: String,
        comment3: String,
        score4: String,
        comment4: String,
        score5: String,
        comment5: String,
        score6: String,
        comment6: String,
      },
      edited: String,
      answered: String,
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
