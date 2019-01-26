import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { animation, colors } from '../config/styles';

const CatLink = styled(Link)`
  background-color: ${colors.text};
  border-radius: 1em;
  color: ${colors.lightest};
  line-height: 1;
  margin: ${({ block }) => (block ? '0.25rem' : 0)} 0.125rem 0;
  padding: 0.125rem 0.5rem 0.2rem;
  text-decoration: none;
  transition: background-color ${animation.transitionTime} linear;
  display: inline-block;

  & + & {
    margin-top: 0.125rem;
  }

  :focus,
  :hover,
  :active {
    background-color: ${colors.purple};
    border-radius: 1em;
  }
`;

const CategoryLink = React.memo(({ category, block = false }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            categories {
              slug
              name
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { categories },
      },
    }) => {
      const cat = categories.find(c => c.slug === category) || {};

      return (
        <CatLink to={`/blog/category/${category}`}>
          {cat.name ? cat.name : category}
        </CatLink>
      );
    }}
  />
));

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  block: PropTypes.bool,
};

export default CategoryLink;
