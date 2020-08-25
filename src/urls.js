import React from 'react';
import withQuery from 'with-query';


export const urls = {
  login: (options) => {
    const baseUrl = '/login';
    return options ? withQuery(baseUrl, options) : baseUrl
  },
  dashboard: (options) => {
    const baseUrl = '/';
    return options ? withQuery(baseUrl, options) : baseUrl
  },
  kepler: (options) => {
    const baseUrl = '/kepler';
    return options ? withQuery(baseUrl, options) : baseUrl
  },
  dash_chart: (options) => {
    const baseUrl = '/dash_chart';
    return options ? withQuery(baseUrl, options) : baseUrl
  },
}


/**
 * HOC withURL
 * @param {*} Component 
 */
export const withUrls = (Component) => (props) => {
  return <Component urls={urls} {...props} />
}