const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

/* -------------------- Global Middleware -------------------- */

app.use(compression());

app.use(helmet());

app.use(cors({
    origin: ["http://localhost:5173", "https://last-mile-delivery-tracker-two.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use(morgan("dev"));

/* -------------------- Swagger -------------------- */

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);

/* -------------------- Routes -------------------- */

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/agent", agentRoutes);

/* -------------------- Home -------------------- */

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "API Running"

    });

});

/* -------------------- 404 -------------------- */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/* -------------------- Error Handler -------------------- */

app.use(errorHandler);

module.exports = app;