const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Last Mile Delivery API",
            version: "1.0.0",
            description: "API Documentation"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

module.exports = swaggerJsDoc(options);