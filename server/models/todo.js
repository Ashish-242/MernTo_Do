// Assuming you have Mongoose and any necessary imports set up
const mongoose = require('mongoose');
const{Schema,model}=mongoose;

// Define Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    enum: [1, 2, 3] 
  },
  status:{
    type:String,
    required:true,
    // enum:['pending','completed','dueDate']
  },
  author:{type:Schema.Types.ObjectId,ref:'User'}

});

// Create Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
