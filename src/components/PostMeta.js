import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import CategoryLink from './CategoryLink';
import TagLink from './TagLink';
import { colors, media } from '../config/styles';

const Wrapper = styled('aside')`
  color: ${colors.gray};
  display: none;
  font-size: 0.625rem;
  text-align: center;

  @media ${media.large} {
    display: block;
  }
`;

const StickyContainer = styled('div')`
  @media ${media.large} {
    @supports (position: sticky) {
      position: sticky;
      top: 5rem;
    }
  }
`;

const Image = styled(Img)`
  display: block;
  border: 1px solid ${colors.grayAlpha};
`;

const Text = styled('p')`
  margin-top: 0.75rem;
`;

const PostMeta = ({ thumb, categories, tags, className }) => (
  <Wrapper className={className}>
    <StickyContainer>
      <Image
        style={{ display: 'inherit' }}
        alt="Jason Lengstorf."
        fluid={thumb.fluid}
      />
      <Text>Posted in:</Text>
      {categories.map(category => (
        <CategoryLink key={`category-${category}`} category={category} block />
      ))}
      <Text>Tags:</Text>
      {tags.map(tag => (
        <TagLink key={`tag-${tag}`} tag={tag} />
      ))}
      <Text>
        If you want to get more posts like this,{' '}
        <Link to="/newsletter">join my newsletter</Link>.
      </Text>
    </StickyContainer>
  </Wrapper>
);

PostMeta.propTypes = {
  className: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumb: PropTypes.shape({
    fluid: PropTypes.any,
  }).isRequired,
};

export default PostMeta;
