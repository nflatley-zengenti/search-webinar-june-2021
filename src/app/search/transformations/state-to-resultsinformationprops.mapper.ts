import {
  SearchTransformations,
  selectors,
} from '@zengenti/contensis-react-base/search';
import mapJson from '~/core/util/json-mapper';

const { getPaging, getResults, getSearchTerm } = selectors;

// Helper functions to save repetition
const pagingInfo = (state: any) => getPaging(state).toJS();

// The mapper object
const resultsInfoTemplate = {
  hasLoadMore: (state: any) => {
    const { pageIndex, pageCount } = pagingInfo(state);
    const hasLoadMore =
      pageIndex === null || pageCount === null
        ? false
        : pageIndex < pageCount - 1;
    return hasLoadMore;
  },
  hasResults: (state: any) => getResults(state).size > 0,
  noResultsText: () => ({
    title: 'Sorry, nothing matches your search',
    text: 'Try resetting any filters, checking for typos, or adjusting your search term.',
  }),
  resultsText: (state: any) => {
    const { pagesLoaded = [], pageSize, totalCount } = pagingInfo(state);
    // Work out the start and end position of the returned results in relation to the full search
    const start = pagesLoaded?.[0] * pageSize + 1;
    let end = start + pagesLoaded.length * pageSize - 1;

    if (end > totalCount) end = totalCount;

    // Render a meaningful message if we have results
    if (totalCount > 0) {
      const term = getSearchTerm(state);
      return `Showing <span>${start}-${end} of ${totalCount}</span> results${
        !term ? '.' : ''
      } ${term && `for <span>'${term}'</span>.`}`;
    }
  },
};

const mapStateToResultsInformation: SearchTransformations['resultsInfo'] =
  state => mapJson(state, resultsInfoTemplate);

export default mapStateToResultsInformation;
