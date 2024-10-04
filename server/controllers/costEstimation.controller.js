const mongoose = require("mongoose");
const CostEstimation = require("../models/costestimation");
const City = require("../models/city");

// Create cost estimation
const createCostEstimation = async (req, res, next) => {
  try {
    const {fromCity, toCity ,cost} = req.body;

    // // Validate required fields
    // if (!from || !to || !weight || !cost || !fromCity || !toCity) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "All fields are required.",
    //     data: null,
    //   });
    // }

    // Check if fromCity and toCity are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(fromCity) || !mongoose.Types.ObjectId.isValid(toCity)) {
      return res.status(400).json({
        status: false,
        message: "Invalid City ObjectId.",
        data: null,
      });
    }

    // Check if fromCity and toCity exist in the City collection
    const cities = await City.find({
      _id: { $in: [fromCity, toCity] }
    });

    if (cities.length !== 2) {
      return res.status(404).json({
        status: false,
        message: "One or more cities not found.",
        data: null,
      });
    }

    // Create new cost estimation record
    const newCostEstimation = await CostEstimation.create({
      cost,
      fromCity,
      toCity,
    });

    res.status(201).json({
      status: true,
      message: "Cost estimation created successfully",
      data: newCostEstimation,
    });
  } catch (err) {
    next(err);
  }
};


// // Estimate cost based on fromCity, toCity, and weight
// const estimateCost = async (req, res, next) => {
//     try {
//       const { fromCity, toCity, weight } = req.body;
  
//       // Validate required fields
//       if (!fromCity || !toCity || !weight) {
//         return res.status(400).json({
//           status: false,
//           message: 'All fields are required.',
//           data: null,
//         });
//       }
  
//       // Check if fromCity and toCity are valid ObjectIds
//       if (!mongoose.Types.ObjectId.isValid(fromCity) || !mongoose.Types.ObjectId.isValid(toCity)) {
//         return res.status(400).json({
//           status: false,
//           message: 'Invalid City ObjectId.',
//           data: null,
//         });
//       }
  
//       // Check if fromCity and toCity exist in the City collection
//       const cities = await City.find({
//         _id: { $in: [fromCity, toCity] }
//       });
  
//       if (cities.length !== 2) {
//         return res.status(404).json({
//           status: false,
//           message: 'One or more cities not found.',
//           data: null,
//         });
//       }
  
//       // Fetch cost estimation based on fromCity, toCity
//       // const costEstimation = await CostEstimation.findOne({
//       //   fromCity: fromCity,
//       //   toCity: toCity,
//       // });

//       // Fetch cost estimation based on fromCity to toCity or toCity to fromCity
//     const costEstimation = await CostEstimation.findOne({
//       $or: [
//         { fromCity: fromCity, toCity: toCity },
//         { fromCity: toCity, toCity: fromCity }
//       ]
//     });
  
//       if (!costEstimation) {
//         return res.status(404).json({
//           status: false,
//           message: 'Cost estimation not found for this route.',
//           data: null,
//         });
//       }
  
//       // Calculate estimated cost
//       const baseCost = costEstimation.cost;
//       const costPerKg = 10000; // Biaya per kg tambahan
//       const estimatedCost = baseCost + (weight - 1) * costPerKg; // Kurangi 1 kg karena baseCost sudah termasuk 1 kg
  
//       res.status(200).json({
//         status: true,
//         message: 'Cost estimation retrieved successfully.',
//         data: {
//           fromCity: fromCity,
//           toCity: toCity,
//           weight: weight,
//           estimatedCost: estimatedCost,
//         },
//       });
//     } catch (err) {
//       next(err);
//     }
//   };
  
//pakai rumus volmentrik
const estimateCost = async (req, res, next) => {
  try {
      const { fromCity, toCity, weight, height, width, length } = req.body;

      // Validate required fields
      if (!fromCity || !toCity || !weight) {
          return res.status(400).json({
              status: false,
              message: 'FromCity, toCity, and weight are required.',
              data: null,
          });
      }

      // Check if fromCity and toCity are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(fromCity) || !mongoose.Types.ObjectId.isValid(toCity)) {
          return res.status(400).json({
              status: false,
              message: 'Invalid City ObjectId.',
              data: null,
          });
      }

      // Check if fromCity and toCity exist in the City collection
      const cities = await City.find({
          _id: { $in: [fromCity, toCity] }
      });

      if (cities.length !== 2) {
          return res.status(404).json({
              status: false,
              message: 'One or more cities not found.',
              data: null,
          });
      }

      // Fetch cost estimation based on fromCity, toCity
      const costEstimation = await CostEstimation.findOne({
          $or: [
              { fromCity: fromCity, toCity: toCity },
              { fromCity: toCity, toCity: fromCity }
          ]
      });

      if (!costEstimation) {
          return res.status(404).json({
              status: false,
              message: 'Cost estimation not found for this route.',
              data: null,
          });
      }

      // Calculate estimated cost
      const baseCost = costEstimation.cost;
      const costPerKg = 10000; // Cost per kg
      const costPerVolumeUnit = 5000; // Cost per volume unit (e.g., cubic meter)

      // Calculate volume from height, width, length
      const volume = (height || 0) * (width || 0) * (length || 0);
      
      // Calculate the total cost
      const weightCost = (weight - 1) * costPerKg; // Weight cost minus base weight
      const volumeCost = volume * costPerVolumeUnit; // Volume cost
      const estimatedCost = baseCost + weightCost + volumeCost;

      res.status(200).json({
          status: true,
          message: 'Cost estimation retrieved successfully.',
          data: {
              fromCity: fromCity,
              toCity: toCity,
              weight: weight,
              height: height || 0,
              width: width || 0,
              length: length || 0,
              estimatedCost: estimatedCost,
          },
      });
  } catch (err) {
      next(err);
  }
};



