// midi helper

function mapRange(value, lowRange, highRange) {
    value = value / 127;
    return value * (highRange - lowRange) + lowRange;
}

module.exports = {
    mapRange: mapRange
};