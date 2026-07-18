import { baseLayer, componentsLayer, overridesLayer, resetLayer } from './layers.css';

const inLayer =
  (layer: string) =>
  <T>(rule: T) => ({ '@layer': { [layer]: rule } });

export const inResetLayer = inLayer(resetLayer);
export const inBaseLayer = inLayer(baseLayer);
export const inComponentsLayer = inLayer(componentsLayer);
export const inOverridesLayer = inLayer(overridesLayer);
