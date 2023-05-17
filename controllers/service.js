const asyncHandler = require("express-async-handler");
const Service = require("../models/service");

// Create Service
const createService = asyncHandler(async (req, res) => {

  //  res.status(200).json({message:"Create service success"})
  const { title, description } = req.body;

  //   Validation
  if (!title || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {    

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Create Service
  const service = await Service.create({
    title,
    description,
    image: fileData,
  });

  // console.log(service)

  res.status(201).json(service);

  });

  // Get all Services
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({}).sort("-createdAt");
  res.status(200).json(services);
});

// Get single service
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  // if service doesn't exist
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.status(200).json(service);
});

// Delete Service
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  // if service doesn't exist
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  await service.remove();
  res.status(200).json({ message: "Service deleted." });
});

// Update Service
const updateService = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const service = await Service.findById(id);

  // if service doesn't exist
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {    

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Update Service
  const updatedService = await Service.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      image: Object.keys(fileData).length === 0 ? service?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedService);
});

  
  module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService  
  };