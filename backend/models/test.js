const mongoose = require ('mongoose');

const testSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  condition: {type: String, required: true},
  symptoms: {type: String, required: true},
  proposedDate: {type: String, required: true},
  resultDate: {type: String, required: true},
  result: {type: String, required: true},
  status: {type: String, required: true}
});

module.exports = mongoose.model('Test',testSchema);
