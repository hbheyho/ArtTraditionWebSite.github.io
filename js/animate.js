var box=document.getElementById('box');
var arr=document.getElementById('arr');
var left=document.getElementById('left');
var right=document.getElementById('right');
var screen=box.children[0];
var ul=screen.children[0];
var ol=screen.children[1];
var lis=ul.children;
        for(var i=0;i<lis.length;i++){
            var li=document.createElement('li');
            li.index=i;
            li.onclick=liclick;
            if(i==0){
                li.className='current';
            }
            ol.appendChild(li);
        }
        var liwidth=screen.offsetWidth;
        //点击切换图片
        function liclick(){
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            this.className='current';
            index=this.index;
            animate(ul, -index * liwidth);
        }
        //划入显示箭头
        box.onmouseenter=function(){
            arr.style.display='block';
            clearInterval(move);
        }
        box.onmouseleave=function(){
            arr.style.display='none';
            move=setInterval(function(){
                right.click();
            },5000)
        }
        var index=0;
        left.onclick=function(){
            // 如果当前是第一张图片，此时要偷偷的切换到最后一张图片的位置（克隆的第一张图片）
            if (index === 0) {
                index = lis.length-1;
                ul.style.left = - index * liwidth + 'px';
            }
            index--;
            ol.children[index].click();
        }
        right.onclick=function(){
            // 判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
            if (index === lis.length-1) {
                ul.style.left = '0px';
                index = 0;
            }
            index++;
            if (index < lis.length-1) {
                ol.children[index].click();
            } else {
                //如果是最后一张图片 以动画的方式，移动到克隆的第一张图片
                animate(ul, -index * liwidth);
                for (var i = 0; i < ol.children.length; i++) {
                    var li = ol.children[i];
                    li.className = '';
                }
                ol.children[0].className = 'current';
            }
        }//克隆第一个图
        var first=ul.children[0];
        var cloneli=first.cloneNode(true);
        ul.appendChild(cloneli);
        //自动轮播
        var move=setInterval(function(){
            right.click();
        },5000)
// 封装动画的函数
function animate(element, target) {
   // 通过判断，保证页面上只有一个定时器在执行动画
  if (element.timerId) {
    clearInterval(element.timerId);
    element.timerId = null;
  }

  element.timerId = setInterval(function () {
    // 步进  每次移动的距离
    var step = 10;
    // 盒子当前的位置
    var current = element.offsetLeft;

    // 判断如果当前位置 > 目标位置 此时的step  要小于0
    if (current > target) {
      step = - Math.abs(step);
    }

    // Math.abs(current - target)   <= Math.abs(step)
    if (Math.abs(current - target)   <= Math.abs(step)) {
      // 让定时器停止
      clearInterval(element.timerId);
      // 让盒子到target的位置
      element.style.left = target + 'px';
      return;
    }
    // 移动盒子
    current += step;
    element.style.left = current + 'px';
  }, 5);
}
