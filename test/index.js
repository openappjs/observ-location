var test = require('tape');
var window = require('../window');
var getIn = require('get-in');
var Url = require('url');

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
    unlisten();
    t.end();
  }
});

test("change location path", function (t) {
  var location = ObservLocation({
    pushState: true,
  });
  var origHref = window.location.href;
  var path = "/asdf";
  var unlisten = location(function (value) {
    t.equal(value, getIn(window, ['location', 'href']));
    t.equal(Url.parse(value).path, path);
    end();
  });
  location.change(path);
  function end () {
    unlisten();
    // reset location to original
    location.set(origHref);
    t.end();
  }
});

test("change location hash", function (t) {
  var location = ObservLocation({
    pushState: false,
    hash: true,
  });
  var origHref = window.location.href;
  var hash = "#asdf";
  var unlisten = location(function (value) {
    t.equal(value, getIn(window, ['location', 'href']));
    t.equal(Url.parse(value).hash, hash);
    end();
  });
  location.change(hash);
  function end () {
    unlisten();
    // reset location to original
    location.set(origHref);
    t.end();
  }
});
