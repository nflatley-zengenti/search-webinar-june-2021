import React, { useState, useEffect } from 'react';

import BlogListingStyled from './BlogListing.styled';

import Card from '../card/Card';
import Filters from '../filters/Filters';
import Button from '../button/Button';
import NoResults from '../noResults/NoResults';
interface Props {
  results?: any;
  filters?: any;
  facets?: any;
  paging?: any;
  updateSelectedFilters: (filterGroupKey: string, key: string) => void;
  updatePageIndex: (ev: number) => void;
  updateCurrentFacet: () => void;
  clearFilters: () => void;
}

const BlogListing = ({
  results,
  filters,
  updateSelectedFilters,
  updatePageIndex,
  updateCurrentFacet,
  paging,
  clearFilters,
}: Props) => {
  const [windowOffset, setWindowOffset] = useState<number>(0);

  /* eslint-disable */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, windowOffset);
    }
  }, []);
  /* eslint-enable */

  const _handleLoadMore = (pageIndex: number) => {
    if (typeof window !== 'undefined') {
      setWindowOffset(window.pageYOffset);
    }
    updatePageIndex(pageIndex);
  };

  const { pageIndex, pageCount } = paging;
  const hasLoadMore =
    pageIndex === null || pageCount === null
      ? false
      : pageIndex < pageCount - 1;

  const hasResults = results && results.length >= 1;
  return (
    <BlogListingStyled>
      <Filters
        className="blog-listing__filters"
        filters={filters}
        updateSelectedFilters={updateSelectedFilters}
        updateCurrentFacet={updateCurrentFacet}
        clearFilters={clearFilters}
        hasResetBtn={true}
      />
      {hasResults && (
        <div className="blog-listing__results">
          {results.map((res: any, idx: number) => (
            <Card key={idx} {...res} className="blog-listing__result" />
          ))}
        </div>
      )}
      {!hasResults && (
        <NoResults
          className="blog-listing__no-results"
          title="No results found"
          text="Tellus sit pellentesque sit sed sed faucibus sit quam. Massa lorem vestibulum, non viverra interdum aliquam amet."
        />
      )}
      {hasLoadMore && (
        <Button
          className="blog-listing__load-more"
          type="button"
          label="Load more"
          icon="arrow-down"
          onClick={() => _handleLoadMore(pageIndex + 1)}
          btnTheme="secondary"
          isHollow
        />
      )}
    </BlogListingStyled>
  );
};

export default BlogListing;
