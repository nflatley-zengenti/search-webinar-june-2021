import 'core-js';

// the entry point for the rest of the app
import ClientApp from '@zengenti/contensis-react-base/client';
import ReactApp from '~/App';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers';
import withSagas from '~/core/redux/sagas';
import withEvents from '~/core/redux/withEvents';

const config = {
  routes,
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
