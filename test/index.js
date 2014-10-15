var test = require('tape');
var window = require('global/window');
var getIn = require('get-in');

var ObservLocation;

test("require module", function (t) {
  ObservLocation = require('../');
  t.ok(ObservLocation);
  t.is(typeof ObservLocation, 'function')
  t.end();
});

test("get location", function (t) {
  var location = ObservLocation();
  var unlisten = location(function (value) {
    t.equal(value, getIn(window, ['location', 'href']));
    end();
  });
  function end () {
    location.stop();
    unlisten();
    t.end();
  }
});
