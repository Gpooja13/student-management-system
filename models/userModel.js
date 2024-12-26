const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(AutoIncrement, { inc_field: "rollno", start_seq: 1000 }); // Roll numbers start from 1000

module.exports = mongoose.model("USER", userSchema);
