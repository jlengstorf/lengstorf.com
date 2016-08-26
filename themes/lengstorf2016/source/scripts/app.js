/*
 * # app.js
 */
import { fiveStagesInit } from './blocks/five-stages';
import { scrollToLocalLinks } from './utils/scroll-to-anchor';
import { lazyLoadImages } from 'responsive-lazyload';
import { lazyLoadDisqus } from './utils/lazyload-disqus';
import popover from './blocks/popover';
import floater from './blocks/floater';
import sharing from './blocks/sharing';
import footnotes from './blocks/footnote-display';

footnotes();

/*
 * Enables popovers. This needs to happen _before_ `scrollToLocalLinks()` to
 * prevent scrolling the page when a popover link is clicked.
 */
popover.init();

floater.init({
  elementClass: 'header__nav',
});

document.addEventListener('click', event => {
  scrollToLocalLinks(event, {
    offsetAdjustment: 20,
    callback: highlightCurrentFootnote.bind(null, {
      containerClass: 'post-footnotes',
    }),
  });
});

/*
 * This is a toy app for the post at `/why-ideas-fail/`. I should only be
 * loading it on that post, but I’m choosing laziness at the moment.
 */
fiveStagesInit();

/*
 * Lazyloads images to cut down on unnecessary data transfer.
 */
lazyLoadImages();

/*
 * Lazyloads Disqus to avoid wasting bandwidth.
 */
lazyLoadDisqus({ shortName: 'lengstorf' });

sharing.init();
