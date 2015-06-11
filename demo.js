'use strict';

import React from 'react';
import AbsoluteGrid from './lib/AbsoluteGrid.jsx';
import TestDisplay from './demo/TestDisplay.jsx';

main();

function main() {

  /*
   The data structure is pretty strict, we require a unique identifier (in this case key) and a sort
  */
  var sampleItems = [
    {key: 1, name: 'Test', sort: 0, filtered: 0},
    {key: 2, name: 'Test 1', sort: 2, filtered: 0},
    {key: 3, name: 'Test 2', sort: 2, filtered: 0},
    {key: 4, name: 'Test 3', sort: 3, filtered: 0},
    {key: 5, name: 'Test 4', sort: 4, filtered: 0},
    {key: 6, name: 'Test 5', sort: 5, filtered: 0},
    {key: 7, name: 'Test 6', sort: 5, filtered: 0},
    {key: 8, name: 'Test 7', sort: 6, filtered: 0},
    {key: 9, name: 'Test 8', sort: 7, filtered: 0},
    {key: 10, name: 'Test 9', sort: 8, filtered: 0},
    {key: 11, name: 'Test 10', sort: 9, filtered: 0},
    {key: 12, name: 'Test 11', sort: 10, filtered: 0}
  ];
  var testDisplay = (<TestDisplay />);
 
  React.render(<AbsoluteGrid items={sampleItems} />, document.getElementById('BasicDemo'));
  React.render(<AbsoluteGrid items={sampleItems} displayObject={testDisplay}/>, document.getElementById('DisplayObjectDemo'));
}
