# node-kinetics
Node.js package for transforming accelerometer and gyroscope data

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
    
    var rot = kinetics.composeRotation(0,0,0);
    console.log(rot);
    
    //returns: [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ]

    var vert = kinetics.extractVerticalComponent([[1,2,3],[4,5,6],[7,8,9]],[[Math.PI/2,0,0],[0,Math.PI/2,0],[0,0,Math.PI/2]]);    
    console.log(vert);
    
    //returns: [ -2, 4, 9 ]

    var rsig = kinetics.rotateSignal([[1,2,3],[4,5,6],[7,8,9]],[[Math.PI/2,0,0],[0,Math.PI/2,0],[0,0,Math.PI/2]]);
    console.log(rsig);
    
    //returns: [ [ 1, 3, -2 ], [ -6, 5, 4 ], [ 7, 8, 9 ] ]
    
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
    
