import swipeDetect from '~/dist/index';

describe('Swipe Detect', () => {
  const TARGET = {
    addEventListener() {},
    removeEventListener() {}
  };

  it('creates properties from arguments', () => {
    const callback = (swipe) => {};
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    expect(swiper.target).toEqual(TARGET);
    expect(swiper.callback).toEqual(callback);
    expect(swiper.threshold).toEqual(threshold);
  });

  it('returns nothing when a swipe under threshold occurs', () => {
    let theSwipe = null;
    const callback = (swipe) => {
      theSwipe = swipe;
    };
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    swiper.recordTouchStartValues({
      'changedTouches': [{
        'pageX': 150,
        'pageY': 150,
      }]
    });
    swiper.detectSwipeDirection({
      'changedTouches': [{
        'pageX': 50,
        'pageY': 150,
      }]
    });

    expect(theSwipe).toEqual(null);
  });

  it('returns left when a left moving swipe occurs', () => {
    let theSwipe = null;
    const callback = (swipe) => {
      theSwipe = swipe;
    };
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    swiper.recordTouchStartValues({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 200,
      }]
    });
    swiper.detectSwipeDirection({
      'changedTouches': [{
        'pageX': 0,
        'pageY': 200,
      }]
    });

    expect(theSwipe).toEqual('left');
  });

  it('returns right when a right moving swipe occurs', () => {
    let theSwipe = null;
    const callback = (swipe) => {
      theSwipe = swipe;
    };
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    swiper.recordTouchStartValues({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 200,
      }]
    });
    swiper.detectSwipeDirection({
      'changedTouches': [{
        'pageX': 400,
        'pageY': 200,
      }]
    });

    expect(theSwipe).toEqual('right');
  });

  it('returns down when a down moving swipe occurs', () => {
    let theSwipe = null;
    const callback = (swipe) => {
      theSwipe = swipe;
    };
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    swiper.recordTouchStartValues({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 200,
      }]
    });
    swiper.detectSwipeDirection({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 400,
      }]
    });

    expect(theSwipe).toEqual('down');
  });

  it('returns up when a up moving swipe occurs', () => {
    let theSwipe = null;
    const callback = (swipe) => {
      theSwipe = swipe;
    };
    const threshold = 150;
    const swiper = swipeDetect(TARGET, callback, threshold);

    swiper.recordTouchStartValues({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 200,
      }]
    });
    swiper.detectSwipeDirection({
      'changedTouches': [{
        'pageX': 200,
        'pageY': 0,
      }]
    });

    expect(theSwipe).toEqual('up');
  });

  it('event listener bindings should have a correct scope', (done) => {
    const callback = () => done();
    const threshold = 150;
    const TARGET = document.createElement('div');
    swipeDetect(TARGET, callback, threshold);

    TARGET.dispatchEvent(new TouchEvent('touchstart', {
      changedTouches: [{
        'pageX': 200,
        'pageY': 200,
      }]
    }));

    TARGET.dispatchEvent(new TouchEvent('touchend', {
      changedTouches: [{
        'pageX': 200,
        'pageY': 400,
      }]
    }));
  });
});
