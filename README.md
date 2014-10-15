# observ-location

an observable `window.location.href`.

wraps [history-state](https://github.com/michaelrhodes/history-state).

```
var ObservLocation = require('observ-location');
var location = ObservLocation();

var unlisten = location(function (value) {
  console.log(value);
});
```
