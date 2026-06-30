const flow = {
    Created: ["Assigned"],
    Assigned: ["Picked Up"],
    "Picked Up": ["In Transit"],
    "In Transit": ["Out For Delivery"],
    "Out For Delivery": ["Delivered", "Failed"],
    Failed: ["Rescheduled"],
    Rescheduled: ["Assigned"]
};

exports.isValidTransition = (current, next) => {
    return flow[current]?.includes(next);
};