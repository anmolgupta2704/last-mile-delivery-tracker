const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");
const CODCharge = require("../models/CODCharge");
const Order = require("../models/Order");
const User = require("../models/User");

const { getDistance } = require("../utils/haversine");
exports.createZone = async (req, res) => {

    try {

        const zone = await Zone.create(req.body);

        res.status(201).json(zone);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.createCODCharge = async (req, res) => {

    try {

        const charge = await CODCharge.create(req.body);

        res.status(201).json(charge);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.createRateCard = async (req, res) => {

    try {

        const rate = await RateCard.create(req.body);

        res.status(201).json(rate);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.assignAgent = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        order.agent = req.body.agentId;

        order.status = "Assigned";

        order.trackingHistory.push({

            status: "Assigned",

            actor: "Admin"

        });

        await order.save();

        await User.findByIdAndUpdate(req.body.agentId, {

            isAvailable: false

        });

        res.json(order);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.autoAssign = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        const agent = await User.findOne({
            role: "agent",
            isAvailable: true
        });

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "No Agent Available"
            });
        }

        order.agent = agent._id;
        order.status = "Assigned";

        order.trackingHistory.push({
            status: "Assigned",
            actor: req.user.id,
            remarks: "Auto Assigned"
        });

        await order.save();

        agent.isAvailable = false;
        await agent.save();

        res.json({
            success: true,
            message: "Agent Assigned Successfully",
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
exports.dashboard = async (req, res) => {

    try {

        const Order = require("../models/Order");

        const totalOrders = await Order.countDocuments();

        const delivered = await Order.countDocuments({
            status: "Delivered"
        });

        const failed = await Order.countDocuments({
            status: "Failed"
        });

        const pending = await Order.countDocuments({
            status: {
                $nin: ["Delivered", "Failed"]
            }
        });

        const revenue = await Order.aggregate([
            {
                $match: {
                    status: "Delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$deliveryCharge"
                    }
                }
            }
        ]);

        res.json({
            success: true,
            dashboard: {
                totalOrders,
                delivered,
                failed,
                pending,
                revenue:
                    revenue.length > 0
                        ? revenue[0].totalRevenue
                        : 0
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.overrideStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        order.status = status;

        order.trackingHistory.push({

            status,

            actor: req.user.id,

            remarks: "Admin Override"

        });

        await order.save();

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
exports.getAllOrders = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.zone) {
            filter.pickupZone = req.query.zone;
        }

        if (req.query.agent) {
            filter.agent = req.query.agent;
        }

        if (req.query.paymentType) {
            filter.paymentType = req.query.paymentType;
        }

        if (req.query.orderType) {
            filter.orderType = req.query.orderType;
        }

        const total = await Order.countDocuments(filter);

        const orders = await Order.find(filter)
            .populate("customer", "name email")
            .populate("agent", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalOrders: total,
            orders
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.analytics = async (req, res) => {

    try {

        const analytics = await Order.aggregate([

            {
                $group: {
                    _id: "$status",
                    total: {
                        $sum: 1
                    }
                }
            }

        ]);

        res.json({
            success: true,
            analytics
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
exports.revenue = async (req, res) => {

    try {

        const revenue = await Order.aggregate([

            {
                $match: {
                    status: "Delivered"
                }
            },

            {
                $group: {
                    _id: null,
                    revenue: {
                        $sum: "$deliveryCharge"
                    }
                }
            }

        ]);

        res.json({
            success: true,
            revenue: revenue.length ? revenue[0].revenue : 0
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};