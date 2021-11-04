const { Schema, model } = require("mongoose");

const thingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const Thing = model("Thing", thingSchema);

module.exports = Thing;