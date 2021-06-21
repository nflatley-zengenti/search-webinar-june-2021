import { SearchConfig } from '@zengenti/contensis-react-base/search';
import { ContentTypes, SearchFacets } from '~/core/schema';

export default {
  tabs: [{ id: 0, label: '' }],
  facets: {
    [SearchFacets.all]: {
      title: 'All results',
      queryParams: {
        contentTypeIds: [
          ContentTypes.blog,
          ContentTypes.contentPage,
          ContentTypes.landingPage,
          ContentTypes.plant,
          ContentTypes.pot,
        ],
        loadMorePaging: true,
        pageSize: 10,
      },
    },
  },
} as SearchConfig;
