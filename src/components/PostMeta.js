import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import CategoryLink from './CategoryLink';
import TagLink from './TagLink';
import styles from '../styles/post-meta.module.css';

const PostMeta = ({ thumb, categories, tags, className }) => (
  <aside className={`${className} ${styles.wrapper}`}>
    <div className={styles.stickyContainer}>
      <Img
        className={styles.image}
        style={{ display: `inherit` }}
        alt="Jason Lengstorf."
        sizes={thumb.sizes}
      />
      <p className={styles.text}>Posted in:</p>
      {categories.map(category => (
        <CategoryLink key={`category-${category}`} category={category} block />
      ))}
      <p className={styles.text}>Tags:</p>
      {tags.map(tag => <TagLink key={`tag-${tag}`} tag={tag} />)}
      <p className={styles.text}>
        If you want to get more posts like this,{' '}
        <Link to="/newsletter">join my newsletter</Link>.
      </p>
    </div>
  </aside>
);

PostMeta.propTypes = {
  className: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumb: PropTypes.shape({
    sizes: PropTypes.any,
  }).isRequired,
};

export default PostMeta;
