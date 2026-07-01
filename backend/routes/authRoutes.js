const express = require("express");
const router = express.Router();

const {
    register,
    login,
    profile
} = require("../controllers/authController");

const {
    verifyToken
} = require("../middleware/authMiddleware");

const {
    registerValidation
} = require("../validators/authValidator");

const validate = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
    "/register",
    registerValidation,
    validate,
    register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
    "/login",
    login
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get Logged-in User Profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User Profile
 */
router.get(
    "/profile",
    verifyToken,
    profile
);

module.exports = router;