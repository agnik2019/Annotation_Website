import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
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
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
