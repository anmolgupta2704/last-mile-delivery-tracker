const express = require("express");

const router = express.Router();

const {
    getMyOrders,
    updateStatus,
    failedDelivery
} = require("../controllers/agentController");

const {
    verifyToken,
    authorize
} = require("../middleware/authMiddleware");

router.use(
    verifyToken,
    authorize("agent")
);

router.get("/orders", getMyOrders);

router.patch("/status/:id", updateStatus);

router.patch("/failed/:id", failedDelivery);

module.exports = router;