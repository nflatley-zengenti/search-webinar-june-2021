import { Map, fromJS } from 'immutable';
import queryString from 'query-string';
import {
  selectors,
  SearchTransformations,
} from '@zengenti/contensis-react-base/search';

import { default as mapJson } from '~/core/util/json-mapper';
import { removeEmptyAttributes } from '~/core/util/helpers';
import { selectCurrentPath } from '~/core/redux/selectors';

const {
  getSelectedFilters,
  getSearchTerm,
  getSearchContext,
  getCurrentFacet,
  getCurrentListing,
} = selectors;

const searchUriTemplate = {
  // Set a custom path to trigger specific behaviour and
  // return a special uri pattern for certain filter combinations
  path: ({ state, facet }: any) => {
    const context = getSearchContext(state);
    const currentPath = selectCurrentPath(state) || '/search';
    const listing = getCurrentListing(state);

    if (context !== 'listings') {
      const currentFacet = facet || getCurrentFacet(state);

      // Get the Plant or Pot filter
      const filters = getSelectedFilters(state, facet, context).toJS();
      const currentFilter = filters.contentTypeId;

      // Check if we have a Plant or Pot filter first
      const newPath =
        currentFilter?.length > 0 && currentFacet
          ? `${currentPath}/${currentFacet}/${currentFilter}`
          : currentFacet
          ? `${currentPath}/${currentFacet}`
          : currentPath;

      return newPath;
    } else if (listing === 'productsListing') {
      const filters = getSelectedFilters(state, facet, context).toJS();

      const currentFilter = filters.contentTypeId;
      const newPath = currentFilter
        ? `${currentPath}/${currentFilter}`
        : currentPath;

      return newPath;
    } else {
      return currentPath;
    }
  },
  // Ensure we have the parameters we wish to include in the query
  // portion of the uri
  search: ({ state, facet, orderBy, pageIndex, term }: any) => {
    const searchContext = getSearchContext(state);
    // Get selected filters from state and map a keyed object
    // with all selected keys joined in comma-separated sting

    // We will lose any stateFilters and currentSearch if a new
    // term is supplied here
    const stateFilters = term
      ? Map<string, string>()
      : (getSelectedFilters(state, facet, searchContext).map((f: any) =>
          f.join(',')
        ) as Map<string, string>);

    // Ensure any other existing query parameters are preserved
    const currentSearch =
      !term && state.getIn(['routing', 'location', 'search']);
    const currentQs = removeEmptyAttributes(queryString.parse(currentSearch));

    // Add any set orderBy clause to the query string
    currentQs.orderBy = orderBy;

    // Delete these parameters as we do not want to see them in the uri
    const modifiedStateFilters = stateFilters.set('contentTypeId', '');

    // Add any search term to the query string
    const searchTerm = getSearchTerm(state);

    // Merge the search stateFilters with any current Qs
    // to build the new Qs.
    const mergedSearch = removeEmptyAttributes(
      fromJS(currentQs)
        .merge(modifiedStateFilters)
        .set('term', searchTerm)
        .toJS()
    );

    // Ensure pageIndex does not appear in the query string
    mergedSearch.pageIndex = undefined;

    // // Add pageIndex to the query string
    // if (pageIndex) mergedSearch.pageIndex = pageIndex + 1;
    // if (pageIndex === 0) mergedSearch.pageIndex = undefined;

    // Return the final query string
    return queryString.stringify(mergedSearch);
  },
  // If you are using the hash portion of the uri to return and read
  // any search parameters you would find and return them here
  hash: ({ state }: any) =>
    state.getIn(['routing', 'location', 'hash'], '#').replace('#', ''),
};

const mapStateToSearchUri: SearchTransformations['navigate'] = state =>
  mapJson(state, searchUriTemplate);

export default mapStateToSearchUri;
