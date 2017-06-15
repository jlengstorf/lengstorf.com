const trackEvent = ({
  category = 'default',
  action = 'click',
  source = document.location.pathname,
  callback = (() => {}),
}) => {
  if (amplitude) {
    amplitude.getInstance().logEvent(action, {
      category,
      source,
    });
  }

  // ga('send', {
  //   hitType: 'event',
  //   eventCategory: category,
  //   eventAction: action,
  //   eventLabel: source,
  //   hitCallback: callback,
  // });
};

const analytics = {
  trackEvent,
};

export default analytics;
