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

var Matrix = require('linear-algebra')().Matrix;  
var cos=Math.cos;
var sin=Math.sin;




module.exports = {
    
    /**
     * Rotate accelerometer signal using attitude data and extract vertical component.
     * Useful for instance for implementing a pedometer
     *
     * @param {2D array} (linear) accelerometerData 2D array containing time series of acceleration values [[x1, y1, z1],[x2, y2, z2],...]
     * @param {2D array} attitudeData 2D array containing time series of attitude values [[pitch1, roll1, yaw1]. [pitch2, roll2, yaw2],... ] (in Radians)
     * @returns {1D array} of vertical acceleration values [z1, z2,...]
     *
     */
    extractVerticalComponent: function extractVerticalComponent(accelerometerData, attitudeData) {
        var res=[];
        var rm;
        for (var i=0;i<accelerometerData.length;i++){
            rm=new Matrix(module.exports.composeRotation(attitudeData[i][0],attitudeData[i][1],0)); 
            res[i]=new Matrix([accelerometerData[i][0],accelerometerData[i][1],accelerometerData[i][2]]).dot(rm).data[0][2];
        }
        return res;
    },
    
    /**
     * Rotate accelerometer signal using attitude data.
     * Useful for instance for implementing a pedometer
     *
     * @param {2D array} (linear) accelerometerData 2D array containing time series of acceleration values [[x1, y1, z1],[x2, y2, z2],...]
     * @param {2D array} attitudeData 2D array containing time series of attitude values [[pitch1, roll1, yaw1]. [pitch2, roll2, yaw2],... ] (in Radians)
     * @returns {2D array} of rotated acceleration values [[x1, y1, z1],[x2, y2, z2],...]
     *
     */
    rotateSignal: function extractVerticalComponent(accelerometerData, attitudeData) {
        var res=[];
        var rm;
        for (var i=0;i<accelerometerData.length;i++){
            rm=new Matrix(module.exports.composeRotation(attitudeData[i][0],attitudeData[i][1],0)); 
            res[i]=new Matrix([accelerometerData[i][0],accelerometerData[i][1],accelerometerData[i][2]]).dot(rm).data[0];
        }
        return res;
    },    
   
    /**
     * Calculate rotation matrix
     * based on the description by Nghia Ho at http://nghiaho.com/?page_id=846 (Cached: http://www.webcitation.org/6mHnx3sCs )
     *
     * @param {double} x x rotation (pitch)
     * @param {double} y y rotation (roll)
     * @param {double} z z rotation (yaw)
     * @returns {2D array} rotation matrix 3x3
     * 
     */
    composeRotation: function composeRotation(x, y, z){
    var X = new Matrix([ [1, 0, 0], [0, cos(x), -sin(x)], [0, sin(x), cos(x)] ]),
        Y = new Matrix([ [cos(y), 0, sin(y)], [0, 1, 0], [-sin(y), 0, cos(y)] ]),
        Z = new Matrix([ [cos(z), -sin(z), 0], [sin(z), cos(z), 0], [0, 0, 1] ]);
    return Z.dot(Y).dot(X).data;
    }
       
};