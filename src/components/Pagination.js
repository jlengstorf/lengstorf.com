import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from '../styles/pagination.module.css';

const Pagination = ({
  isFirstPage,
  isLastPage,
  currentPage,
  totalPages,
  linkBase,
}) => (
  <div className={styles.pagination}>
    {!isFirstPage &&
      currentPage !== 2 && (
        <Link
          className={styles.paginationLink}
          to={linkBase}
          title="jump to newest posts"
        >
          « <span className="screen-reader-text">newest posts</span>
        </Link>
      )}
    {!isFirstPage && (
      <Link
        className={styles.paginationLink}
        to={`${linkBase}${currentPage - 1 === 1 ? '' : currentPage - 1}`}
      >
        ‹ newer posts
      </Link>
    )}
    {!isLastPage && (
      <Link
        className={`${styles.paginationLink} ${styles.paginationLinkMoveRight}`}
        to={`${linkBase}${currentPage + 1}`}
      >
        older posts ›
      </Link>
    )}
    {!isLastPage &&
      currentPage !== totalPages - 1 && (
        <Link
          className={styles.paginationLink}
          to={`${linkBase}${totalPages}`}
          title="jump to oldest posts"
        >
          <span className="screen-reader-text">oldest posts</span> »
        </Link>
      )}
  </div>
);

Pagination.propTypes = {
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  linkBase: PropTypes.string.isRequired,
};

export default Pagination;
