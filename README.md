# observ-location

an observable `window.location.href`.

```
var ObservLocation = require('observ-location');
var location = ObservLocation();

var unlisten = location(function (value) {
  console.log(value);
});

var end = function (unlisten) {
  location.stop();
  unlisten();
}
```
