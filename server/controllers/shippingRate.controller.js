const { calculateShippingCostByAddress } = require("../utils/calculateShippingCost");

// POST /api/shipping-cost
// Menghitung biaya pengiriman berdasarkan alamat pengirim dan alamat tujuan
const  distanceCost = async (req, res, next) => {
  const { originAddress, destinationAddress } = req.body;

  try {
    const shippingCost = await calculateShippingCostByAddress(originAddress, destinationAddress);

    res.status(200).json({
      status: true,
      message: "Shipping cost calculated successfully",
      data: {
        originAddress,
        destinationAddress,
        shippingCost,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  distanceCost,
};

