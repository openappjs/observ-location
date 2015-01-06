var HistoryState = require('history-state');
var window = require('global/window');
var debug = require('debug')("observ-location");
var getIn = require('get-in');

module.exports = ObservableLocation;

function ObservableLocation (options) {

  var listeners = [];
  var history = HistoryState(options);
  var location = getIn(window, ['location', 'href']);

  // start copied from https://github.com/Raynos/observ/blob/master/index.js
  observable._set = function (l) {
    location = l;

    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i](l);
    }
  }

  function observable(listener) {
    if (!listener) {
      return value;
    }

    // *
    // start history on the first listener
    if (listeners.length === 0) {
      history.start();
    }
    // *
    listeners.push(listener);

    return function remove() {
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          // *
          // stop history when we remove all the listeners
          if (listeners.length === 0) {
            history.stop();
          }
          // *
          break;
        }
      }
    }
  }
  // end copied

  // on history state change
  history.on('change', function () {
    debug("history changed", window.location);

    // update location observable
    observable._set(getIn(window, ['location', 'href']));
  });

  // attach methods
  observable.change = change(history);
  observable.set = set(history);

  return observable;
}

function change (history) {
  return function _observLocation_change (path) {
    debug("change history", path);
    history.change(path);
  };
};

function set (history) {
  return function _observLocation_set (path) {
    debug("set history", path);
    history.set(path);
  }
}
