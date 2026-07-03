const RateCard = require("../models/RateCard");
const CODCharge = require("../models/CODCharge");

exports.calculateRate = async ({
    pickupZone,
    dropZone,
    length,
    breadth,
    height,
    actualWeight,
    paymentType,
    orderType
}) => {

    // Volumetric Weight
    const volumetricWeight =
        (Number(length) * Number(breadth) * Number(height)) / 5000;

    // Chargeable Weight
    const chargeableWeight = Math.max(
        Number(actualWeight),
        volumetricWeight
    );

    // Try to find Rate Card
    let rate = await RateCard.findOne({
        pickupZone,
        dropZone,
        orderType
    });

    // If no rate card found, use default charge
    let ratePerKg = 50;

    if (rate) {
        ratePerKg = rate.ratePerKg;
    }

    let deliveryCharge = chargeableWeight * ratePerKg;

    // COD Charge
    if (paymentType === "COD") {

        const cod = await CODCharge.findOne({
            orderType
        });

        if (cod) {
            deliveryCharge += cod.charge;
        } else {
            deliveryCharge += 40; // Default COD charge
        }
    }

    return {
        volumetricWeight,
        chargeableWeight,
        deliveryCharge
    };
};