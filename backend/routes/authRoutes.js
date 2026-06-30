const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

const { registerValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

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
router.post("/login", login);

module.exports = router;