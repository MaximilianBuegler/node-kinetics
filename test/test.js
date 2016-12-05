/*===========================================================================*\
 *
 * node-kinetics
 * 
 * Node.js package for transforming accelerometer and gyroscope data
 *
 * (c) 2016 Maximilian Bügler
 *
 * Test setup adapted from fft-js in https://github.com/vail-systems/node-fft
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 *===========================================================================*/



var assert = require('assert'),
    kinetics = require('../');

describe('Compose Rotation Matrix', function () {

    describe('Test 1', function () {
        it('Should properly compute [0,0,0]', function () {
            var rot = kinetics.composeRotation(0,0,0);
            check(rot,[ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ],0.001);
        });
    });
    
    describe('Test 2', function () {
        it('Should properly compute [Pi/2,0,0]', function () {
            var rot = kinetics.composeRotation(Math.PI/2,0,0);
            check(rot,[ [ 1, 0, 0 ], [ 0, 0, -1 ], [ 0, 1, 0 ] ],0.001);
        });
    });

    describe('Test 3', function () {
        it('Should properly compute [0,Pi/2,0]', function () {
            var rot = kinetics.composeRotation(0,Math.PI/2,0);
            check(rot,[ [ 0, 0, 1 ], [ 0, 1, 0 ], [ -1, 0, 0 ] ],0.001);
        });
    });    

    describe('Test 4', function () {
        it('Should properly compute [0,0,Pi/2]', function () {
            var rot = kinetics.composeRotation(0,0,Math.PI/2);
            check(rot,[ [ 0, -1, 0], [ 1, 0, 0 ], [ 0, 0, 1 ] ],0.001);
        });
    });    

    describe('Test 5', function () {
        it('Should properly compute [1,1,1]', function () {
            var rot = kinetics.composeRotation(1,1,1);
            check(rot,[ [ 0.292, -0.0721, 0.954 ], [ 0.455, 0.888, -0.0721 ], [ -0.841, 0.455, 0.292 ] ],0.001);
        });
    });        
});


describe('Extract Vertical Component', function () {
    describe('Test 1', function () {
        it('Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[0,0,0],[0,0,0],[0,0,0]]', function () {
            var vert = kinetics.extractVerticalComponent([[1,2,3],[4,5,6],[7,8,9]],[[0,0,0],[0,0,0],[0,0,0]]);
            check(vert,[3,6,9],0.001);
        });
    });
    
    describe('Test 2', function () {
        it('Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[Pi/2,0,0],[Pi/2,0,0],[Pi/2,0,0]]', function () {
            var vert = kinetics.extractVerticalComponent([[1,2,3],[4,5,6],[7,8,9]],[[Math.PI/2,0,0],[0,Math.PI/2,0],[0,0,Math.PI/2]]);
            check(vert,[-2,4,9],0.001);
        });
    });        

    describe('Test 3', function () {
        it('Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[1,1,1],[1,2,3],[3,2,1]]', function () {
            var vert = kinetics.extractVerticalComponent([[1,2,3],[4,5,6],[7,8,9]],[[1,1,1],[1,2,3],[3,2,1]]);
            check(vert,[-0.353,-3.591,-3.723],0.001);
        });
    });        
    
});






function check(result, desired,threshold) {
    if (Array.isArray(desired)){
        assert(Array.isArray(result));
        assert(result.length==desired.length);
        for (var i=0;i<result.length;i++){
            check(result[i],desired[i],threshold);
        }
    }
    else{
        assert(equalWithThreshold(desired,result,threshold));
    }
}

function equalWithThreshold(val1, val2, threshold) {
    return (val1 > val2 - threshold) &&
           (val1 < val2 + threshold);
}

