# iffy
A shorthand function generator for JavaScript.

## Browser
In the browser, just include iffy.js:

```html
<script src="path/to/iffy.js"></script>
<script>
var test = iffy.fn("foo > 1");
alert(test({foo: 2})); // alerts "true"
</script>
```

## Node.js
In node, just install with npm:

```sh
$ npm install iffy
```

Then require it:

```js
var iffy = require("iffy"),
    test = iffy.fn("foo > 1");

console.log(test({foo: 2})); // prints "true"
```
