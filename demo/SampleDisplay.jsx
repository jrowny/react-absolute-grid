'use strict';

import React from 'react';
import BaseDisplayObject from '../lib/BaseDisplayObject.jsx';

export default class SampleDisplay extends BaseDisplayObject{

  constructor() {
    super();
    this.onDrag = super.onDrag.bind(this);
    this.onMouseOver = super.onMouseOver.bind(this);
  }

  render() {
    //IMPORTANT: Without the style, nothing happens :(
    var itemStyle = super.getStyle.call(this);
    itemStyle.backgroundImage = 'url(\'' + this.props.item.url + '\')';

    return <div
            onMouseDown={this.onDrag}
            onMouseOver={this.onMouseOver}
            style={itemStyle}
            className="gridItem"><span className="name">{this.props.item.name}</span></div>;
  }
}
