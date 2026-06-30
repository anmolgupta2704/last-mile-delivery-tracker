const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");
const errorHandler=require("./middleware/errorHandler");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const helmet = require("helmet");
const compression = require("compression");

app.use(compression());
app.use(helmet());
app.use("/api/agent", agentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use((req,res)=>{

res.status(404).json({

success:false,

message:"Route Not Found"

});

});
app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"API Running"
    });
});

module.exports = app;