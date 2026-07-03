require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");
const CODCharge = require("../models/CODCharge");
const Order = require("../models/Order");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {

    try {

        await User.deleteMany();
        await Zone.deleteMany();
        await RateCard.deleteMany();
        await CODCharge.deleteMany();
        await Order.deleteMany();   

        const password = await bcrypt.hash("123456",10);

        // Admin
        await User.create({

            name:"Admin",

            email:"admin@gmail.com",

            password,

            role:"admin"

        });

        // Agent 1

        await User.create({

            name:"agent",

            email:"agent@gmail.com",

            password,

            role:"agent",

            zone:"North",

            location:{

                lat:26.49,

                lng:80.31

            }

        });

        // Agent 2

        await User.create({

            name:"Rohit",

            email:"rohit@gmail.com",

            password,

            role:"agent",

            zone:"South",

            location:{

                lat:26.42,

                lng:80.37

            }

        });

        // Customer

        await User.create({

            name:"Anmol",

            email:"anmol@gmail.com",

            password,

            role:"customer"

        });

        console.log("Users Seeded");
await User.create({

            name:"Customer",

            email:"customer@gmail.com",

            password,

            role:"customer"

        });

        // Zones

        await Zone.create({

            name:"North",

            areas:[

                "Civil Lines",

                "Mall Road",

                "Swaroop Nagar"

            ],

            center:{

                lat:26.49,

                lng:80.31

            }

        });

        await Zone.create({

            name:"South",

            areas:[

                "Kidwai Nagar",

                "Barra",

                "Naubasta"

            ],

            center:{

                lat:26.42,

                lng:80.37

            }

        });

        console.log("Zones Seeded");

        // Rate Cards

        await RateCard.create({

            pickupZone:"North",

            dropZone:"North",

            orderType:"B2C",

            ratePerKg:50,

            isInterZone:false

        });

        await RateCard.create({

            pickupZone:"North",

            dropZone:"South",

            orderType:"B2C",

            ratePerKg:60,

            isInterZone:true

        });

        await RateCard.create({

            pickupZone:"South",

            dropZone:"South",

            orderType:"B2C",

            ratePerKg:50,

            isInterZone:false

        });

        await CODCharge.create({

            orderType:"B2C",

            charge:40

        });

        console.log("Rate Cards Seeded");

        console.log("Database Seeded Successfully");

        process.exit();

    }

    catch(err){

        console.log(err);

        process.exit();

    }

}

seed();