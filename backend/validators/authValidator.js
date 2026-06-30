const { body } = require("express-validator");

exports.registerValidation = [

    body("name")

        .notEmpty()

        .withMessage("Name is required"),

    body("email")

        .isEmail()

        .withMessage("Invalid Email"),

    body("password")

        .isLength({

            min: 6

        })

        .withMessage("Password must be at least 6 characters")

];