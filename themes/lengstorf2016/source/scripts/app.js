/*
 * # app.js
 */
import { moveMarkdownFootnotes, highlightCurrentFootnote } from './blocks/footnotes';
import { fiveStagesInit } from './blocks/five-stages';
import { scrollToLocalLinks } from './utils/scroll-to-anchor';
import { lazyLoadImages } from './utils/lazyload-images';
import { lazyLoadDisqus } from './utils/lazyload-disqus';

moveMarkdownFootnotes({
  srcBlockClass: 'footnotes',
  destBlockClass: 'post-footnotes',
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
lazyLoadImages({
  containerClass: 'js--lazyload',
  loadingClass: 'js--lazyload--loading',
});

/*
 * Lazyloads Disqus to avoid wasting bandwidth.
 */
lazyLoadDisqus({ shortName: 'lengstorf' });
