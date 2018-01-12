exports.onRouteUpdate = function trackPageViews({ location }) {
  // Don't track while developing.
  if (/* process.env.NODE_ENV === `production` &&  */window.amplitude) {
    // Wait for the title update (see #2478)
    setTimeout(() => {
      window.amplitude.getInstance().logEvent('PAGE_VIEW', {
        source: (location || {}).pathname,
      });
    }, 0);
  }
};
