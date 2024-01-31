// Assuming you have Mongoose and any necessary imports set up
const mongoose = require("mongoose");
const { Schema ,model} = mongoose;

// Define Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Task must belong to user"],
  },
});

module.exports = model("Task", taskSchema);
