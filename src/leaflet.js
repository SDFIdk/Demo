import { createTranslator } from '../../saul/modules/saul-projection';

const translator = createTranslator('EPSG:25832', 'WGS84')

export { default as proj4 } from 'proj4';
export { GSearchUI } from '@dataforsyningen/gsearch-ui';

export { translator } 