// Get cost estimation by ID
const getCostEstimationById = async (req, res, next) => {
  try {
    const costEstimationId = req.params.id;

    // Find the cost estimation by its ID
    const costEstimation = await CostEstimation.findById(costEstimationId);

    if (!costEstimation) {
      return res.status(404).json({
        status: false,
        message: "Cost estimation not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Cost estimation found successfully.",
      data: costEstimation,
    });
  } catch (err) {
    next(err);
  }
};

// Delete cost estimation by ID
const deleteCostEstimation = async (req, res, next) => {
  try {
    const costEstimationId = req.params.id;

    // Delete cost estimation
    const deletedCostEstimation = await CostEstimation.findByIdAndDelete(costEstimationId);

    if (!deletedCostEstimation) {
      return res.status(404).json({
        status: false,
        message: "Cost estimation not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Cost estimation deleted successfully.",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// Get all cost estimations
const getAllCostEstimations = async (req, res, next) => {
  try {
    // Find all cost estimations
    const costEstimations = await CostEstimation.find();

    res.status(200).json({
      status: true,
      message: "Cost estimations retrieved successfully.",
      data: costEstimations,
    });
  } catch (err) {
    next(err);
  }
};

// Update cost estimation by ID
const updateCostEstimationById = async (req, res, next) => {
  try {
    const costEstimationId = req.params.id;
    const { from, to, weight, cost, fromCity, toCity } = req.body;

    // Validate required fields
    if (!from || !to || !weight || !cost || !fromCity || !toCity) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
        data: null,
      });
    }

    // Check if fromCity and toCity are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(fromCity) || !mongoose.Types.ObjectId.isValid(toCity)) {
      return res.status(400).json({
        status: false,
        message: "Invalid City ObjectId.",
        data: null,
      });
    }

    // Check if fromCity and toCity exist in the City collection
    const cities = await City.find({
      _id: { $in: [fromCity, toCity] }
    });

    if (cities.length !== 2) {
      return res.status(404).json({
        status: false,
        message: "One or more cities not found.",
        data: null,
      });
    }

    // Update cost estimation record
    const updatedCostEstimation = await CostEstimation.findByIdAndUpdate(
      costEstimationId,
      {
        from,
        to,
        weight,
        cost,
        fromCity,
        toCity,
      },
      { new: true } // to return the updated cost estimation
    );

    if (!updatedCostEstimation) {
      return res.status(404).json({
        status: false,
        message: "Cost estimation not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Cost estimation updated successfully",
      data: updatedCostEstimation,
    });
  } catch (err) {
    next(err);
  }
};


const estimateCostByCityName = async (req, res, next) => {
  try {
    const { fromCity, toCity, weight, height, width, length } = req.body;

    // Validate required fields
    if (!fromCity || !toCity || !weight) {
      return res.status(400).json({
        status: false,
        message: 'FromCity, toCity, and weight are required.',
        data: null,
      });
    }

    // Check if fromCity and toCity exist in the City collection by name
    const cities = await City.find({
      nameCity: { $in: [fromCity, toCity] }
    });

    // Validate if both cities were found
    if (cities.length !== 2) {
      return res.status(404).json({
        status: false,
        message: 'One or more cities not found.',
        data: null,
      });
    }

    // Extract city IDs for the cost estimation
    const fromCityId = cities.find(city => city.nameCity === fromCity)._id;
    const toCityId = cities.find(city => city.nameCity === toCity)._id;

    // Fetch cost estimation based on fromCity and toCity ObjectIds
    const costEstimation = await CostEstimation.findOne({
      $or: [
        { fromCity: fromCityId, toCity: toCityId },
        { fromCity: toCityId, toCity: fromCityId }
      ]
    });

    if (!costEstimation) {
      return res.status(404).json({
        status: false,
        message: 'Cost estimation not found for this route.',
        data: null,
      });
    }

    // Calculate estimated cost
    const baseCost = costEstimation.cost;
    const costPerKg = 10000; // Cost per kg
    const costPerVolumeUnit = 5000; // Cost per volume unit (e.g., cubic meter)

    // Calculate volume from height, width, length
    const volume = (height || 0) * (width || 0) * (length || 0);

    // Calculate the total cost
    const weightCost = (weight - 1) * costPerKg; // Weight cost minus base weight
    const volumeCost = volume * costPerVolumeUnit; // Volume cost
    const estimatedCost = baseCost + weightCost + volumeCost;

    res.status(200).json({
      status: true,
      message: 'Cost estimation retrieved successfully.',
      data: {
        fromCity: fromCity,
        toCity: toCity,
        weight: weight,
        height: height || 0,
        width: width || 0,
        length: length || 0,
        estimatedCost: estimatedCost,
      },
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createCostEstimation,
  getCostEstimationById,
  deleteCostEstimation,
  getAllCostEstimations,
  updateCostEstimationById,
  estimateCost,
  estimateCostByCityName,
};
