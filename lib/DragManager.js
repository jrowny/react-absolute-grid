'use strict';

export default class DragManager {

  dragItem;
  initialMouseX;
  initialMouseY;
  initialEventX;
  initialEventY;
  dragX;
  dragY;
  udpate;
  debounced;
  keyProp;

  constructor(moveFn, keyProp){
    this.dragMove = this.dragMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.moveFn = moveFn;
    this.keyProp = keyProp;
  }

  dragMove(e) {
    var tolerance = 3;
    var isTouch = e.touches && e.touches.length;
    var pageX = isTouch ? e.touches[0].pageX : e.pageX;
    var pageY = isTouch ? e.touches[0].pageY : e.pageY;

    var xMovement = Math.abs(this.initialEventX - pageX);
    var yMovement = Math.abs(this.initialEventY - pageY);

    if(xMovement > tolerance || yMovement > tolerance){
      var clientX = isTouch ? e.touches[0].clientX : e.clientX;
      var clientY = isTouch ? e.touches[0].clientY : e.clientY;

      this.dragX = clientX - this.initialMouseX;
      this.dragY = clientY - this.initialMouseY;

      this.update(this.dragX, this.dragY);


      var targetKey;
      var targetElement = document.elementFromPoint(clientX, clientY);
      while(targetElement.parentNode){
        if(targetElement.getAttribute('data-key')){
          targetKey = targetElement.getAttribute('data-key');
          break;
        }
        targetElement = targetElement.parentNode;
      }

      if(targetKey && targetKey !== this.dragItem[this.keyProp]){
        this.moveFn(this.dragItem[this.keyProp], targetKey);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }

  endDrag() {

    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.endDrag);

    this.dragItem = null;
    if(this.update && typeof this.update === 'function'){
      this.update(null, null);
    }
    this.update = null;

  }

  startDrag(e, domNode, item, fnUpdate){
    var isTouch = e.targetTouches && e.targetTouches.length === 1;
    if(e.button === 0 || isTouch){
        var rect = domNode.getBoundingClientRect();

        this.update = fnUpdate;
        this.dragItem = item;
        var pageX = isTouch ? e.targetTouches[0].pageX : e.pageX;
        var pageY = isTouch ? e.targetTouches[0].pageY : e.pageY;

        this.initialMouseX = Math.round(pageX - (rect.left + window.pageXOffset));
        this.initialMouseY = Math.round(pageY - (rect.top + window.pageYOffset));
        this.initialEventX = pageX;
        this.initialEventY = pageY;

        document.addEventListener('mousemove', this.dragMove);
        document.addEventListener('touchmove', this.dragMove);
        document.addEventListener('mouseup', this.endDrag);
        document.addEventListener('touchend', this.endDrag);
        document.addEventListener('touchcancel', this.endDrag);

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
