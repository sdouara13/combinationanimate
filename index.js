const TYPE = {
  "matrix": "matrix(1, 0, 0, 1, 0, 0)",
  "rotate": "rotate(0deg)",
  "translate": "translate(0, 0)",
}
export class Creator {
  constructor(config) {
    const { list } = config;
    this.id = 0;
    this.relationMap = new Map();
    list.forEach((item)=> {
      const {targetA, targetB, effect} = item;
      this.addLink(targetA, targetB, effect);
      this.addLink(targetB, targetA, effect);
    });

    this.relationMap.forEach(item => {
      const { center, affected } = item;
      center.animateFn = (transform, ignore) => {
        const oldTransform = center.style.transform;
        center.style.transform = transform;
        affected.forEach((obj) => {
          const {dom, event} = obj;
          if(dom === ignore) {
            return;
          }
          const change = event(oldTransform || TYPE[config.type], transform, dom.style.transform || self.getStyle(dom, "transform"), center, dom);
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
  destroy() {
    this.relationMap.forEach(item => {
      const { center, affected } = item;
      if (center.animateFn) {
        center.animateFn = undefined;
      }
      affected.length = 0;
    })
    this.relationMap.clear();
    this.relationMap = undefined;
  }
  addLink(targetA, targetB, effect) {
    if (!targetA.dataset['mapId']) {
      targetA.dataset['mapId'] = this.id++;
      this.relationMap.set(targetA.dataset['mapId'], {
        center: targetA,
        affected: [{
          dom: targetB,
          event: effect
        }]
      })
    } else {
      const link = this.relationMap.get(targetA.dataset['mapId']);
      link.affected.push({
        dom: targetB,
        event: effect
      })
    }
  }
  getStyle(obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
  }

}