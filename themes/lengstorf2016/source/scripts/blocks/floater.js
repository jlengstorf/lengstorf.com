import { throttle } from '../utils/performance';

let isFixed = false;

const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop;

/**
 * Get the distance from the top of the page for a given element.
 * @param  {Element} element the element to retrieve the offset for
 * @return {Number}          the offset
 */
const getOffsetTop = element => {
  let offsetTop = 0;

  do {
    if (!isNaN(element.offsetTop)) {
      offsetTop += element.offsetTop;
    }
  } while ((element = element.offsetParent));

  return offsetTop;
};

const init = ({
  elementClass = 'js__floater',
  fixedClass = false,
  offsetTop = 0,
} = {}) => {
  const element = document.getElementsByClassName(elementClass)[0] || false;

  if (element) {
    const triggerTop = getOffsetTop(element) + offsetTop;
    const shouldAttachFixedClass = throttle(() => {
      if (triggerTop <= getScrollTop() && !isFixed) {
        element.classList.add(fixedClass || `${elementClass}--fixed`);
        isFixed = true;
      } else if (triggerTop > getScrollTop() && isFixed) {
        element.classList.remove(fixedClass || `${elementClass}--fixed`);
        isFixed = false;
      }
    }, 20);

    document.addEventListener('scroll', shouldAttachFixedClass);

    shouldAttachFixedClass();
  }
};

const floater = {
  init,
};

export default floater;
