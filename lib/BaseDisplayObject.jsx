'use strict';

import React from 'react';

export default class BaseDisplayObject extends React.Component {
  constructor(props){
    super(props);
    this.cancelDrag = this.cancelDrag.bind(this);
    this.state ={
      pauseAnimation: false,
      dragX:null,
      dragY:null
    }
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

  fireOnDrag(e){

    if(this.props.dragManager){

      document.removeEventListener('mouseup', this.cancelDrag);
      document.removeEventListener('touchend', this.cancelDrag);
      document.removeEventListener('touchcancel', this.cancelDrag);
      document.removeEventListener('mousemove', this.cancelDrag);
      this.props.dragManager.startDrag(e, this.domNode, this.props.item, this.updateDrag.bind(this));
    }
  }
  cancelDrag(){
    if(this.timeHandler){
      clearTimeout(this.timeHandler);
      this.timeHandler = null;
    }
  }
  onDrag = (e) => {
    document.addEventListener('mouseup', this.cancelDrag);
    document.addEventListener('touchend', this.cancelDrag);
    document.addEventListener('touchcancel', this.cancelDrag);
    document.addEventListener('mousemove', this.cancelDrag);
    var time= this.props.timeDelay || 500;
    var self = this;
    (function(n,timeout){
      self.timeHandler = setTimeout(function(){
        self.timeHandler = null;
        self.fireOnDrag(n);
      },timeout)
    })(e,time)

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
      this.domNode.setAttribute('data-key', this.props.id);
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
  id: React.PropTypes.any,
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  index: React.PropTypes.number,
  dragEnabled: React.PropTypes.bool,
  dragManager: React.PropTypes.object
};
