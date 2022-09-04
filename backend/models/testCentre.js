const mongoose = require ('mongoose');

const testCentreSchema = mongoose.Schema({
  centreName: {type: String, required: true}
});

module.exports = mongoose.model('CentreName',testCentreSchema);
