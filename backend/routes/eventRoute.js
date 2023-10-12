const express = require("express");
const {
  createEvent,
  getAllEvents,
  getAdminEvents,
  updateEvent,
  deleteEvent,
  getEventDetails,
} = require("../controllers/eventController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/events").get(getAllEvents);

router
  .route("/admin/event/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createEvent);

router
  .route("/admin/events")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminEvents);

router
  .route("/admin/event/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEvent)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEvent);

router.route("/event/:id").get(getEventDetails);

module.exports = router;
