if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (cb) {
    for(var i = 0; i < this.length; i ++) {
      cb(this[i], i);
    }
  }
}

var Creator = function (config) {
  var TYPE = {
    "matrix": "matrix(1, 0, 0, 1, 0, 0)",
    "rotate": "rotate(0deg)",
    "translate": "translate(0, 0)",
  }
  var list = config.list;
  var self = this;
  this.id = 0;
  this.relationMap = [];
  this.getStyle = function(obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
  }
  this.destroy = function() {
    this.relationMap.forEach(function (item) {
      var center = item.center;
      var affected = item.affected;
      if (center.animateFn) {
        center.animateFn = undefined;
      }
      affected.length = 0;
    })
    this.relationMap.length = 0;
    this.relationMap = undefined;
  },
    this.addLink = function(targetA, targetB, effect) {
      if (!targetA.dataset['mapId']) {
        targetA.dataset['mapId'] = this.id++;
        this.relationMap[targetA.dataset['mapId']] = {
          center: targetA,
          affected: [{
            dom: targetB,
            event: effect
          }]
        }
      } else {
        var link = this.relationMap[targetA.dataset['mapId']];
        link.affected.push({
          dom: targetB,
          event: effect
        })
      }
    }

  list.forEach(function(item) {
    var targetA = item.targetA;
    var targetB = item.targetB;
    var effect = item.effect;

    self.addLink(targetA, targetB, effect);
    self.addLink(targetB, targetA, effect);
  });
  this.relationMap.forEach(function(item) {
    var center = item.center;
    var affected = item.affected;
    center.animateFn = function(transform, ignore) {
      var oldTransform = center.style.transform;
      center.style.transform = transform;
      affected.forEach(function(obj) {
        var dom = obj.dom;
        var event = obj.event;
        if(dom === ignore) {
          return;
        }
        var change = event(oldTransform || TYPE[config.type], transform, dom.style.transform || self.getStyle(dom, "transform"), center, dom);
        if (change) {
          dom.style.transform = change;
          if(dom.animateFn) {
            dom.animateFn(dom.style.transform, center);
          }
        }

      })
    }
  })





}