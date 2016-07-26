import analytics from '../utils/analytics';

const trackSharing = link => {
  const srcClass = [].filter.call(link.classList, c => /link--/.test(c));
  const network = srcClass[0].replace('sharing__link--', '');

  const callback = () => {

    // Opens a small named window for standard sharing
    window.open(
      link.href,
      'sharing-window',
      'width=800, height=400, top=200, left=300'
    );
  };

  analytics.trackEvent({
    category: 'share',
    action: network,
    callback,
  });
};

const init = () => {
  document.addEventListener('click', event => {
    if (event.target.classList && event.target.classList.contains('sharing__link')) {
      event.preventDefault();
      trackSharing(event.target);
    }
  });
};

const sharing = {
  init,
};

export default sharing;
