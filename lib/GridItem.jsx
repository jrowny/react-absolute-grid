'use strict';

import React from 'react';
import BaseDisplayObject from './BaseDisplayObject.jsx';

export default class GridItem extends BaseDisplayObject{

  constructor() {
    super();
    this.onDrag = super.onDrag.bind(this);
    this.onMouseOver = super.onMouseOver.bind(this);
  }

  render() {
    //IMPORTANT: Without the style, nothing happens :(
    var itemStyle = super.getStyle.call(this);

    return <div
            onMouseDown={this.onDrag}
            onMouseOver={this.onMouseOver}
            style={itemStyle}
            className="gridItem">{this.props.item.name}</div>;
  }
}
