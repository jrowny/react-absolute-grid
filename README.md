React Absolute Grid
===================
An absolute layout grid with animations, filtering, zooming, and drag and drop support. Use your own component as the grid item. See the [Demo](http://jrowny.github.io/react-absolute-grid/demo/).

Usage:
------

Install with `npm install react-absolute-grid`

```javascript
import React from 'react';
import createAbsoluteGrid from './lib/AbsoluteGrid.jsx';

// This is the component that will display your data
import YourDisplayComponent from 'your-display-component';

 var sampleItems = [
  {key: 1, name: 'Test', sort: 0, filtered: 0},
  {key: 2, name: 'Test 1', sort: 1, filtered: 0},
];

// Pass your display component to create a new grid
const AbsoluteGrid = createAbsoluteGrid(YourDisplayComponent, {someProp: 'my component needs this'});
React.render(<AbsoluteGrid items={sampleItems} />, document.getElementById('Container'));
```

CreateAbsoluteGrid
------
```javascript
createAbsoluteGrid(DisplayComponent, displayProps = {}, forceImpure = false)
```
 
 * `DisplayComponent`: is a react component to display in your grid
 * `displayProps`: *optional* : are properties you want passed down to the DisplayComponent such as event handlers. 
 * `forceImpure`: *optional* : **not recommended** Will make this function as an impure component, meaning it always renders. 

Options (Properties)
------
| Property | Default | Description |
|---|:---:|---|
| **items** | [] | The array of items in the grid |
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
| **onDragStart** | `fn(e)` | This function is called when an item starts dragging, this is NOT required. |
| **onDragMove** | `fn(e)` | This function is called when as an item is being moved, this is NOT required. |
| **onDragEnd** | `fn(e)` | This function is called when an item has finished its drag, this is NOT required. |

Your Component
------
Your component will receive `item`, `index` and `itemsLength` as props, as well as anything you pass into the createAbsoluteGrid function. Here's the simplest possible example:

```javascript
import React from 'react';

export default function SampleDisplay(props) {
    // Supposing your item shape is something like {name: 'foo'}
    const { item, index, itemsLength } = props;
    return <div>Item {index} of {itemsLength}: {item.name}</div>;
}
```

What Makes AbsoluteGrid Unique?
----
The idea behind AbsoluteGrid is high performance. This is achieved by using Translate3d to position each item in the layout. Items are never removed from the DOM, instead they are hidden. For best performance you should avoid re-arranging or removing items which you pass into AbsoluteGrid, instead you can use the `filtered` and `sort` properties to hide or sort an item. Those properties are customizable using the `keyProp` and `filterProp` properties. In addition, all data passed must be immutable so that we don't waste any renders.

Your Display Component props
----
Each Component is passed the following props, as well as anything passed into the second parameter of `createAbsoluteGrid`

| Property | Description |
|---|:---|
| **item** | The data associated with the GridItem |
| **index** | The index of the item data in the `items` array |
| **itemsLength** | The total length of the `items` array |
| **...displayProps** | props passed into `createAbsoluteGrid` |

ToDo:
-----
 * Tests
 * Improve Drag & Drop browser support and reliability

Browser Compatibility
-----
This component should work in all browsers that [support CSS3 3D Transforms](http://caniuse.com/#feat=transforms3d). If you need IE9 support you can modify it to use transform rather than transform3d. Pull requests welcome!

Drag and Drop only works on IE11+ due to lack of pointer events, although there is a workaround coming soon.

Migrating from 2.x
-----

Instead of passing `displayObject` to the AbsoluteGrid component, pass the component directly into the composer function, `createAbsoluteGrid` which returns an AbsoluteGrid component. That's it!
