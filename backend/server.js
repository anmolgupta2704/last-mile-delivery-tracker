require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: process.env.CLIENT_URL,
        methods:["GET","POST","PUT","PATCH","DELETE"]
    }
});
global.io = io;

io.on("connection", (socket) => {

    console.log("Client Connected :", socket.id);

    socket.on("join-order", (orderId) => {

        socket.join(orderId);

        console.log(`Joined Room ${orderId}`);

    });

    socket.on("disconnect", () => {

        console.log("Client Disconnected");

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server Running on ${PORT}`);

});