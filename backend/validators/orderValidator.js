const { body } = require("express-validator");

exports.orderValidation = [

    body("pickupAddress")

        .notEmpty()

        .withMessage("Pickup Address Required"),

    body("dropAddress")

        .notEmpty()

        .withMessage("Drop Address Required"),

    body("length")

        .isNumeric(),

    body("breadth")

        .isNumeric(),

    body("height")

        .isNumeric(),

    body("actualWeight")

        .isNumeric(),

    body("paymentType")

        .isIn(["COD", "Prepaid"]),

    body("orderType")

        .isIn(["B2B", "B2C"])

];