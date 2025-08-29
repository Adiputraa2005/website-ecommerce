const Purchase = require("../models/Purchase");

exports.markAsPaid = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const updated = await Purchase.findByIdAndUpdate(
      purchaseId,
      { status: "Sudah Dibayar" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    res.json({ message: "Pesanan berhasil dibayar", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.createPurchase = async (req, res) => {
  const { items, total, paymentMethod } = req.body;
  const userId = req.user.id;

  console.log("DATA MASUK:", { items, total, paymentMethod, userId });

  try {
    const purchase = new Purchase({
      userId,
      items,
      total,
      paymentMethod,
      status: "Belum Dibayar",
      createdAt: new Date()
    });

    await purchase.save();
    res.status(201).json({ message: "Pembelian berhasil disimpan", purchaseId: purchase._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan pembelian" });
  }
};
