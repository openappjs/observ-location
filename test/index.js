var test = require('tape');

var ObservLocation;

test("require module", function (t) {
  ObservLocation = require('../');
  t.ok(ObservLocation);
  t.is(typeof ObservLocation, 'function')
  t.end();
});

test("simple location", function (t) {
  var location = ObservLocation();
  var end = location(function (value) {
    console.log(value);
    t.end();
  });
  location.start();
});
