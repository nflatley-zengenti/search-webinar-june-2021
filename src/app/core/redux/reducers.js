// Import feature reducers to be included with application startup
import { reducer as SearchReducer } from '@zengenti/contensis-react-base/search';
import config from '~/search/config/search.config';
import UIReducers from '~/redux/ui/reducers';
import MenuReducers from '~/redux/menu/reducers';
import liveSearchReducers from '~/redux/liveSearch/reducers';

const featureReducers = {
  search: SearchReducer(config),
  ui: UIReducers,
  menu: MenuReducers,
  liveSearch: liveSearchReducers,
};

export default { ...featureReducers };
