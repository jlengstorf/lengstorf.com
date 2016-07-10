/*
 * # Footnotes
 */

const bemifyFootnotes = (footnoteList, containerClass) => {
  const footnotes = footnoteList.children;
  for (let i = 0; i < footnotes.length; i++) {
    footnotes[i].classList.add(`${containerClass}__footnote`);

    // Class up the link, too.
    const returnLink = footnotes[i].querySelector('.footnote-return');

    if (returnLink) {
      returnLink.classList.add(`${containerClass}__return-link`);
    }
  }
};

const resetFootnoteClasses = (containerClass, activeClass) => {
  const footnotes = document.querySelector(`.${containerClass}__list`);
  let footnote = footnotes ? footnotes.firstElementChild : false;

  // First, remove the active class from all highlights.
  while (footnote && footnote.tagName === 'LI') {
    footnote.classList.remove(activeClass);
    footnote = footnote.nextElementSibling;
  }
};

export function moveMarkdownFootnotes({
  srcBlockClass,
  destBlockClass,
}) {

  // Find the old container for footnotes.
  const oldContainer = document.getElementsByClassName(srcBlockClass).item(0);

  // If the old container can’t be found, assume no footnotes exist and stop.
  if (oldContainer) {
    const newContainer = document.getElementsByClassName(destBlockClass).item(0);

    // Get the list of footnotes out of the container.
    const footnoteList = oldContainer.getElementsByTagName('OL').item(0);
    footnoteList.classList.add(`${destBlockClass}__list`);

    // Class up the list a bit.
    bemifyFootnotes(footnoteList, destBlockClass);

    // Add the footnotes to the new container and unhide it.
    newContainer.appendChild(footnoteList);
    newContainer.classList.remove(`${destBlockClass}--hidden`);

    // Remove the old container altogether.
    if (oldContainer.parentNode) {
      oldContainer.parentNode.removeChild(oldContainer);
    }
  }
}

export function highlightCurrentFootnote({
  containerClass,
  highlightModifier = '--highlight',
}, target) {

  // For this to work, the container MUST be `position: relative|absolute`
  const container = target.parentNode;
  const isFootnote = container.classList.contains(`${containerClass}__list`);
  const activeClass = `${containerClass}__footnote${highlightModifier}`;

  // Unhighlight all the footnotes on every click.
  resetFootnoteClasses(containerClass, activeClass);

  // Next, check if this is a footnote and add the active class if so.
  if (isFootnote && target.tagName === 'LI') {
    target.classList.add(activeClass);
  }
}
