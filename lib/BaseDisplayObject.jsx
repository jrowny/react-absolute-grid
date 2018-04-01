'use strict';

import React, { Component, PureComponent } from 'react';

import LayoutManager from './LayoutManager.js';
import PropTypes from 'prop-types';

export default function createDisplayObject(DisplayObject, displayProps, forceImpure) {

  const Comp = forceImpure ? Component : PureComponent;

  return class extends Comp {
    static propTypes = {
      item: PropTypes.object,
      style: PropTypes.object,
      index: PropTypes.number,
      dragEnabled: PropTypes.bool,
      dragManager: PropTypes.object,
      itemsLength: PropTypes.number
    }

    state = {}

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
      const options = {
        itemWidth: this.props.itemWidth,
        itemHeight: this.props.itemHeight,
        verticalMargin: this.props.verticalMargin,
        zoom: this.props.zoom
      };
      const layout = new LayoutManager(options, this.props.layoutWidth);
      const style = layout.getStyle(this.props.index,
        this.props.animation,
        this.props.item[this.props.filterProp]);
      //If this is the object being dragged, return a different style
      if (this.props.dragManager.dragItem &&
          this.props.dragManager.dragItem[this.props.keyProp] === this.props.item[this.props.keyProp]) {
        const dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
        return {...style, ...dragStyle};
      } else if (this.state && this.state.pauseAnimation) {
        const pauseAnimationStyle = {...style};
        pauseAnimationStyle.WebkitTransition = 'none';
        pauseAnimationStyle.MozTransition = 'none';
        pauseAnimationStyle.msTransition = 'none';
        pauseAnimationStyle.transition = 'none';
        return pauseAnimationStyle;
      }
      return style;
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
            {...displayProps}
            item={this.props.item}
            index={this.props.index}
            itemsLength={this.props.itemsLength}/>
        </div>
      );
    }
  }
}
