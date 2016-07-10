import { throttle } from './performance';
import { isElementVisible } from './is-in-viewport';

/*
 * # Lazyload Images
 *
 * This was inspired by <https://github.com/ivopetkov/responsively-lazy/>, but
 * I found the implementation to be a little over-engineered. This solution
 * uses the same markup, but simplifies the way things are handled. It also
 * adds an optional fallback for when JavaScript is disabled.
 *
 * ## Markup
 *
 * The markup to implement this is:

 <div class="js--lazyload js--lazyload--loading">
   <img alt="image description"
        src="/images/image@2x.jpg"
        srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        data-lazyload="/images/image-300x150.jpg 300w,
                     /images/image-600x300.jpg 600w,
                     /images/image.jpg 690w,
                     /images/image@2x.jpg 1380w">
   <noscript>
     <img alt="image description"
          src="/images/image@2x.jpg"
          srcset="/images/image-300x150.jpg 300w,
                  /images/image-600x300.jpg 600w,
                  /images/image.jpg 690w,
                  /images/image@2x.jpg 1380w">
   </noscript>
 </div>

 * ### Markup Details
 *
 * - The classes can be changed, but must be updated in the call to
 *   `lazyLoadImages()`.
 * - The initial `srcset` is a blank GIF, which avoids an unnecessary HTTP
 *   request.
 * - The _actual_ `srcset` is added as `data-lazyload`.
 *
 * The way `lazyLoadImages()` works is to check if the image is inside the
 * viewport, and — if so — swap out the `srcset` for the `data-lazyload`. This
 * is much simpler than duplicating browser behavior to choose the optimal
 * image size; instead, we just give the browser a `srcset` and let it do its
 * thing.
 *
 * On older browsers (that don’t support `srcset`), the regular `src` attribute
 * is used, so this should degrade gracefully.
 *
 * ## JavaScript
 *
 * To enable lazyloading, add the following to your initialization script:
 *
 *     import { lazyLoadImages } from './utils/lazyload-images';
 *
 *     lazyLoadImages({
 *       containerClass: 'js--lazyload',
 *       loadingClass: 'js--lazyload--loading',
 *     });
 *
 * ### JavaScript Details
 *
 * - This approach assumes the use of a transpiler (such as
 *   [Babel](https://babeljs.io/)) to allow the use of ES2015 modules.
 * - The `containerClass` and `loadingClass` properties are optional; the
 *   default values are shown in the example above.
 */

/**
 * Check if an image is visible and trigger an event if so.
 * @param  {Element} image the image to check
 * @param  {Event}   event an event to dispatch if the image is in the viewport
 * @return {Boolean}       true if the image is in the viewport; false if not
 */
const maybeTriggerImageLoad = (image, event) => {
  if (!image.dataset.loaded && isElementVisible(image)) {
    image.dispatchEvent(event);

    return true;
  }

  return false;
};

/**
 * This almost seems too easy, but we simply swap in the correct srcset.
 * @param  {Event} event the triggered event
 * @return {Void}
 */
const loadImage = event => {
  event.target.srcset = event.target.dataset.lazyload;

  // Add a `data-loaded` attribute to prevent duplicate loads.
  event.target.dataset.loaded = true;
};

/**
 * Remove the loading class from the container element.
 * @param  {Element} image        the image being loaded
 * @param  {String}  loadingClass the class to remove
 * @return {Void}
 */
const removeLoadingClass = (image, loadingClass) => {
  image.parentNode.classList.remove(loadingClass);
};

/**
 * Initializes the lazyloader and adds all relevant handlers.
 * @param  {String} options.containerClass the container for images to lazyload
 * @param  {String} options.loadingClass   the loading class for lazyloading
 * @return {Void}
 */
export function lazyLoadImages({ containerClass, loadingClass }) {
  const toLoad = document.getElementsByClassName(containerClass);
  const images = Array.prototype.map.call(toLoad, c => c.firstElementChild);

  // Create a custom event to trigger the event load.
  const lazyLoadEvent = new Event('lazyload-init');

  // Attach an onload handler to each image.
  images.forEach(image => {

    /*
     * Once the image is loaded, we want to remove the loading class so any
     * loading animations or other effects can be disabled.
     */
    image.addEventListener('load', event => {
      removeLoadingClass(event.target, loadingClass);
    });

    /*
     * Set up a listener for the custom event that triggers the image load
     * handler (which loads the image).
     */
    image.addEventListener('lazyload-init', loadImage);

    /*
     * Check if the image is already in the viewport. If so, load it.
     */
    maybeTriggerImageLoad(image, lazyLoadEvent);
  });

  /*
   * Add an event listener when the page is scrolled. To avoid bogging down the
   * page, we throttle this call to only run every 100ms.
   */
  const scrollHandler = throttle(() => {
    images.forEach(image => {
      maybeTriggerImageLoad(image, lazyLoadEvent);
    });
  }, 100);
  window.addEventListener('scroll', scrollHandler);
}
