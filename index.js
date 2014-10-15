var HistoryState = require('history-state');
var Observ = require('observ');
var window = require('global/window');
var debug = require('debug')("observ-location");
var getIn = require('get-in');

module.exports = ObservLocation;

function ObservLocation (options) {
  var history = HistoryState();

  // initial location observable
  var location = Observ(getIn(window, ['location', 'href']));

  // save Observ#set for later
  location._set = location.set;

  // on history state change
  history.on('change', function () {
    debug("history changed", window.location);

    // update location observable
    location._set(getIn(window, ['location', 'href']));
  });

  // attach methods
  location.stop = stop(history);
  location.start = start(history);
  location.change = change(history);
  location.set = set(history);

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
