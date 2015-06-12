'use strict';

import React from 'react';

export default class GridItem extends React.Component {
  render() {
    var itemStyle = this.props.style;
    return <div style={itemStyle} className="gridItem">{this.props.item.name}</div>;
  }
}

GridItem.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number
};
