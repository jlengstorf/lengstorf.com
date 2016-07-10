/**
 * Checks if an element is entirely within the viewport.
 *
 * Based on <http://stackoverflow.com/a/7557433/463471>
 *
 * @param  {Element} el the element to check
 * @return {Boolean}    `true` if the element is fully in view; `false` if not
 */
export function isElementInViewport(el) {
  const position = el.getBoundingClientRect();

  return (
    position.top >= 0 &&
    position.left >= 0 &&
    position.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    position.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Check if an element is visible at all in the viewport.
 * @param  {Element} el the element to check
 * @return {Boolean}    `true` if the element is visible at all; `false` if not
 */
export function isElementVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    (position.top >= 0 && position.top <= windowHeight) ||
    (position.bottom >= 0 && position.bottom <= windowHeight)
  );
}

/**
 * Adds a class to an element that is within the viewport.
 * @param  {Element} el         the element to modify
 * @param  {String} activeClass class to be added/removed from the element
 * @return {Void}
 */
export function onVisibilityChange(el, activeClass = 'js__in-viewport') {
  if (isElementInViewport(el)) {
    el.classList.add(activeClass);
  } else {
    el.classList.remove(activeClass);
  }
}
