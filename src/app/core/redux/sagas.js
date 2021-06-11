// Import feature sagas to be included with application startup
import { sagas as searchSagas } from '@zengenti/contensis-react-base/search';
import { UISagas } from '~/redux/ui/sagas';
import { LiveSearchSagas } from '~/redux/liveSearch/sagas';

const featureSagas = [...searchSagas, ...UISagas, ...LiveSearchSagas];

export default featureSagas;
