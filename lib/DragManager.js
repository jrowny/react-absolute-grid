'use strict';

export default class DragManager {

  dragItem;
  hoverItem;
  initialMouseX;
  initialMouseY;
  initialEventX;
  initialEventY;
  dragX;
  dragY;
  udpate;
  debounced;

  constructor(moveFn){
    this.dragMove = this.dragMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.moveFn = moveFn;
  }

  dragMove(e) {
    var tolerance = 3;

    var xMovement = Math.abs(this.initialEventX - e.pageX);
    var yMovement = Math.abs(this.initialEventY - e.pageY);

    if(xMovement > tolerance || yMovement > tolerance){

      this.dragX = e.clientX - this.initialMouseX;
      this.dragY = e.clientY - this.initialMouseY;

      this.update(this.dragX, this.dragY);

      if(this.hoverItem && !this.debounced){
        this.moveFn(this.dragItem, this.hoverItem);
        this.hoverItem = null;
        //TODO: this debouncing worked but also made it feel slow, need to figure out a way to tell when individual items are moving
        //this.debounced = true;
       // setTimeout(function(){
       //   this.debounced = false;
       // }.bind(this), 300);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }

  endDrag() {

    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.endDrag);

    this.dragItem = null;
    this.hoverItem = null;
    if(this.update && typeof this.update === 'function'){
      this.update(null, null);
    }
    this.update = null;

  }

  startDrag(e, domNode, item, fnUpdate){
    if(e.button === 0){
        var rect = domNode.getBoundingClientRect();

        this.update = fnUpdate;
        this.dragItem = item;
        this.initialMouseX = Math.round(e.pageX - (rect.left + window.pageXOffset));
        this.initialMouseY = Math.round(e.pageY - (rect.top + window.pageYOffset));
        this.initialEventX = e.pageX;
        this.initialEventY = e.pageY;

        document.addEventListener('mousemove', this.dragMove);
        document.addEventListener('mouseup', this.endDrag);

      //This is needed to stop text selection in most browsers
      e.preventDefault();

    }
  }

  getStyle(x, y){
    var dragStyle = {};
    var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    //Makes positioning simpler if we're fixed
    dragStyle.position = 'fixed';
    dragStyle.zIndex = 1000;
    //Required for Fixed positioning
    dragStyle.left = 0;
    dragStyle.top = 0;
    dragStyle.WebkitTransform = transform;
    dragStyle.MozTransform = transform;
    dragStyle.msTransform = transform;
    dragStyle.transform = transform;

    //Turn off animations for this item
    dragStyle.WebkitTransition = 'none';
    dragStyle.MozTransition = 'none';
    dragStyle.msTransition = 'none';
    dragStyle.transition = 'none';

    //Allows mouseover to work
    dragStyle.pointerEvents = 'none';

    return dragStyle;
  }
}
