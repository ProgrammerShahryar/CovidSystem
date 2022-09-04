const mongoose = require ('mongoose');

const stockSchema = mongoose.Schema({
  stockName: {type: String, required: true},
  stockNumber: {type: String, required: true},

});

module.exports = mongoose.model('Stocks',stockSchema);
