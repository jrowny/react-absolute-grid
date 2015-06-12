'use strict';

import React from 'react';
import * as assign from 'object-assign';

export default class BaseDisplayObject extends React.Component {

  updateDrag(x, y){
    //Pause Animation lets our item return to a snapped position without being animated
    var pauseAnimation = false;
    if(!this.props.dragManager.dragItem){
      pauseAnimation = true;
      setTimeout(function(){
        this.setState({pauseAnimation: false});
      }.bind(this));
    }
    this.setState({
      dragX: x,
      dragY: y,
      pauseAnimation: pauseAnimation
    });
  }

  onDrag(event){
    if(this.props.dragManager){
      var domNode = React.findDOMNode(this);
      this.props.dragManager.startDrag(event, domNode, this.props.item, this.updateDrag.bind(this));
    }
  }

  onMouseOver(){
    if(this.props.dragManager.dragItem && this.props.dragManager.dragItem !== this.props.item){
      this.props.dragManager.hoverItem = this.props.item;
    }
  }

  getStyle(){

    //If this is the object being dragged, return a different style
    if(this.props.dragManager.dragItem === this.props.item){
      var dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
      return assign.default({}, this.props.style, dragStyle);
    }else if(this.state && this.state.pauseAnimation){
      var pauseAnimationStyle = assign.default({}, this.props.style);
      pauseAnimationStyle.WebkitTransition = 'none';
      pauseAnimationStyle.MozTransition = 'none';
      pauseAnimationStyle.msTransition = 'none';
      pauseAnimationStyle.transition = 'none';
      return pauseAnimationStyle;
    }

    return this.props.style;
  }


  componentWillUnmount(){
    this.props.dragmanager.endDrag();
  }
}

BaseDisplayObject.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number,
  dragManager: React.PropTypes.object
};
