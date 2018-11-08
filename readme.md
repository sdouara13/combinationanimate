#### CSS3 transform动画组

 安装：npm i --save combinationAnimate
 
 使用：webpack项目引入index.js， es5项目引入es5module.js
***
 配置选项： 
##### 初始化：new Creator(config)
###### 代码示例: 
* 链式拖动 drag.html
* 齿轮 gear.html
* 碰撞 collision.html

###### HTML:
```$xslt
<div class="block" id="a">A</div>
<div class="block" id="b">B</div>
<div class="block" id="c">C</div>
```
###### JS：
```$xslt
new Creator({
    list: [{
      targetA: document.getElementById('a') // 动画元素A,
      targetB: document.getElementById('b') // 动画元素B,
      type: 'matrix', // 若元素有多种变化属性，强调为特定类型，如matrix, rotate, translate, scale等
      effect: function (lastTransformA, transformA, transformB) {
        /**
        * @param { String } lastTransformA 变化前元素A的transform值
        * @param { String } transformA 变化后元素A的transform值
        * @param { String } transformB 被影响元素B的transform值
        * @param { Element } elementA 变化元素A
        * @param { Element } elementB 被影响元素B
        * @returns { String } 返回一个transform值
        */
      }
    },
      {
        targetA: document.getElementById('b'),
        targetB: document.getElementById('c'),
        type: 'matrix',
        effect: effect
      },
      ......
 
      ]
    })
    
// 调用
document.getElementById('a').animateFn("")
```