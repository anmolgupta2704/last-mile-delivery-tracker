const Order = require("../models/Order");
const { findZone } = require("../utils/zoneFinder");
const { calculateRate } = require("../services/rateCalculator");

// =======================
// Create Order
// =======================
exports.createOrder = async (req, res) => {
    try {

        const {
            pickupAddress,
            dropAddress,
            length,
            breadth,
            height,
            actualWeight,
            paymentType,
            orderType
        } = req.body;

        // Find Zones Automatically
        const pickupZone = await findZone(pickupAddress);
        const dropZone = await findZone(dropAddress);

        if (!pickupZone || !dropZone) {
            return res.status(400).json({
                success: false,
                message: "Unable to detect Pickup or Drop Zone"
            });
        }

        // Calculate Charges
        const result = await calculateRate({
            pickupZone,
            dropZone,
            length,
            breadth,
            height,
            actualWeight,
            paymentType,
            orderType
        });

        // Create Order
        const order = await Order.create({
            customer: req.user.id,

            pickupAddress,
            dropAddress,

            pickupZone,
            dropZone,

            length,
            breadth,
            height,

            actualWeight,

            volumetricWeight: result.volumetricWeight,

            chargeableWeight: result.chargeableWeight,

            paymentType,

            orderType,

            deliveryCharge: result.deliveryCharge,

            status: "Created",

            trackingHistory: [
                {
                    status: "Created",
                    actor: req.user.id,
                    remarks: "Order Created"
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// =======================
// Get My Orders
// =======================
exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            customer: req.user.id
        })
            .populate("customer", "name email")
            .populate("agent", "name email phone");

        res.json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =======================
// Get Single Order
// =======================
exports.getOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("customer", "name email phone")
            .populate("agent", "name email phone");

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        res.json({
            success: true,
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =======================
// Reschedule Order
// =======================
exports.rescheduleOrder = async (req, res) => {

    try {

        const { date } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        order.status = "Rescheduled";

        order.agent = null;

        order.rescheduleDate = date;

        order.trackingHistory.push({

            status: "Rescheduled",

            actor: req.user.id,

            remarks: "Customer requested reschedule"

        });

        await order.save();

        res.json({

            success: true,

            message: "Order Rescheduled Successfully",

            order

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.getTracking = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("trackingHistory.actor", "name email");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        res.status(200).json({
            success: true,
            tracking: order.trackingHistory
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};