import { call } from 'redux-saga/effects';
import { setRouteFilters } from '@zengenti/contensis-react-base/search';
import { queryParams, routeParams } from '../util/navigation';

import transformations from '~/search/transformations';

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
    // Collect runtime parameters from the uri
    const params = {
      ...routeParams(staticRoute),
      ...queryParams(location?.search),
    };

    // Trigger the search if we are at the /search route
    if (path.startsWith('/search')) {
      // call the imported redux saga
      // supply mappers and params to use for this route
      yield call(setRouteFilters, {
        mappers: transformations,
        params,
      });
    }
  },
};
