# observ-location

an observable `window.location.href`.

```
var ObservLocation = require('observ-location');
var location = ObservLocation();
var end = location(function (value) {
  console.log(value);
  t.end();
});
location.start();

// location.end() && end()
```
