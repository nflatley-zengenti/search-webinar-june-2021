import { SearchConfig } from '@zengenti/contensis-react-base/search';
import {
  BaseFields,
  BlogFields,
  ContentFields,
  ContentTypes,
  ProductFields,
  SearchFacets,
} from '~/core/schema';
import { BlogFilters, ProductFilters } from './filters.config';
import { WeightedFields } from './weightedFields.config';

export default {
  tabs: [{ id: 0, label: '' }],
  facets: {
    [SearchFacets.all]: {
      title: 'All results',
      projectId: 'leif',
      queryParams: {
        loadMorePaging: true,
        contentTypeIds: [
          ContentTypes.blog,
          ContentTypes.contentPage,
          ContentTypes.landingPage,
          ContentTypes.plant,
          ContentTypes.pot,
        ],
        featuredResults: {
          contentTypeId: [ContentTypes.plant, ContentTypes.pot],
          count: 3,
          fieldId: 'tags.entryTitle',
          fieldValue: 'promoted',
        },
        fields: [
          ...BaseFields,
          ...BlogFields,
          ...ProductFields,
          ...ContentFields,
        ],
        linkDepth: 1,
        pageSize: 10,
        weightedSearchFields: [...WeightedFields],
      },
      filters: {},
    },
    [SearchFacets.blog]: {
      title: 'Blogs',
      queryParams: {
        loadMorePaging: true,
        contentTypeIds: [ContentTypes.blog],
        fields: [...BaseFields, ...BlogFields],
        pageSize: 10,
        weightedSearchFields: [...WeightedFields],
      },
      filters: BlogFilters,
    },
    [SearchFacets.product]: {
      title: 'Product',
      queryParams: {
        loadMorePaging: true,
        contentTypeIds: [ContentTypes.plant, ContentTypes.pot],
        fields: [...BaseFields, ...ProductFields],
        pageSize: 10,
        weightedSearchFields: [...WeightedFields],
      },
      filters: ProductFilters,
    },
  },
  minilist: {
    exploreMore: {
      title: 'Explore more',
      queryParams: {
        contentTypeIds: [
          ContentTypes.blog,
          ContentTypes.contentPage,
          ContentTypes.landingPage,
          ContentTypes.plant,
          ContentTypes.pot,
        ],
        fields: [
          ...BaseFields,
          ...BlogFields,
          ...ProductFields,
          ...ContentFields,
        ],
        orderBy: ['-sys.version.published'],
        pageSize: 4,
        customWhere: [
          {
            field: 'tags.entryTitle',
            equalTo: 'promoted',
          },
        ],
      },
    },
  },
} as SearchConfig;
