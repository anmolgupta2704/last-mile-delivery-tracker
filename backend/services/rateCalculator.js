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
    const volumetricWeight = (length * breadth * height) / 5000;

    // Chargeable Weight
    const chargeableWeight = Math.max(actualWeight, volumetricWeight);

    // Find Rate Card
    const rate = await RateCard.findOne({
        pickupZone,
        dropZone,
        orderType
    });

    if (!rate) {
        throw new Error("Rate Card Not Found");
    }

    let deliveryCharge = chargeableWeight * rate.ratePerKg;

    // COD Charge
    if (paymentType === "COD") {

        const cod = await CODCharge.findOne({
            orderType
        });

        if (cod) {
            deliveryCharge += cod.charge;
        }
    }

    return {
        volumetricWeight,
        chargeableWeight,
        deliveryCharge
    };
};