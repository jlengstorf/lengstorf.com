let isScrolling = false;

const getCurrentURL = () => {
  const { protocol, host, pathname } = document.location;
  return `${protocol}//${host}${pathname}`;
};

const isLocalLink = uri => !uri.replace(getCurrentURL(), '').match(/^http/);

/**
 * Browser workaround to avoid a bug where scrollTop doesn’t work.
 * @return {Element}  the scrollable root element
 */
const getScrollableElement = () => (
  document.body.scrollTop ? document.body : document.documentElement
);

/**
 * Easing, using sinusoidal math (or some shit).
 *
 * I know; this makes my head hurt, too. Math is hard. This formula was copied
 * (I reformatted for legibility) from here: <http://gizma.com/easing/#sin3>
 *
 * @param  {Number} elapsed how much time has elapsed already
 * @param  {Number} start   the starting position
 * @param  {Number} change  the desired step size
 * @param  {Number} length  the duration length
 * @return {Number}         the new position based on the easing formula
 */
const easeInOutSine = (elapsed, start, change, length) => (
  -change / 2 * (Math.cos(Math.PI * elapsed / length) - 1) + start
);

// Sets up a loop that executes for the length of time set in duration
const animateScroll = (element, elapsedTime, {
  position,
  stepSize,
  increment,
  duration,
  callback = () => {},
}) => {
  elapsedTime += increment;

  // Set the new element position using an easing formula.
  element.scrollTop = easeInOutSine(elapsedTime, position, stepSize, duration);

  if (elapsedTime < duration) {
    setTimeout(() => { animateScroll(element, elapsedTime, {
      position,
      stepSize,
      increment,
      duration,
      callback,
    }); }, increment);
  } else {
    callback();
  }
};

const avoidChromeBug = () => {
  if (document.body && document.body.scrollTop === 0) {

    // Addresses a weird Chrome bug where scrollTop doesn't work when
    // scrolled all the way to the top (document.body.scrollTop === 0).
    document.body.scrollTop = 1;
  }
};

const scrollToLocation = (element, targetPos, duration) => (
  new Promise((resolve, reject) => {
    animateScroll(element, 0, {
      position: element.scrollTop,
      stepSize: targetPos - element.scrollTop,
      increment: 20,
      callback: resolve,
      duration,
    });
  })
);

const scrollToAnchor = (event, {
  uri,
  offsetAdjustment,
  duration,
  callback,
}) => (
  new Promise((resolve, reject) => {

    // Do nothing if the document is already scrolling.
    if (isScrolling) {
      reject('Scrolling is already in progress.');
    }

    // Get the location hash, if one exists.
    const targetID = uri.split('#')[1] || false;

    // If the link is a local link and a hash was found, start the scroll.
    if (isLocalLink(uri) && targetID) {
      event.preventDefault();

      // Prevent overlapping scroll attempts.
      isScrolling = true;

      // Use the location hash to find the target element.
      const target = targetID ? document.getElementById(targetID) : false;
      const rootElement = getScrollableElement();

      // Figure out where the page should be scrolled to.
      let targetOffset = target.offsetTop - offsetAdjustment;

      scrollToLocation(rootElement, targetOffset, duration)
        .then(() => {
          isScrolling = false;
          resolve();
        });

      callback(target);
    } else {
      reject('Link is not local.');
    }
  })
);

export function scrollToLocalLinks(event, {
  offsetAdjustment = 0,
  duration = 750,
  callback = () => {},
} = {}) {
  if (event.target.tagName === 'A' && event.target.href !== 'undefined') {
    avoidChromeBug();

    // Add the new URI to the config object.
    const config = {
      uri: event.target.href,
      offsetAdjustment,
      duration,
      callback,
    };

    // Trigger the scroll.
    scrollToAnchor(event, config)
      .then(() => {

        // On a successful scroll, update the browser history.
        history.pushState({ newURL: config.uri }, '', config.uri);
      })
      .catch(error => {

        // Nothing needs to happen since errors just mean no scrolling.
      });
  }
}
