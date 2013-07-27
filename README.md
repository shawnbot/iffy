# iffy
Iffy is a shorthand function generator for JavaScript. It's useful for defining simple

## Usage
Iffy generates usable functions from more readable, shorthand strings, like:

```
// return a single property of an object
iffy.fn("foo")
function(d) { return d.foo; }

// name your "data" argument:
iffy.fn("f(d) d.bar + 1")
function(d) { return d.bar + 1; }
  
// create a function that maps properties:
iffy.fn("f(d) {bar: d.baz}")
function(d) { return {bar: d.baz}; }
```

### Browser
In the browser, just include iffy.js:

```html
<script src="path/to/iffy.js"></script>
<script>
var test = iffy.fn("foo > 1");
alert(test({foo: 2}));
// alerts "true"
</script>
```

### Node.js
In node, just install with npm:

```
$ npm install iffy
```

Then require it:

```
var iffy = require("iffy"),
    test = iffy.fn("foo > 1");

console.log(test({foo: 2}));
// prints "true"
```

## Quirks
Iffy has some quirks. If you provide an argument name in any of the following forms:

* `f(d) <body>`
* `fn(d) <body>`
* `function(d) <body>`

Then the `<body>` portion of the function will simply be wrapped in curly braces and prepended with a `return` statement. In this form, you *must* prepend all of your property references with the name of your argument, e.g.:

```
iffy.fn("f(d) d.foo") // works
iffy.fn("f(d) foo") // will produce an error: 'foo is undefined'
```

However, if you don't provide an argument name, iffy will make one up (`d`) and rewrite your function body by prepending what it thinks are object properties with `d.`, e.g.:

```
iffy.fn("foo") // returns:
function(d) { return d.foo; }

iffy.fn("foo + bar") // returns
function(d) { return d.foo + d.bar; }

iffy.fn("parseFloat(baz)") // returns
function(d) { return parseFloat(d.baz); }
```

Iffy assumes any string of word characters (`/(\w+)/`) *not preceded by a dot* `.` *or followed by a parenthesis* `(` to be an object property. This covers most cases, but if you want to be sure that your function does the right thing, just provide the argument name using one of the forms above.