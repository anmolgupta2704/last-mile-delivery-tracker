const Zone = require("../models/Zone");

exports.findZone = async (address) => {

    const zones = await Zone.find();

    const lower = address.toLowerCase();

    for (const zone of zones) {

        for (const area of zone.areas) {

            if (lower.includes(area.toLowerCase())) {

                return zone.name;

            }

        }

    }

    return null;

}