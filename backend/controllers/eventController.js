const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");
const Event = require("../models/eventModel");

// Create Event -- Admin
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "events",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    event,
  });
});

//Get All Events
exports.getAllEvents = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const eventsCount = await Event.countDocuments();

  const apiFeature = new ApiFeatures(Event.find(), req.query).search().filter();

  let events = await apiFeature.query;

  let filteredEventsCount = events.length;

  apiFeature.pagination(resultPerPage);

  events = await apiFeature.query;

  res.status(200).json({
    success: true,
    events,
    eventsCount,
    resultPerPage,
    filteredEventsCount,
  });
});

// Get All Event (Admin)
exports.getAdminEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    success: true,
    events,
  });
});

// Update Event -- Admin

exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < event.images.length; i++) {
      await cloudinary.v2.uploader.destroy(event.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    event,
  });
});

// Delete Event

exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < event.images.length; i++) {
    await cloudinary.v2.uploader.destroy(event.images[i].public_id);
  }

  await event.remove();

  res.status(200).json({
    success: true,
    message: "Event Delete Successfully",
  });
});

// Get Event Details
exports.getEventDetails = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  res.status(200).json({
    success: true,
    event,
  });
});
