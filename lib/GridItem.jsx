'use strict';

import React from 'react';
import BaseDisplayObject from './BaseDisplayObject.jsx';

export default class GridItem extends BaseDisplayObject{

  render() {
    //IMPORTANT: Without the style, nothing happens :(
    var itemStyle = super.getStyle.call(this);

    return <div
            style={itemStyle}
            className="gridItem">{this.props.item.name}</div>;
  }
}
