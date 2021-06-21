import React from 'react';
import { SearchProps } from '@zengenti/contensis-react-base/search';

import SearchStyled from '~/components/search/Search.styled';
import Region from '~/layout/Region';

import SearchCard, {
  Props as SearchCardProps,
} from '~/components/searchCard/SearchCard';
import Button from '~/components/button/Button';
import SearchInput from '~/components/searchInput/SearchInput';
import SearchFilters from '~/components/filters/Filters';
import { SearchFacets } from '~/core/schema';
import { BlogFilters } from './filters.config';
import { useSelector } from 'react-redux';
import { selectScreenSize } from '~/redux/ui/selectors';

interface Props {
  className?: string;
}

// Using withSearch HoC decorator below will inject the SearchProps
// in addition to our component Props
const SearchContainer: React.FC<
  // Our 'results' prop will be of type SearchCardProps
  Props & SearchProps<SearchCardProps>
> = ({ className }) => {
  const screenSize = useSelector(selectScreenSize);
  const isDesktop = screenSize >= 1024 ? true : false;

  const hasResults = true;

  return (
    <SearchStyled className={className} noResults={false}>
      <Region width="large" margin="none" padding="small">
        <h1 className="search__title">Search results</h1>
        <div className="search__header">
          <SearchFilters
            className="search__facets"
            clearFilters={() => alert('clearFilters')}
            currentFacet={SearchFacets.all}
            // Combining the Facets and Filter objects into one for mobile.
            filters={{
              [SearchFacets.all]: {
                title: 'Facet title',
                queryParams: {},
                pagingInfo: { totalCount: 999 },
              },
              [SearchFacets.blog]: {
                title: 'Other facet',
                queryParams: {},
                pagingInfo: { totalCount: 999 },
              },
              ...(isDesktop ? {} : BlogFilters),
            }}
            updateCurrentFacet={facet => alert('updateCurrentFacet: ' + facet)}
            updateSelectedFilters={(f, v) =>
              alert('updateSelectedFilters: ' + f + v)
            }
          />
          <SearchInput
            searchTerm={'searchTerm'}
            _func={term => alert('updateSearchTerm: ' + term)}
          />
        </div>
        <p
          className="search__results-info--text"
          // dangerouslySetInnerHTML={{ __html: resultsText }}
        >
          Some text about the results we have found
        </p>
        <div className="search__results-wrapper">
          <div className="search__results">
            <SearchCard
              className="search__result-card"
              key={0}
              title="Search result"
              imageUri="http://preview.leif.zenhub.contensis.cloud/image-library/product-images/pot-images/gra-pot.x9a94e535.jpg?w=400&h=280"
              imageAlt="Thumbnail alt. text"
              price={[9.99]}
              text="Space for some descriptive text about the resource retrieved via the search"
              type="product"
              uri="https://www.google.com"
            />
          </div>
          {isDesktop && hasResults && (
            <SearchFilters
              className="search__filters"
              clearFilters={() => alert('clearFilters')}
              currentFacet={SearchFacets.all}
              filters={BlogFilters}
              hasResetBtn={true}
              updateCurrentFacet={facet =>
                alert('updateCurrentFacet: ' + facet)
              }
              updateSelectedFilters={(f, v) =>
                alert('updateSelectedFilters: ' + f + v)
              }
            />
          )}
          <div className="search__featured-products"></div>
        </div>
        <Button
          className="search__load-more"
          type="button"
          label="Load more"
          icon="arrow-down"
          onClick={() => alert('updatePageIndex: currentPageIndex + 1')}
          btnTheme="secondary"
          isHollow
        />
      </Region>
    </SearchStyled>
  );
};

export default SearchContainer;
