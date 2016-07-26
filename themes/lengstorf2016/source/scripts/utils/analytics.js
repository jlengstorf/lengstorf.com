const trackEvent = ({
  category = 'default',
  action = 'click',
  source = document.location.pathname,
  callback = (() => {}),
}) => {
  ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: source,
    hitCallback: callback,
  });
};

const analytics = {
  trackEvent,
};

export default analytics;
