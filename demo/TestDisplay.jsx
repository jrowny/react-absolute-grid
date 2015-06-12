'use strict';

import React from 'react';

export default class TestDisplay extends React.Component {
  rand(min, max) {
    return min + Math.random() * (max - min);
  }

  getRandomColor() {
      var h = this.rand(1, 360);
      var s = this.rand(50, 100);
      var l = this.rand(75, 100);
      return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  render() {
    var itemStyle = this.props.style;

    itemStyle.backgroundColor = this.getRandomColor();
    itemStyle.borderRadius = '10px';

    return <div style={itemStyle} className="gridItem">{this.props.item.name}</div>;
  }
}

TestDisplay.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number
};
