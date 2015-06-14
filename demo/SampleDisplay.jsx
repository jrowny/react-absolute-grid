'use strict';

import React from 'react';
import BaseDisplayObject from '../lib/BaseDisplayObject.jsx';

export default class SampleDisplay extends BaseDisplayObject{

  render() {
    //IMPORTANT: Without the style, nothing happens :(
    var itemStyle = super.getStyle.call(this);
    itemStyle.backgroundImage = 'url(\'' + this.props.item.url + '\')';

    return <div
            style={itemStyle}
            className="gridItem"><span className="name">{this.props.item.name}</span></div>;
  }
}
