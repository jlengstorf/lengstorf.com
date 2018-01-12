exports.onRouteUpdate = function triggerInstagramLoad() {
  // Wait to ensure page is rendered first.
  setTimeout(() => {
    if (
      typeof gatsbyLoadInstagram !== `undefined` &&
      typeof window.gatsbyLoadInstagram === `function`
    ) {
      window.gatsbyLoadInstagram();
    }
  }, 0);
};
