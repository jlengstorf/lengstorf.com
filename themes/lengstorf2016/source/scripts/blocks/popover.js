import analytics from '../utils/analytics';

const getConfig = ({
  popoverClass = 'popover',
  closeBtnClass = 'popover__close',
  buttonModifier = new RegExp(/--open-popover\b/),
  transitionClass = 'popover--fade-out',
  hiddenClass = 'popover--hidden',
  transitionSpeed = 150,
  showCB = (() => {}),
  hideCB = (() => {}),
} = {}) => ({
  popoverClass,
  closeBtnClass,
  buttonModifier,
  transitionClass,
  hiddenClass,
  transitionSpeed,
  showCB,
  hideCB,
});

const show = ({
  popover,
  transitionClass,
  hiddenClass,
  showCB,
}) => {
  popover.classList.remove(hiddenClass);

  // If we don’t add this delay, the transition doesn’t work as expected.
  setTimeout(() => {
    popover.classList.remove(transitionClass);
  }, 10);

  showCB();
};

const hide = ({
  popover,
  transitionClass,
  hiddenClass,
  transitionSpeed,
  hideCB,
}) => {
  popover.classList.add(transitionClass);
  setTimeout(() => {
    popover.classList.add(hiddenClass);
  }, transitionSpeed);

  hideCB();
};

const init = (config = {}) => {
  const {
    popoverClass,
    closeBtnClass,
    buttonModifier,
    transitionClass,
    hiddenClass,
    transitionSpeed,
    showCB,
    hideCB,
  } = getConfig(config);
  const popover = document.getElementsByClassName(popoverClass).item(0);

  if (popover) {
    const close = document.getElementsByClassName(closeBtnClass).item(0);
    const closeHandler = hide.bind(null, {
      popover,
      transitionClass,
      hiddenClass,
      transitionSpeed,
      hideCB,
    });
    const showHandler = show.bind(null, {
      popover,
      transitionClass,
      hiddenClass,
      showCB,
    });

    close.addEventListener('click', event => {
      event.preventDefault();
      analytics.trackEvent({ action: 'close popover', category: 'popover' });
      closeHandler();
    });

    document.addEventListener('click', event => {
      let element = event.target;

      do {
        if (typeof element.classList === 'undefined') {
          continue;
        }

        const classes = [].map.call(element.classList, c => c);

        if (element && buttonModifier.test(classes)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          analytics.trackEvent({ action: 'open popover', category: 'popover' });
          showHandler();
          return;
        }
      } while ((element = element.parentNode));
    });
  }

};

const popover = {
  init,
};

export default popover;
