'use strict';

import React, { PropTypes, PureComponent } from 'react';

export default function createDisplayObject(DisplayObject) {
  return class extends PureComponent {
    static propTypes = {
      item: PropTypes.object,
      style: PropTypes.object,
      index: PropTypes.number,
      dragEnabled: PropTypes.bool,
      dragManager: PropTypes.object,
      itemsLength: PropTypes.number
    }

    updateDrag(x, y) {
      //Pause Animation lets our item return to a snapped position without being animated
      let pauseAnimation = false;
      if(!this.props.dragManager.dragItem){
        pauseAnimation = true;
        setTimeout(() => {
          this.setState({pauseAnimation: false});
        }, 20);
      }
      this.setState({
        dragX: x,
        dragY: y,
        pauseAnimation: pauseAnimation
      });
    }

    onDrag = (e) => {
      if(this.props.dragManager){
        this.props.dragManager.startDrag(e, this.domNode, this.props.item, this.updateDrag.bind(this));
      }
    }

    getStyle() {
      //If this is the object being dragged, return a different style
      if (this.props.dragManager.dragItem &&
          this.props.dragManager.dragItem[this.props.keyProp] === this.props.item[this.props.keyProp]) {
        const dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
        return {...this.props.style, ...dragStyle};
      } else if (this.state && this.state.pauseAnimation) {
        const pauseAnimationStyle = {...this.props.style};
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
        this.domNode.setAttribute('data-key', this.props.item[this.props.keyProp]);
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
        <div ref={node => this.domNode = node}
             style={this.getStyle()}>
          <DisplayObject
            item={this.props.item}
            itemsLength={this.props.itemsLength}/>
        </div>
      );
    }
  }
}
