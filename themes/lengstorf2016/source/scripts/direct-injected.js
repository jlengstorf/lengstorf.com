/*
 * Remove the `.no-js` class from the body to signify that JS is enabled.
 */
document.addEventListener('DOMContentLoaded', event => {
  document.body.classList.remove('no-js');

  // Detect iOS 7 because WHY GOD WHY?
  if (navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (7|8)_\d/i)) {
    document.body.classList.add('ios7');
  }

  // Some things (like hoverable tooltips) don't work on touch devices
  if (!('ontouchstart' in window) || !('msmaxtouchpoints' in window.navigator)) {
    document.body.classList.add('js__not-touch');
  }
});

/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  });
}
