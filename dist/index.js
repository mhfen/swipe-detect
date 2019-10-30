/**
 * Used to ignore longer touches that are probably not
 * meant as a swipe by the user
 *
 * @constant ALLOWED_SWIPE_TIME
 */
const ALLOWED_SWIPE_TIME = 300;

class SwipeDetect {
  constructor(target, callback, threshold) {
    this.target = target;
    this.callback = callback;
    this.threshold = threshold;

    this.enable();
  }

  /**
   * Adds the event listeners needed to record a swipe
   *
   * @name enable
   */
  enable() {
    this.target.addEventListener('touchstart', this.recordTouchStartValues.bind(this));
    this.target.addEventListener('touchend', this.detectSwipeDirection.bind(this));
  }

  /**
   * Destroys event listeners, to be used when
   * unmounting components using SwipeDetect
   *
   * @name disable
   */
  disable() {
    this.target.removeEventListener('touchstart', this.recordTouchStartValues.bind(this));
    this.target.removeEventListener('touchend', this.detectSwipeDirection.bind(this));
  }

  /**
   * When a User starts a touch, record the
   * values for later computation in detectSwipeDirection
   *
   * @name recordTouchStartValues
   * @param {Object} e [DOM Event object]
   */
  recordTouchStartValues(e) {
    const touch = e.changedTouches[0];

    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.startTime = new Date().getTime();
  }

  /**
   * When a user ends a touch, use the start and end
   * values to determine the direction of the swipe
   *
   * @name detectSwipeDirection
   * @param {Object} e [DOM Event object]
   */
  detectSwipeDirection(e) {
    const touch = e.changedTouches[0];
    const distX = touch.pageX - this.startX;
    const distY = touch.pageY - this.startY;
    const absX = Math.abs(distX);
    const absY = Math.abs(distY);
    const elapsedTime = new Date().getTime() - this.startTime;

    if (elapsedTime > ALLOWED_SWIPE_TIME) return;

    switch(true) {
      case absX >= this.threshold && absX > absY && distX < 0:
        this.callback('left');
        break;
      case absX >= this.threshold && absX > absY && distX > 0:
        this.callback('right');
        break;
      case absY >= this.threshold && absY > absX && distY < 0:
        this.callback('up');
        break;
      case absY >= this.threshold && absY > absX && distY > 0:
        this.callback('down');
        break;
    }
  }
}

/**
 * Opens up the necessary event listeners on an element
 * to detect touch movement and then returns the direction
 * of that movement to the event handler
 *
 * @param {Object} target [DOM element for detection]
 * @param {function} callback [The function receiving direction]
 * @param {Int} threshold [the minimum pixels the swipe must have traveled to trigger detection]
 * @returns {Class}
 */
export default function(target, callback, threshold=150) {
  return new SwipeDetect(target, callback, threshold);
}
