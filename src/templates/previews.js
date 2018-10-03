import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import CategoryLink from '../components/CategoryLink';
import TagLink from '../components/TagLink';
import Pagination from '../components/Pagination';
import config from '../config';
import styles from '../styles/blog.module.css';

const getHeading = (isFirstPage, currentPage, totalPages, type, value) => {
  if (type === 'category' && value) {
    return `Posts in the category “${config.categories[value].display ||
      value}”`;
  }

  if (type === 'tag' && value) {
    return `Posts tagged with “${value}”`;
  }

  if (type === 'all' && isFirstPage) {
    return 'Latest Blog Posts';
  }

  return `Blog Posts, page ${currentPage} of ${totalPages}`;
};

const Previews = ({
  pageContext: {
    postGroup,
    isFirstPage,
    isLastPage,
    currentPage,
    totalPages,
    linkBase,
    type,
    value,
  },
}) => (
  <Layout title="Blog">
    <h1 className={styles.previewPageHeading}>
      {getHeading(isFirstPage, currentPage, totalPages, type, value)}
    </h1>
    {postGroup.map(({ node: { id, childMarkdownRemark: post } }) => (
      <section key={id} className={styles.preview}>
        <h2 className={styles.previewHeading}>
          <Link className={styles.link} to={`/${post.frontmatter.slug}`}>
            {post.frontmatter.title}
          </Link>
        </h2>
        <div className={styles.categoryList}>
          {post.frontmatter.category.map(category => (
            <CategoryLink key={`category-${category}`} category={category} />
          ))}
        </div>
        <p className={styles.excerpt}>{post.frontmatter.description}</p>
        {post.frontmatter.tag.map(tag => (
          <TagLink key={`tag-${tag}`} tag={tag} />
        ))}
        <Link className={styles.readMore} to={`/${post.frontmatter.slug}`}>
          Read post ›
        </Link>
      </section>
    ))}

    <Pagination
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      currentPage={currentPage}
      totalPages={totalPages}
      linkBase={linkBase}
    />
  </Layout>
);

Previews.propTypes = {
  pageContext: PropTypes.shape({
    postGroup: PropTypes.any,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
  }).isRequired,
};

export default Previews;
