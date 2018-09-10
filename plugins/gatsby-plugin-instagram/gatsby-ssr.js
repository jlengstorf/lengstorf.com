/* eslint-disable import/no-extraneous-dependencies, react/no-danger, import/prefer-default-export */
import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }) =>
  setPostBodyComponents([
    <script
      key="gatsby-plugin-instagram"
      dangerouslySetInnerHTML={{
        __html: `
        window.gatsbyLoadInstagram = function() {
          var js = document.createElement('script');
          var firstScript = document.getElementsByTagName('script')[0];
          js.id = 'gatsby-plugin-instagram';
          js.src = '//platform.instagram.com/en_US/embeds.js';

          firstScript.parentNode.insertBefore(js, firstScript);

          return true;
        }
      `,
      }}
    />,
  ]);
