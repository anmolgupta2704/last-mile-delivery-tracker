const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// ================= REGISTER =================

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            role
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });

        }

        const exists = await User.findOne({
            email
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hash,
            phone,
            role: role || "customer"

        });

        const userData = user.toObject();
        delete userData.password;

        res.status(201).json({

            success: true,
            message: "Registered Successfully",
            user: userData

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ================= LOGIN =================

exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Email and Password are required"

            });

        }

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User Not Found"

            });

        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {

            return res.status(401).json({

                success: false,
                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            role: user.role,

            user: userData

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= PROFILE =================

exports.profile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found"

            });

        }

        res.status(200).json({

            success: true,

            user

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};