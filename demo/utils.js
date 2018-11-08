String.prototype.format = function(args) {
  var result = this;
  if (arguments.length < 1) {
    return result;
  }

  var data = arguments;
  if (arguments.length == 1 && typeof (args) == "object") {
    data = args;
  }
  for (var key in data) {
    var value = data[key];
    if (undefined != value) {
      result = result.replace(new RegExp("\\{" + key + "\\}","g"), value);
    }
  }
  return result;
}

function rand() {
  return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}