/* eslint-disable import/no-extraneous-dependencies, react/no-danger, import/prefer-default-export */
import React from 'react';

export const onRenderBody = ({ pathname = '', setPostBodyComponents }) => {
  if (pathname.match('why-ideas-fail')) {
    return;
  }

  setPostBodyComponents([
    <script
      key="gatsby-plugin-five-stages"
      dangerouslySetInnerHTML={{
        __html: `
        function handleIntersect(entries, observer) {
          const ACTIVE_CLASS = 'five-stages--active';
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.75) {
              entry.target.classList.add(ACTIVE_CLASS);
            } else {
              entry.target.classList.remove(ACTIVE_CLASS);
            }
          });
        }

        function createObserver(images) {
          const options = {
            rootMargin: '-40px 0px 0px 0px',
            threshold: [0.15, 1],
          };

          const observer = new IntersectionObserver(handleIntersect, options);
          images.forEach(image => {
            observer.observe(image);
          });
        }

        window.addEventListener('load', function(event) {
          const images = document.querySelectorAll('.five-stages');

          createObserver(images);
        });
      `,
      }}
    />,
  ]);
};
