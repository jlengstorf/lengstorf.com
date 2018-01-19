exports.onClientEntry = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration('/').then(registration => {
      if (registration) {
        registration.unregister();
      }
    });
  }
};
