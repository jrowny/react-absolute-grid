'use strict';

import React from 'react';

export default class BaseDisplayObject extends React.Component {

  constructor() {
    super();
    this.onDrag = this.onDrag.bind(this);
  }

  updateDrag(x, y) {
    //Pause Animation lets our item return to a snapped position without being animated
    var pauseAnimation = false;
    if(!this.props.dragManager.dragItem){
      pauseAnimation = true;
      setTimeout(() => {
        this.setState({pauseAnimation: false});
      }, 0);
    }
    this.setState({
      dragX: x,
      dragY: y,
      pauseAnimation: pauseAnimation
    });
  }

  onDrag(e) {
    if(this.props.dragManager){
      this.props.dragManager.startDrag(e, this.domNode, this.props.item, this.updateDrag.bind(this));
    }
  }

  getStyle() {
    //If this is the object being dragged, return a different style
    if (this.props.dragManager.dragItem === this.props.item) {
      var dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
      return {...this.props.style, ...dragStyle};
    } else if (this.state && this.state.pauseAnimation) {
      var pauseAnimationStyle = {...this.props.style};
      pauseAnimationStyle.WebkitTransition = 'none';
      pauseAnimationStyle.MozTransition = 'none';
      pauseAnimationStyle.msTransition = 'none';
      pauseAnimationStyle.transition = 'none';
      return pauseAnimationStyle;
    }

    return this.props.style;
  }

  componentDidMount() {
    if (this.props.dragEnabled) {
      this.domNode.addEventListener('mousedown', this.onDrag);
      this.domNode.addEventListener('touchstart', this.onDrag);
      this.domNode.setAttribute('data-key', this.props.key);
    }
  }

  componentWillUnmount() {
    if (this.props.dragEnabled) {
      this.props.dragManager.endDrag();
      this.domNode.removeEventListener('mousedown', this.onDrag);
      this.domNode.removeEventListener('touchstart', this.onDrag);
    }
  }

  render() {
    return (
      <div ref={node => this.domNode = node} style={this.getStyle()}>{ this.props.children }</div>
    );
  }
}

BaseDisplayObject.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number,
  dragEnabled: React.PropTypes.bool,
  dragManager: React.PropTypes.object
};
