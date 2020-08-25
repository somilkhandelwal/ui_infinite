import log from './log';

export const loadAppState = () => {
  try {
    const jsonState = localStorage.getItem('applicationState');
    if (jsonState === null) return undefined;
    return { ...JSON.parse(jsonState) };
  } catch (error) {
    log.error('Failed to load local state', error);
    return undefined;
  }
};

export const storeAppState = (state) => {
  try {
    const jsonState = JSON.stringify(state || {});
    localStorage.setItem('applicationState', jsonState);
  } catch (error) {
    log.error('Failed to store local state', error);
  }
};
