'use strict';

import React from 'react';
import AbsoluteGrid from './index.js';
import SampleDisplay from './demo/SampleDisplay.jsx';
import * as data from './demo/sampleData.js';
import * as _ from 'lodash';

demo();

/**
 * This demo is meant to show you all of the things that are possible with ReactAbsoluteGrid
 * If implemented in a Flux project, the grid would be in a render method with the
 * event handlers calling Actions which would update a Store. For the sake of brevity,
 * the "store" is implemented locally and the changes re-rendered manually
 *
 * TODO: implement inside a react component rather than doing this all manually
 **/

function demo() {

  var sampleItems = data.screens;
  var displayObject = (<SampleDisplay/>);
  var render;
  var zoom = 0.7;

  //We set a property on each item to let the grid know not to show it
  var onFilter = function(event){
    var search = new RegExp(event.target.value, 'i');
    sampleItems.forEach(function(item){
      item.filtered = !item.name.match(search);
    });
    render();
  };

  //Change the item's sort order
  var onMove = function(source, target){
    source = _.find(sampleItems, {key: parseInt(source, 10)});
    target = _.find(sampleItems, {key: parseInt(target, 10)});

    var targetSort = target.sort;

    //CAREFUL, For maximum performance we must maintain the array's order, but change sort
    sampleItems.forEach(function(item){
      //Decrement sorts between positions when target is greater
      if(target.sort > source.sort && (item.sort <= target.sort && item.sort > source.sort)){
        item.sort --;
      //Incremenet sorts between positions when source is greator
      }else if(item.sort >= target.sort && item.sort < source.sort){
        item.sort ++;
      }
    });

    source.sort = targetSort;
    render();
  };

  var onMoveDebounced = _.debounce(onMove, 80);

  var unMountTest = function(){
    if(React.unmountComponentAtNode(document.getElementById('Demo'))){
      React.render(<button onClick={unMountTest}>Remount</button>, document.getElementById('UnmountButton'));
    }else{
      render();
      React.render(<button onClick={unMountTest}>Test Unmount</button>, document.getElementById('UnmountButton'));
    }
  };

  render = function(){
    React.render(<AbsoluteGrid items={sampleItems}
                               displayObject={displayObject}
                               onMove={onMoveDebounced}
                               dragEnabled={true}
                               zoom={zoom}
                               responsive={true}
                               verticalMargin={42}
                               itemWidth={230}
                               itemHeight={409}/>, document.getElementById('Demo'));
  };

  var renderDebounced = _.debounce(render, 150);

  //Update the zoom value
  var onZoom = function(event){
    zoom = parseFloat(event.target.value);
    renderDebounced();
  };

  React.render(<input onChange={onZoom} type='range' min='0.3' max='1.5' step='0.1' defaultValue={zoom}/>, document.getElementById('Zoom'));
  React.render(<input placeholder='Filter eg: calendar' onChange={onFilter} type='text'/>, document.getElementById('Filter'));
  React.render(<button onClick={unMountTest}>Test Unmount</button>, document.getElementById('UnmountButton'));
  render();
}
