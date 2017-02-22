# node-kinetics
Node.js package for transforming accelerometer and gyroscope data

# Build status

[![Build Status](https://travis-ci.org/MaximilianBuegler/node-kinetics.svg?branch=master)](https://travis-ci.org/MaximilianBuegler/node-kinetics)
[![Coverage Status](https://coveralls.io/repos/github/MaximilianBuegler/node-kinetics/badge.svg?branch=master)](https://coveralls.io/github/MaximilianBuegler/node-kinetics?branch=master)

# Notes
    Assumes all input data to be 2D arrays
    
    [[x1, y1, z1], [x2, y2, z2],...]
    [[pitch1, roll1, yaw1]. [pitch2, roll2, yaw2],... ] (in Radians)

# Credits

    The description by Nghia Ho for rotation matrices was helpful
    http://nghiaho.com/?page_id=846 (Cached: http://www.webcitation.org/6mHnx3sCs )
    
# Installation
    npm install kinetics --save
    
# Usage
    var kinetics = require('kinetics');
    
    var attitude=[ 0, 0, 0 ];
    
    var rot = kinetics.composeRotation(attitude[0],attitude[1],attitude[2]);
    console.log(rot);
    
// returns: [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ]
    
    attitude=[ 0, Math.PI/2, 0 ];
    
    rot = kinetics.composeRotation(attitude[0],attitude[1],attitude[2]);
    console.log(rot);
    
// returns: [ [ 0, 0, 1 ], [ 0, 1, 0 ], [ -1, 0, 0 ] ]

    var accelerometerData=[ [ 1, 2, 3], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
    var attitudeData=[ [ Math.PI/2, 0, 0 ], [ 0, Math.PI/2, 0 ], [ 0, 0, Math.PI/2 ] ];
    
    var vert = kinetics.extractVerticalComponent(accelerometerData,attitudeData);    
    console.log(vert);
    
// returns: [ -2, 4, 9 ]

    var rsig = kinetics.rotateSignal(accelerometerData,attitudeData);
    console.log(rsig);
    
// returns: [ [ 1, 3, -2 ], [ -6, 5, 4 ], [ 7, 8, 9 ] ]
    
# Test
    npm test
    
Returns:

    Compose Rotation Matrix
      Test 1
        ✓ Should properly compute [0,0,0]
      Test 2
        ✓ Should properly compute [Pi/2,0,0]
      Test 3
        ✓ Should properly compute [0,Pi/2,0]
      Test 4
        ✓ Should properly compute [0,0,Pi/2]
      Test 5
        ✓ Should properly compute [1,1,1]
  
    Extract Vertical Component
      Test 1
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[0,0,0],[0,0,0],[0,0,0]]
      Test 2
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[Pi/2,0,0],[Pi/2,0,0],[Pi/2,0,0]]
      Test 3
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[1,1,1],[1,2,3],[3,2,1]]
  
    Rotate Signal
      Test 1
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[0,0,0],[0,0,0],[0,0,0]]
      Test 2
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[Pi/2,0,0],[Pi/2,0,0],[Pi/2,0,0]]
      Test 3
        ✓ Should properly compute [[[1,2,3],[4,5,6],[7,8,9]],[[1,1,1],[1,2,3],[3,2,1]]
  
  
    11 passing (11ms)
    
# License

MIT License

Copyright (c) 2016 Maximilian Bügler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
