'use strict';

import React from 'react';
import AbsoluteGrid from './index.js';
import TestDisplay from './demo/TestDisplay.jsx';
import * as data from './demo/sampleData.js';

demo();

function demo() {

  /*
   key and sort are required, but configureable with keyProp and sortProp.
  */
  var sampleItems = data.states;

  var testDisplay = (<TestDisplay />);
  //Most Basic Demo
  React.render(<AbsoluteGrid items={sampleItems} keyProp="abbreviation"/>, document.getElementById('BasicDemo'));

  //Using Custom Display
  React.render(<AbsoluteGrid items={sampleItems} keyProp="abbreviation" displayObject={testDisplay}/>, document.getElementById('DisplayObjectDemo'));

  //Using Custom Display and Filtering
  var onFilter = function(event){
    var search = new RegExp(event.target.value, 'i');
    sampleItems.forEach(function(item){
      item.filtered = !item.name.match(search);
    });
    React.render(<AbsoluteGrid items={sampleItems} displayObject={testDisplay} keyProp="abbreviation"/>, document.getElementById('FilterDemo'));
  };
  React.render(<input onChange={onFilter} type='text'/>, document.getElementById('Filter'));
  React.render(<AbsoluteGrid items={sampleItems} displayObject={testDisplay} keyProp="abbreviation"/>, document.getElementById('FilterDemo'));

}
