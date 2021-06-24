import React from 'react';
import { SearchProps, withSearch } from '@zengenti/contensis-react-base/search';

import SearchStyled from '~/components/search/Search.styled';
import Region from '~/layout/Region';

import SearchCard, {
  Props as SearchCardProps,
} from '~/components/searchCard/SearchCard';
import Button from '~/components/button/Button';
import SearchInput from '~/components/searchInput/SearchInput';
import SearchFilters from '~/components/filters/Filters';
// import { SearchFacets } from '~/core/schema';
// import { BlogFilters } from './filters.config';
import { useSelector } from 'react-redux';
import { selectScreenSize } from '~/redux/ui/selectors';
import transformations from './transformations';
import PromotedContent from '~/components/promotedContent/PromotedContent';
import useExploreMore from '~/components/search/hooks/useExploreMore';
import useProductFilters from '~/components/search/hooks/useProductFilters';
import Card, { Props as CardProps } from '~/components/card/Card';

interface Props {
  className?: string;
}

// Using withSearch HoC decorator below will inject the SearchProps
// in addition to our component Props
const SearchContainer: React.FC<
  // Our 'results' prop will be of type SearchCardProps
  Props & SearchProps<SearchCardProps>
> = ({
  className,
  clearFilters,
  currentFacet,
  currentPageIndex,
  facets,
  featuredResults,
  filters,
  results,
  resultsInfo,
  searchTerm,
  updateCurrentFacet,
  updatePageIndex,
  updateSearchTerm,
  updateSelectedFilters,
}) => {
  const screenSize = useSelector(selectScreenSize);
  const isDesktop = screenSize >= 1024 ? true : false;
  // Populates 'Explore more' promo content if no main search results
  const exploreMore = useExploreMore(resultsInfo.hasResults);

  // Handles rendering different filters depending on the first selected filter option
  const productSearchFilters = useProductFilters(filters);

  // const hasResults = true;
  return (
    <SearchStyled className={className} noResults={!resultsInfo.hasResults}>
      <Region width="large" margin="none" padding="small">
        <h1 className="search__title">Search results</h1>
        <div className="search__header">
          <SearchFilters
            className="search__facets"
            clearFilters={() => clearFilters()}
            currentFacet={currentFacet}
            // Combining the Facets and Filter objects into one for mobile.
            filters={
              isDesktop ? facets : { ...facets, ...productSearchFilters }
            }
            updateCurrentFacet={facet => updateCurrentFacet(facet)}
            updateSelectedFilters={(f, v) => updateSelectedFilters(f, v)}
          />
          <SearchInput
            searchTerm={searchTerm}
            _func={term => updateSearchTerm(term)}
          />
        </div>
        <p
          className="search__results-info--text"
          dangerouslySetInnerHTML={{ __html: resultsInfo.resultsText }}
        >
          {/* Some text about the results we have found */}
        </p>
        <div className="search__results-wrapper">
          <div className="search__results">
            {results.map((result, idx) => (
              <SearchCard
                className="search__result-card"
                key={idx}
                title={result.title}
                imageUri={result.imageUri}
                imageAlt={result.imageAlt}
                price={result.price}
                text={result.text}
                type={result.type}
                uri={result.uri}
              />
            ))}
          </div>
          <>
            {isDesktop && resultsInfo.hasResults && (
              <SearchFilters
                className="search__filters"
                clearFilters={() => clearFilters()}
                currentFacet={currentFacet}
                filters={productSearchFilters}
                hasResetBtn={true}
                updateCurrentFacet={facet => updateCurrentFacet(facet)}
                updateSelectedFilters={(f, v) => updateSelectedFilters(f, v)}
              />
            )}
            {resultsInfo.hasResults && featuredResults.length > 0 && (
              <div className="search__featured-products">
                {featuredResults.slice(-2).map((featuredProduct, idx) => (
                  <Card
                    key={idx}
                    {...(featuredProduct as CardProps)}
                    path={'/search'}
                  />
                ))}
              </div>
            )}
          </>
        </div>
        {resultsInfo.hasLoadMore && (
          <Button
            className="search__load-more"
            type="button"
            label="Load more"
            icon="arrow-down"
            onClick={() => updatePageIndex(currentPageIndex + 1)}
            btnTheme="secondary"
            isHollow
          />
        )}
      </Region>
      {!resultsInfo.hasResults && (
        <PromotedContent
          className="search__explore-more"
          title="Explore more"
          results={exploreMore}
        />
      )}
    </SearchStyled>
  );
};

export default withSearch(transformations)(SearchContainer);
