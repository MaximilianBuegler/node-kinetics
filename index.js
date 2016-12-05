
/*===========================================================================*\
 *
 * node-kinetics
 *
 * Node.js package for transforming accelerometer and gyroscope data
 *
 * (c) 2016 Maximilian Bügler
 *
 * Assumes all data to be 2D arrays
 *
 * [[x1, y1, z1],[x2, y2, z2],...]
 * [[pitch1, roll1, yaw1]. [pitch2, roll2, yaw2],... ] (in Radians)
 *
 *===========================================================================*/

module.exports = {
    composeRotation: require('./src/kinetics').composeRotation,
    rotateSignal: require('./src/kinetics').rotateSignal,
    extractVerticalComponent: require('./src/kinetics').extractVerticalComponent,
};
