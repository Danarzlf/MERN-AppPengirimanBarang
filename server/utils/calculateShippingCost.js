// utils/calculateShippingCost.js

const axios = require("axios");

const calculateShippingCost = async (origin, destination) => {
  try {
    const apiKey = "AIzaSyDketorLM59LAEF0zNskV73PekDYnUInzM"; // Ganti dengan kunci API Google Maps Anda
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
    );

    if (response.data.status !== "OK") {
      throw new Error(`API Error: ${response.data.status}`);
    }

    const distance = response.data.rows[0].elements[0].distance.value; // Jarak dalam meter
    const shippingCost = calculateCostBasedOnDistance(distance);

    return shippingCost;
  } catch (error) {
    console.error("Error calculating shipping cost:", error.message);
    throw error;
  }
};


const calculateCostBasedOnDistance = (distanceInMeters) => {
  // Implementasi logika penghitungan biaya berdasarkan jarak
  const costPerKm = 5000; // Contoh: biaya per kilometer
  const distanceInKm = distanceInMeters / 1000;
  const shippingCost = distanceInKm * costPerKm;

  return shippingCost;
};

const calculateShippingCostByAddress = async (originAddress, destinationAddress) => {
  try {
    const origin = originAddress.replace(/ /g, "+");
    const destination = destinationAddress.replace(/ /g, "+");

    const shippingCost = await calculateShippingCost(origin, destination);
    return shippingCost;
  } catch (error) {
    console.error("Error calculating shipping cost by address:", error.message);
    throw error;
  }
};


module.exports = {
  calculateShippingCost,
  calculateShippingCostByAddress,
};
