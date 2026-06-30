const Order = require("../models/Order");
const User = require("../models/User");
const { sendMail } = require("../services/emailService");
const { isValidTransition } = require("../utils/statusValidator");

// =============================
// Get Assigned Orders
// =============================
exports.getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            agent: req.user.id
        })
            .populate("customer", "name email phone");

        res.status(200).json({
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

// =============================
// Update Order Status
// =============================
exports.updateStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const order = await Order.findById(req.params.id)
            .populate("customer");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        // Prevent Invalid Status Change
        if (!isValidTransition(order.status, status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status Transition"
            });
        }

        order.status = status;

        order.trackingHistory.push({
            status,
            actor: req.user.id,
            remarks: `Status changed to ${status}`
        });

        if (status === "Delivered") {

            order.deliveredAt = new Date();

            await User.findByIdAndUpdate(order.agent, {
                isAvailable: true
            });

        }

        await order.save();

        // Socket.IO Live Update
        if (global.io) {
            global.io.to(order._id.toString()).emit("status-update", {
                orderId: order._id,
                status: order.status,
                tracking: order.trackingHistory
            });
        }

        // Email Notification
        await sendMail(
            order.customer.email,
            "Order Status Updated",
            `Hello ${order.customer.name},

Your order status has been updated.

Current Status : ${status}

Thank you for choosing our service.`
        );

        res.status(200).json({
            success: true,
            message: "Status Updated Successfully",
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =============================
// Failed Delivery
// =============================
exports.failedDelivery = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("customer");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        // Allow failure only from Out For Delivery
        if (!isValidTransition(order.status, "Failed")) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status Transition"
            });
        }

        order.status = "Failed";

        order.trackingHistory.push({
            status: "Failed",
            actor: req.user.id,
            remarks: "Delivery Attempt Failed"
        });

        await order.save();

        // Socket Update
        if (global.io) {
            global.io.to(order._id.toString()).emit("status-update", {
                orderId: order._id,
                status: order.status,
                tracking: order.trackingHistory
            });
        }

        // Email
        await sendMail(
            order.customer.email,
            "Delivery Failed",
            `Hello ${order.customer.name},

We could not deliver your package.

Please login and reschedule your delivery.

Thank you.`
        );

        res.status(200).json({
            success: true,
            message: "Delivery Marked as Failed",
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};