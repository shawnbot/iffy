(function(iffy) {

  iffy.version = "0.1.0";

  iffy.fn = function(fn) {
    if (typeof fn === "function") return fn;
    var match = String(fn).trim().match(/^((f|fn|function)\(([^\)]+)\))?\s*(return\s)?(.+)$/);
    if (match) {
      var args = match[3],
          body = match[5];
      if (!args) {
        var d = args = "d";
        // ignore functions
        body = body.replace(/(.)\b(\w+)\b(.)/g, function(str, prev, key, next) {
          return prev === "." || next === "(" || key === "this"
            ? [prev, key, next].join("")
            : prev + [d, key].join(".") + next;
        });
      }
      return new Function(args, "return " + body + ";");
    } else {
      throw "Parse error";
    }
  };

  if (typeof module !== "undefined") {
    var Contextify = require("Contextify");

    iffy.expr = function(expr, globals) {
      return function(d) {
        var context = {
          d: d,
          arguments: arguments
        };
        for (var key in d) {
          if (key.match(/^\w+$/)) {
            context[key] = d[key];
          }
        }
        return Contextify(d).run(expr);
      };
    };
  }

})(typeof module === "undefined" ? this.iffy = {} : module.exports);
