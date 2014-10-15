var HistoryState = require('history-state');
var Observ = require('observ');
var window = require('global/window');
var debug = require('debug')("observ-location");

module.exports = ObservLocation;

function ObservLocation (options) {
  var history = HistoryState();

  // initial location observable
  var location = Observ(window.location.href);

  // on history state change
  history.on('change', function () {
    debug("history changed", window.location);

    // update location observable
    location.set(window.location.href);
  });

  // attach methods
  location.stop = stop(history);
  location.start = start(history);
  location.change = change(history);

  return location;
}

function start (history) {
  return function _observLocation_start () {
    debug("start history");
    history.start();
  };
};

function stop (history) {
  return function _observLocation_stop () {
    debug("stop history");
    history.stop();
  };
};

function change (history) {
  return function _observLocation_start (path) {
    debug("set history", path);
    history.change(path);
  };
};
