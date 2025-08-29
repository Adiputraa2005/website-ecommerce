const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  paymentMethod: String,
  status: {
    type: String,
    default: "Belum Dibayar"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
