import { call } from 'redux-saga/effects';
import { setRouteFilters } from '@zengenti/contensis-react-base/search';
import { queryParams, routeParams } from '../util/navigation';

import transformations from '../../components/search/transformations';

export default {
  onRouteLoad: function* onRouteLoad({ path }) {
    // Set params for routing saga

    const preventScrollTop = path => {
      if (!path) return null;
      switch (true) {
        case path.includes('/products'):
        case path.includes('/blog'):
        case path.includes('/search'):
          return true;
        default:
          return false;
      }
    };

    return yield {
      customNavigation: {
        ancestors: true,
        children: true,
        siblings: false,
        tree: true,
      },

      preventScrollTop: preventScrollTop(path),
    };
  },
  onRouteLoaded: function* onRouteLoaded({
    path,
    // entry,
    location,
    staticRoute,
  }) {
    const params = {
      ...routeParams(staticRoute),
      ...queryParams(location?.search),
    };

    if (path.startsWith('/search')) {
      yield call(setRouteFilters, {
        mappers: transformations,
        params,
      });
    }
  },
};
