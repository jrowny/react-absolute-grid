'use strict';

import React from 'react';
import BaseStyleObject from './BaseDisplayObject.jsx';
import LayoutManager from './LayoutManager.js';
import DragManager from './DragManager.js';
import debounce from 'lodash.debounce';
import sortBy from 'lodash.sortby';

export default class AbsoluteGrid extends React.Component {

  constructor(props, context){
    super(props, context);
    this.onResize = debounce(this.onResize, 150);
    this.dragManager = new DragManager(this.props.onMove, this.props.keyProp);
    this.state = {
      layoutWidth: 0,
      dragItemId: 0
    };
  }

  render() {
    if(!this.state.layoutWidth || !this.props.items.length){
      return <div ref={node => this.container = node}></div>;
    }

    const options = {
      itemWidth: this.props.itemWidth,
      itemHeight: this.props.itemHeight,
      verticalMargin: this.props.verticalMargin,
      zoom: this.props.zoom
    };

    const layout = new LayoutManager(options, this.state.layoutWidth);

    let filteredIndex = 0;
    let sortedIndex = {};

    /*
     If we actually sorted the array, React would re-render the DOM nodes
     Creating a sort index just tells us where each item should be
     This also clears out filtered items from the sort order and
     eliminates gaps and duplicate sorts
     */
    sortBy(this.props.items, this.props.sortProp).forEach(item => {
      if(!item[this.props.filterProp]){
        const key = item[this.props.keyProp];
        sortedIndex[key] = filteredIndex;
        filteredIndex++;
      }
    });

    const gridItems = this.props.items.map(item => {
      const key = item[this.props.keyProp];
      const index = sortedIndex[key];
      const style = layout.getStyle(index, this.props.animation, item[this.props.filterProp]);

      return (
        <BaseStyleObject
          style={style}
          item={item}
          index={index}
          id={key}
          key={key}
          itemsLength={this.props.items.length}
          dragEnabled={this.props.dragEnabled}
          dragManager={this.dragManager}
        >
          { React.cloneElement(this.props.displayObject, { ...this.props.displayObject.props, item }) }
        </BaseStyleObject>
      );
    });

    const gridStyle = {
      position: 'relative',
      display: 'block',
      height: layout.getTotalHeight(filteredIndex)
    };

    return (
      <div
        style={gridStyle}
        className="absoluteGrid"
        ref={node => this.container = node}
      >
        {gridItems}
      </div>
    );
  }

  componentDidMount() {
    //If responsive, listen for resize
    if(this.props.responsive){
      window.addEventListener('resize', this.onResize);
    }
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this.getDOMWidth);
    } else {
      setTimeout(this.getDOMWidth, 66);
    }
  }

  getDOMWidth = () => {
    const width = this.container && this.container.clientWidth;

    if(this.state.layoutWidth !== width){
      this.setState({layoutWidth: width});
    }

  }


}

AbsoluteGrid.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  displayObject: React.PropTypes.element.isRequired,
  itemWidth: React.PropTypes.number,
  itemHeight: React.PropTypes.number,
  verticalMargin: React.PropTypes.number,
  zoom: React.PropTypes.number,
  responsive: React.PropTypes.bool,
  dragEnabled: React.PropTypes.bool,
  keyProp: React.PropTypes.string,
  sortProp: React.PropTypes.string,
  filterProp: React.PropTypes.string,
  animation: React.PropTypes.string,
  onMove: React.PropTypes.func
};

AbsoluteGrid.defaultProps = {
  items: [],
  keyProp: 'key',
  filterProp: 'filtered',
  sortProp: 'sort',
  itemWidth: 128,
  itemHeight: 128,
  verticalMargin: -1,
  responsive: false,
  dragEnabled: false,
  animation: 'transform 300ms ease',
  zoom: 1,
  onMove: function(){}
};
