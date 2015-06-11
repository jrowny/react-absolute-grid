'use strict';

import React from 'react';

export default class GridItem extends React.Component {
  render() {
    var animation = 'transform 300ms ease';
    var itemStyle = this.props.style;
    itemStyle.WebkitTransition = '-webkit-' + animation;
    itemStyle.MozTransition = '-moz-' + animation;
    itemStyle.msTransition = 'ms-' + animation;
    itemStyle.transition = animation;

    return <div style={itemStyle} className="gridItem">{this.props.item.name}</div>;
  }
}

GridItem.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number
};
