import Loadable from 'react-loadable';
import { Loading } from './Loading';

import mapJson from '../../core/util/json-mapper';

// Mappings
import { homepageHeroProps } from '../../pages/Home/transformations/homepage.entry-to-props.mapper';

export default [
  {
    contentTypeID: 'homepage',
    component: Loadable({
      loader: () => {
        return import('~/pages/Home/Home.page');
      },
      loading: Loading,
    }),
    linkDepth: 1,
    entryMapper: ({ entry }) => mapJson(entry, homepageHeroProps),
  },
];
