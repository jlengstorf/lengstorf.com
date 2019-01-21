import 'url-search-params-polyfill';
import React from 'react';
import { Location } from '@reach/router';
import styled from 'react-emotion';
import { FaTwitter } from 'react-icons/fa';
import { colors, fonts } from '../config/styles';

const Box = styled('blockquote')`
  border: 1px solid ${colors.grayAlpha};
  border-radius: 4px;
  font-family: ${fonts.heading};
  font-style: normal;
  font-weight: 700;
`;

const Text = styled('p')`
  color: ${colors.heading};
`;

const Link = styled('a')`
  color: ${colors.purpleDark};
  display: inline-block;
  font-family: ${fonts.heading};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.075em;
  line-height: 1.375;
  margin-left: -0.25em;
  margin-top: 0.5rem;
  padding: 0.1em 0.25em 0;
  text-decoration: none;
  text-transform: uppercase;
`;

const Icon = styled(FaTwitter)`
  font-size: 0.75em;
`;

export default ({ quote, retweetId = false }) => (
  <Box>
    <Text>{quote}</Text>

    <Location>
      {({ location }) => {
        // This is probably a too-clever trick to avoid using `let`. 😅
        const { intent, params } = retweetId
          ? {
              intent: 'retweet',
              params: new URLSearchParams({ tweet_id: retweetId }),
            }
          : {
              intent: 'tweet',
              params: new URLSearchParams({
                text: `“${quote}” –@jlengstorf`,
                url: location.href,
                related: 'jlengstorf',
              }),
            };

        return (
          <Link
            href={`https://twitter.com/intent/${intent}?${params.toString()}`}
          >
            <Icon /> Quote this on Twitter
          </Link>
        );
      }}
    </Location>
  </Box>
);
