exports.onClientEntry = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations('/').then(registrations => {
      registrations.map(reg => reg.unregister());
    });
  }
};
