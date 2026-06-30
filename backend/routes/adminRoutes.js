const express = require("express");

const router = express.Router();

const {
    createZone,
    createRateCard,
    createCODCharge,
    assignAgent,
    autoAssign,
    dashboard,
    getAllOrders,
    overrideStatus,
    analytics,
    revenue
} = require("../controllers/adminController");

const {
    verifyToken,
    authorize
} = require("../middleware/authMiddleware");

// Admin Middleware
router.use(
    verifyToken,
    authorize("admin")
);

// Dashboard
router.get("/dashboard", dashboard);

// Orders
router.get("/orders", getAllOrders);

// Analytics
router.get("/analytics", analytics);

// Revenue
router.get("/revenue", revenue);

// Override Status
router.patch("/override/:id", overrideStatus);

// Zone
router.post("/zone", createZone);

// Rate Card
router.post("/rate", createRateCard);

// COD Charge
router.post("/cod", createCODCharge);

// Manual Assign
router.post("/assign/:id", assignAgent);

// Auto Assign
router.post("/auto/:id", autoAssign);

module.exports = router;