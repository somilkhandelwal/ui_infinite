import { fetch } from 'cross-fetch';
// import settings from '../../config/settings';
// import log from '../log';

const isJson = response => (
  (response.headers.get('content-type') || '').indexOf('application/json') !== -1
);

const parseError = error => ({ error: `${'Backend_ParseError'}: ${error}` });

const fetchResponseError = (response, errorHandler) => {
  const safeError = errorHandler || (() => { });

  // if response was JSON
  if (!isJson(response)) {
    safeError({ error: `${'Backend_Error'}: ${response.statusText}` }, response.status);
    return;
  }

  response.json().then(
    json => safeError(json, response.status),
    error => safeError(parseError(error))
  );
};

const fetchError = (error, errorHandler) => {
  let errors = { error: `${'Backend_Error'}: ${error.statusText}` };
  if (error.name === 'AbortError') {
    errors = { ...errors, isAbort: true };
  }
  errorHandler(errors, error.status);
};

const fetchSuccess = (spec, response, handler, errorHandler) => {
  const safeHandler = handler || (() => { });
  const safeError = errorHandler || (() => { });

  if (spec.responseParser) {
    spec.responseParser(response).then(
      data => safeHandler(data),
      error => safeError(parseError(error))
    );
    return;
  }

  if (isJson(response)) {
    response.json().then(
      json => safeHandler(spec.jsonReducer ? spec.jsonReducer(json) : json),
      error => safeError(parseError(error))
    );
    return;
  }

  // if server doesn't return JSON with OK request,
  // we just callback with response object itself
  safeHandler(response);
};

// Raw (unauthenticated) call wrapper for cross-fetch.
// Spec is structure:
// * url - url to call, will be settings.apihost prefixed
// * options - passed to fetch()
// * responseParser - optional Promise to work on response
// * jsonReducer - optional function to reduce response json
const apiCall = (spec, onSuccess, onFail) => {
  // spec MUST have url property
  if (!spec || !spec.url) {
    // log.error('rawApiCall requested without URL');
    throw new Error('Invalid raw API call');
  }

  const options = spec.options || {};
  const url = `${spec.url}`;

  if (options.noContentType) {
    options.headers = Object.assign({}, options.headers || {});
  } else {
    options.headers = Object.assign({
      'Content-Type': 'application/json'
    }, options.headers || {});
  }

//   if (spec.token) {
//     options.headers.Authorization = `Bearer ${spec.token}`;
//   }

//   if (spec.language) {
//     options.headers['X-Language'] = spec.language;
//   }

//   log.debug('APICALL: about to send', url, options.method, options.body);

  return fetch(url, options).then(
    response => (
      response.ok
        ? fetchSuccess(spec, response, onSuccess, onFail)
        : fetchResponseError(response, onFail)
    ),
    error => fetchError(error, onFail)
  );
};

export default apiCall;
