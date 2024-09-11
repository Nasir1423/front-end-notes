const mongoose = require('mongoose');

let LedgerSchema = new mongoose.Schema({
    "item": {
        type: String,
        required: true
    },
    "occurrence-time": Date,
    "type": {
        type: String,
        enum: ["income", "expenditure"]
    },
    "amount": Number,
    "remarks": String

});

let LedgerModel = mongoose.model('ledger', LedgerSchema);

module.exports = LedgerModel;