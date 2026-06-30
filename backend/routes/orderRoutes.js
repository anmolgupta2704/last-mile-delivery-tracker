const express = require("express");
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrder,
    rescheduleOrder,
    getTracking
} = require("../controllers/orderController");

const {
    verifyToken,
    authorize
} = require("../middleware/authMiddleware");

const { orderValidation } = require("../validators/orderValidator");
const validate = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order Management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new Order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order Created Successfully
 */
router.post(
    "/",
    verifyToken,
    authorize("customer"),
    orderValidation,
    validate,
    createOrder
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get Logged-in Customer Orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get(
    "/",
    verifyToken,
    authorize("customer"),
    getMyOrders
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get Order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Order Found
 */
router.get(
    "/:id",
    verifyToken,
    getOrder
);

/**
 * @swagger
 * /api/orders/reschedule/{id}:
 *   patch:
 *     summary: Reschedule Failed Order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order Rescheduled
 */
router.patch(
    "/reschedule/:id",
    verifyToken,
    authorize("customer"),
    rescheduleOrder
);

/**
 * @swagger
 * /api/orders/tracking/{id}:
 *   get:
 *     summary: Get Order Tracking Timeline
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tracking History
 */
router.get(
    "/tracking/:id",
    verifyToken,
    getTracking
);

module.exports = router;