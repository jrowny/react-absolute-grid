'use strict';

import React from 'react';
import * as _ from 'lodash';

export default class BaseDisplayObject extends React.Component {

  constructor(){
    super();
    this.onDrag = this.onDrag.bind(this);
  }

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

  onDrag(e){
    if(this.props.dragManager){
      var domNode = React.findDOMNode(this);
      this.props.dragManager.startDrag(e, domNode, this.props.item, this.updateDrag.bind(this));
    }
  }

  getStyle(){

    //If this is the object being dragged, return a different style
    if(this.props.dragManager.dragItem === this.props.item){
      var dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
      return _.assign({}, this.props.style, dragStyle);
    }else if(this.state && this.state.pauseAnimation){
      var pauseAnimationStyle = _.assign({}, this.props.style);
      pauseAnimationStyle.WebkitTransition = 'none';
      pauseAnimationStyle.MozTransition = 'none';
      pauseAnimationStyle.msTransition = 'none';
      pauseAnimationStyle.transition = 'none';
      return pauseAnimationStyle;
    }

    return this.props.style;
  }

  componentDidMount(){
    if(this.props.dragEnabled){
      React.findDOMNode(this).addEventListener('mousedown', this.onDrag);
      React.findDOMNode(this).addEventListener('touchstart', this.onDrag);
      React.findDOMNode(this).setAttribute('data-key', this.props.key);
    }
  }

  componentWillUnmount(){
    this.props.dragManager.endDrag();
  }
}

BaseDisplayObject.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number,
  dragEnabled: React.PropTypes.bool,
  dragManager: React.PropTypes.object
};
