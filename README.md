React Absolute Grid
===================
An absolute layout grid with animations, filtering, zooming, and drag and drop support. Use your own component as the grid item. See the [Demo](http://jrowny.github.io/react-absolute-grid/demo/).

Usage:
------

Install with `npm install react-absolute-grid`

    import React from 'react';
    import AbsoluteGrid from './lib/AbsoluteGrid.jsx';
  
     var sampleItems = [
      {key: 1, name: 'Test', sort: 0, filtered: 0},
      {key: 2, name: 'Test 1', sort: 1, filtered: 0},
    ];
     
    React.render(<AbsoluteGrid items={sampleItems} />, document.getElementById('Container'));
    

Options (Properties)
------

| Property | Default | Description |
|---|:---:|---|
| **items** | [] | The array of items in the grid |
| **displayObject** | &lt;GridItem/&gt; | The React component used to display items |
| **keyProp** | 'key' | The property to be used as a key  |
| **filterProp** | 'filtered' | The property to be used for filtering, if the filtered value is true, the item won't be displayed. It's important to not remove items from the array because that will cause React to remove the DOM, for performance we would rather hide it then remove it. |
| **sortProp** | 'sort' | The property to sort on |
| **itemWidth** | 128 | The width of an item |
| **itemHeight** | 128 | The height of an item |
| **verticalMargin** | -1 | How much space between rows, -1 means the same as columns margin which is dynamically calculated based on width |
| **responsive** | false | If the container has a dynamic width, set this to true to update when the browser resizes |
| **dragEnabled** | false | Enables drag and drop listeners, onMove will be called with the keys involved in a drag and drop |
| **animation** | 'transform 300ms ease' | The CSS animation to use on elements. Pass a blank string or `false` for no animation. |
| **zoom** | 1 | Zooms the contents of the grid, 1 = 100% |
| **onMove** | `fn(from, to)` | This function is called when an item is dragged over another item. It is your responsibility to update the sort of all items when this happens. |

Creating a DisplayObject component
------
Display objects will receive item, style, and index as properties. You must apply the style to the root element in your render. Here's the simplest possible example:

    'use strict';

    import React from 'react';
    import BaseDisplayObject from '../lib/BaseDisplayObject.jsx';

    export default class SampleDisplay extends BaseDisplayObject{

      render() {
        //IMPORTANT: Without the style, nothing happens :(
        var itemStyle = super.getStyle.call(this);
        return <div style={itemStyle}></div>;
      }
    }

Once you've created a display object, use it like this: 
     
     var dispalyObject = (<SampleDisplay />);
     var grid = (<AbsoluteGrid ... displayObject={displayObject}/>);

What Makes AbsoluteGrid Unique?
----
The idea behind AbsoluteGrid is high performance. This is achieved by using Translate3d to position each item in the layout. Items are never removed from the DOM, instead they are hidden. For best performance you should avoid re-arranging or removing items which you pass into AbsoluteGrid, instead you can use the `filtered` and `sort` properties to hide or sort an item. Those properties are customizable using the `keyProp` and `filterProp` properties.


ToDo:
-----
 * Improve Drag & Drop browser support and reliability

Browser Compatibility
-----
This component should work in all browsers that [support CSS3 3D Transforms](http://caniuse.com/#feat=transforms3d). If you need IE9 support you can modify it to use transform rather than transform3d. Pull requests welcome!

Drag and Drop only works on IE11+ due to lack of pointer events, although there is a workaround coming soon.
