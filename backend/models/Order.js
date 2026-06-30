const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true
        },

        actor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        remarks: {
            type: String,
            default: ""
        },

        time: {
            type: Date,
            default: Date.now
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        pickupAddress: {
            type: String,
            required: true
        },

        dropAddress: {
            type: String,
            required: true
        },

        pickupZone: {
            type: String,
            required: true
        },

        dropZone: {
            type: String,
            required: true
        },

        pickupLocation: {
            lat: {
                type: Number,
                default: 0
            },
            lng: {
                type: Number,
                default: 0
            }
        },

        dropLocation: {
            lat: {
                type: Number,
                default: 0
            },
            lng: {
                type: Number,
                default: 0
            }
        },

        length: {
            type: Number,
            required: true
        },

        breadth: {
            type: Number,
            required: true
        },

        height: {
            type: Number,
            required: true
        },

        actualWeight: {
            type: Number,
            required: true
        },

        volumetricWeight: {
            type: Number,
            default: 0
        },

        chargeableWeight: {
            type: Number,
            default: 0
        },

        paymentType: {
            type: String,
            enum: ["Prepaid", "COD"],
            required: true
        },

        orderType: {
            type: String,
            enum: ["B2B", "B2C"],
            required: true
        },

        deliveryCharge: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "Created",
                "Assigned",
                "Picked Up",
                "In Transit",
                "Out For Delivery",
                "Delivered",
                "Failed",
                "Rescheduled"
            ],
            default: "Created"
        },

        rescheduleDate: {
            type: Date,
            default: null
        },

        deliveredAt: {
            type: Date,
            default: null
        },

        trackingHistory: [trackingSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);