const express = require("express");
const router = express.Router();

const { createPurchase, markAsPaid } = require("../controllers/purchaseController");
const verifyToken = require("../middleware/verifyToken"); 

router.post("/", verifyToken, createPurchase);
router.put("/:id/pay", verifyToken, markAsPaid);

module.exports = router;
