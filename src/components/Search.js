import React, { useState } from 'react';
import styled from 'react-emotion';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  connectHits,
  connectSearchBox,
  InstantSearch,
  Highlight,
} from 'react-instantsearch-dom';
import { MdSearch } from 'react-icons/md';
import { colors } from '../config/styles';

const client = algoliasearch('DXGPUQEB2T', 'f8919355b533de3d1337ad802ca61f4c');

const SearchArea = styled('div')`
  background: ${colors.lightestAlpha};
  height: 100vh;
  left: 0;
  margin-top: 0;
  overflow-y: scroll;
  padding: 3rem 5%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
`;

const List = styled('ul')`
  list-style: none;
  margin: 0 auto;
  max-width: 550px;
  padding: 0;
`;

const Result = styled('li')`
  margin-top: 2rem;
`;

const Heading = styled('h2')`
  font-size: 1.25rem;
  font-weight: 600;

  a {
    color: ${colors.heading};
    text-decoration: none;

    :active,
    :focus,
    :hover {
      color: ${colors.lightest};
    }
  }
`;

const Link = styled('a')`
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
`;

const Hits = connectHits(({ hits }) => (
  <List>
    {hits.map(hit => (
      <Result key={hit.objectID}>
        <Heading>
          <a href={`/${hit.slug}`}>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </a>
        </Heading>
        <p>
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </p>
        <Link href={`/${hit.slug}`}>Read this post &rsaquo;</Link>
      </Result>
    ))}
  </List>
));

const Icon = styled(MdSearch)`
  color: ${colors.heading};
`;
const Input = styled('input')`
  border: 2px solid ${colors.textLight};
  border-radius: 4px;
  display: block;
  margin: 0 auto;
  max-width: 550px;
  width: 100%;
`;

const Search = connectSearchBox(({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <label htmlFor="search">
      <span className="screen-reader-text">Search the Blog</span>
      <Input
        type="search"
        id="search"
        value={currentRefinement}
        onBlur={() => {
          if (currentRefinement === '') {
            setActive(false);
          }
        }}
        onChange={event => {
          setActive(true);
          refine(event.currentTarget.value);
        }}
      />
    </label>
  </form>
));

const SearchContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  margin-top: 0;
`;

export default () => {
  const [active, setActive] = useState(false);

  return (
    <InstantSearch
      searchClient={client}
      indexName="lengstorf-blog"
      root={{ Root: SearchContainer }}
    >
      <Configure distinct={1} />
      <Icon onClick={() => setActive(true)} />
      {active && (
        <SearchArea>
          <Search setActive={setActive} />
          <Hits />
        </SearchArea>
      )}
    </InstantSearch>
  );
};
