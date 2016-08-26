function clearActiveStatus() {
  const activeLinks = document.querySelectorAll('[data-is-active=true]');
  if (activeLinks && activeLinks.length) {
    [].map.call(activeLinks, e => e.dataset.isActive = 'false');
  }
}

function close(container, activeClass, event) {
  if (event.target.classList.contains('footnote-display__close')) {
    event.preventDefault();
    container.classList.remove(activeClass);

    clearActiveStatus();
  }
}

function updateDisplay(container, footnoteID) {
  const footnote = document.getElementById(footnoteID);
  const wrapper = container.querySelector('.footnote-display__text-wrap');
  const textElement = container.querySelector('.footnote-display__text');

  // Get the current footnote number
  let footnoteNumber = 1;
  let previousFootnote = footnote.previousElementSibling;
  while (previousFootnote) {
    footnoteNumber++;
    previousFootnote = previousFootnote.previousElementSibling;
  }

  wrapper.dataset.footnoteNumber = footnoteNumber;
  textElement.innerHTML = footnote.innerHTML;
}

function open(container, activeClass, event) {
  if (event.target.getAttribute('rel') === 'footnote') {

    // Prevent anything else from firing when footnote links are clicked.
    event.preventDefault();
    event.stopImmediatePropagation();

    // If the footnote is already open, close it.
    if (event.target.dataset.isActive === 'true') {
      container.classList.remove(activeClass);
      clearActiveStatus();

      return;
    }

    // Update the footnote display.
    updateDisplay(container, event.target.getAttribute('href').split('#')[1]);

    // Show the footnote.
    container.classList.add(activeClass);

    // Remove active status from all footnote links.
    clearActiveStatus();

    // Set the current footnote to active.
    event.target.dataset.isActive = 'true';
  }
}

export default function footnotes() {

  // Grab the article container for footnote links and the display container.
  const display = document.getElementsByClassName('footnote-display')[0];
  const article = document.getElementsByClassName('article__content')[0];
  const activeClass = 'footnote-display--active';

  if (display && article) {
    article.addEventListener('click', open.bind(null, display, activeClass));
    display.addEventListener('click', close.bind(null, display, activeClass));
  }
}
