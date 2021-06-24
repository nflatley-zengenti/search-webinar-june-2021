import mapEntriesToResults from './entry-to-card-props.mapper';
import mapStateToResultsInformation from './state-to-resultsinformationprops.mapper';
import mapStateToSearchUri from './state-to-searchuri';

export default {
  results: mapEntriesToResults,
  resultsInfo: mapStateToResultsInformation,
  navigate: mapStateToSearchUri,
};
