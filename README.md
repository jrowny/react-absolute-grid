React Absolute Grid
===================
An absolute layout grid with animations, filtering, zooming, and drag and drop support. Use your own component as the grid item.

[Demo](http://jrowny.github.io/react-absolute-grid/demo/)
------

Usage:
------

    import React from 'react';
    import AbsoluteGrid from './lib/AbsoluteGrid.jsx';
    
    /*
       The data structure is pretty strict, we require a unique identifier (in this case key) and a sort
    */
    var sampleItems = [
      {key: 1, name: 'Test', sort: 0, filtered: 0},
      {key: 2, name: 'Test 1', sort: 1, filtered: 0},
    ];
     
    React.render(<AbsoluteGrid items={sampleItems} />, document.getElementById('Container'));
    

Options (Properties)
------

  * **items** | default: [] | The array of items in the grid
  * **displayObject** | default: &lt;GridItem/&gt; | The React compnent used to display items
  * **keyProp** | default: 'key' | The property to be used as a key 
  * **filterProp** | default: 'filtered' | The property to be used for filtering, if the filtered value is true, the item won't be displayed. It's important to not remove items from the array because that will cause React to remove the DOM, for performance we would rather hide it then remove it.
  * **sortProp** | default: 'sort' | The property to sort on
  * **itemWidth** | default: 128 | The width of an item
  * **itemHeight** | default: 128 | The height of an item
  * **verticalMargin** | default: -1 | How much space between rows, -1 means the same as coumns spacing which is dynamically calculated
  * **responsive** | default: false | If the container has a dynamic width, set this to true to update when the browser resizes
  * **animation** | default: 'transform 300ms ease' | The CSS animation to use on elements. Pass a blank string or `false` for no animation.
  * **zoom** | default: 1 | Zooms the contents of the grid

Creating a DisplayObject component
------
Display objects must accept an item, style, and index property and apply the style to the root element in your render. Here's the simplest possible example:

    import React from 'react';

    export default class SampleDisplay extends React.Component {

      render() {
        var itemStyle = this.props.style;

        return <div style={itemStyle} >Sample Display Object: {this.props.item.name}</div>;
      }
    }

    SampleDisplay.propTypes = {
      item: React.PropTypes.object,
      style: React.PropTypes.object,
      index: React.PropTypes.number
    };

ToDo:
-----

 * Drag and Drop
 * Zoom demo
 * Selection
