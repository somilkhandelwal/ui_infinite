/* eslint-disable no-undef */
const debug = !(process.env.NODE_ENV === 'production');

// loggers, WIP
export default {
  error: (msg, error) => {
    window.console.log(msg, error);
  },
  debug: (msg, ...args) => {
    if (debug) window.console.log(msg, ...args);
  }
};
