'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Perf from 'react-addons-perf';
import createAbsoluteGrid from './index.js';
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

  let sampleItems = data.screens;
  let render;
  let zoom = 0.7;

  //We set a property on each item to let the grid know not to show it
  var onFilter = function(event){
    var search = new RegExp(event.target.value, 'i');
    sampleItems = sampleItems.map(function(item){
      const isMatched = !item.name.match(search);
      if(!item.filtered || isMatched !== item.filtered) {
        return {
          ...item,
          filtered: isMatched
        }
      }
      return item;
    });
    render();
  };

  //Change the item's sort order
  var onMove = function(source, target){
    source = _.find(sampleItems, {key: parseInt(source, 10)});
    target = _.find(sampleItems, {key: parseInt(target, 10)});

    const targetSort = target.sort;

    //CAREFUL, For maximum performance we must maintain the array's order, but change sort
    sampleItems = sampleItems.map(function(item){
      //Decrement sorts between positions when target is greater
      if(item.key === source.key) {
        return {
          ...item,
          sort: targetSort
        }
      } else if(target.sort > source.sort && (item.sort <= target.sort && item.sort > source.sort)){
        return {
          ...item,
          sort: item.sort - 1
        };
      //Increment sorts between positions when source is greater
      } else if (item.sort >= target.sort && item.sort < source.sort){
        return {
          ...item,
          sort: item.sort + 1
        };
      }
      return item;
    });
    //Perf.start();
    render();
    //Perf.stop();
    //Perf.printWasted();
  };

  var onMoveDebounced = _.debounce(onMove, 40);

  var unMountTest = function(){
    if(ReactDOM.unmountComponentAtNode(document.getElementById('Demo'))){
      ReactDOM.render(<button onClick={unMountTest}>Remount</button>, document.getElementById('UnmountButton'));
    }else{
      render();
      ReactDOM.render(<button onClick={unMountTest}>Test Unmount</button>, document.getElementById('UnmountButton'));
    }
  };

  const AbsoluteGrid = createAbsoluteGrid(SampleDisplay);
  render = function(){
    ReactDOM.render(<AbsoluteGrid items={sampleItems}
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

  ReactDOM.render(<input onChange={onZoom} type='range' min='0.3' max='1.5' step='0.1' defaultValue={zoom}/>, document.getElementById('Zoom'));
  ReactDOM.render(<input placeholder='Filter eg: calendar' onChange={onFilter} type='text'/>, document.getElementById('Filter'));
  ReactDOM.render(<button onClick={unMountTest}>Test Unmount</button>, document.getElementById('UnmountButton'));
  render();
}
