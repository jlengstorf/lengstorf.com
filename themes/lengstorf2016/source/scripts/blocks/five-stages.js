import { onVisibilityChange } from '../utils/is-in-viewport';

/**
 * Initializes the Five Stages elements.
 * @param  {String} selector the selector for Five Stages elements
 * @return {Boolean}         `true` if Five Stages elements are found; `false` otherwise
 */
export function fiveStagesInit(selector = '.five-stages') {
  const fiveStages = document.querySelectorAll(selector);

  if (!fiveStages) {
    return false;
  }

  [].forEach.call(fiveStages, el => {
    el.classList.add('js__active');

    // Sets up a handler and attaches it to the scroll event
    const viewportChangeHandler = () => {
      onVisibilityChange(el);
    };

    addEventListener('scroll', viewportChangeHandler, false);
  });

  return true;
}
