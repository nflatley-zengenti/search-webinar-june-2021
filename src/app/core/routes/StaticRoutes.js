import Loadable from 'react-loadable';
import { Loading } from './Loading';

export default [
  {
    path: '/search/:facet?/:contentTypeId?',
    component: Loadable({
      loader: () => import('~/pages/Search/Search.page'),
      loading: Loading,
    }),
  },
];
