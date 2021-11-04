const { Schema, model } = require("mongoose");

const learningSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const Learning = model("Learning", learningSchema);

module.exports = Learning;