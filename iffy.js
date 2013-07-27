(function(exports) {

  var iffy = exports;
  iffy.version = "0.0.1";

  iffy.fn = function(fn, context) {
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

})(typeof module === "undefined" ? this.iffy = {} : module.exports);
