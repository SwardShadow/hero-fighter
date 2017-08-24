/**
 * Created by Administrator on 2017/6/21.
 */
//根据id值的属性的值，获取某个元素（标签）---返回值就是该元素
function my$(id) {
  return document.getElementById(id);
}
//能力检测
//设置任意一个元素的文本内容
function setInnerText(element, text) {
  //该属性在浏览器中不支持
  if (typeof element.textContent == "undefined") {
    element.innerText = text;
  } else {
    //浏览器支持
    element.textContent = text;
  }
}
//获取任意一个元素的文本内容
function getInnerText(element) {
  if (typeof element.textContent == "undefined") {
    return element.innerText;
  } else {
    return element.textContent;
  }
}
//获取年月日
function getDates(dt) {
  var str = "";//存储时间的字符串
  //获取年
  var year = dt.getFullYear();
  //获取月
  var month = dt.getMonth() + 1;
  //获取日
  var day = dt.getData();
  //获取小时
  var hour = dt.getHours();
  //获取分钟
  var min = dt.getMinutes();
  //获取秒
  var sec = dt.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  str = year + "年" + month + "月" + day + "日" + "hour" + ":" + min + ":" + sec;
  return str;
}
//获取当前元素前一个元素
function getPreviousElement(element) {
  if (element.previousElementSibling) {
    return element.previousElementSibling;
  } else {
    var ele = element.previousSibling;
    while (ele && ele.nodeType !== 1) {
      ele = ele.previousSibling;
    }
    return ele;
  }
}
//获取当前元素的后一个元素
function getNextElement(element) {
  if (element.nextElementSibling) {
    return element.nextElementSibling;
  } else {
    var ele = element.nextSibling;
    while (ele && ele.nodeType !== 1) {
      ele = ele.nextSibling;
    }
    return ele;
  }
}

//获取父元素中的第一个元素
function getFirstElementByParent(parent) {
  if (parent.firstElementChild) {
    return parent.firstElementChild;
  } else {
    var ele = parent.firstChild;
    while (ele && ele.nodeType !== 1) {
      ele = ele.nextSibling;
    }
    return ele;
  }
}
//获取父元素中的最后一个元素
function getLastElementByParent(parent) {
  if (parent.lastElementChild) {
    return parent.lastElementChild;
  } else {
    var ele = parent.lastChild;
    while (ele && ele.nodeType !== 1) {
      ele = ele.previousSibling;
    }
    return ele;
  }
}

//获取兄弟元素
function getSiblings(ele) {
  if (!ele)return;//判断当前的ele这个元素是否存在
  var elements = [];//定义数组的目的就是存储当前这个元素的所有的兄弟元素
  var el = ele.previousSibling;//当前元素的前一个节点
  while (el) {
    if (el.nodeType === 1) {//元素
      elements.push(el);//加到数组中
    }
    el = el.previousSibling;
  }
  el = ele.nextSibling;
  while (el) {
    if (el.nodeType === 1) {
      elements.push(el);
    }
    el = el.nextSibling;
  }
  return elements;
}
//获取任意一个元素的某一个属性的值
function getStyle(element, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null)[attr];
  } else {
    return element.currentStyle[attr];
  }
}

//当动画函数全部加载完毕后再执行回调函数
function animate(element, json, fn) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    //设置一个标识，该标识就用于解决是否停止定时器的问题
    var flag = true;//所有样式属性的值都达到目标
    for (var attr in json) {
      //获取元素当前的位置
      var current = parseInt(getStyle(element, attr));
      var target = json[attr];//目标位置
      //每次移动的步数
      var step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      //当前的位置
      current += step;
      element.style[attr] = current + "px";
      if (current != target) {
        //没有达到目标
        flag = false;
      }
    }
    if (flag) {
      clearInterval(element, timeId);
      if (fn) {
        fn();
      }
    }
    //测试代码
    console.log("目标位置:" + target + ",当前位置:" + current + ",每次移动的步数:" + step);
  }, 20);
}

//封装scroll相关的兼容代码
function getScroll() {
  return {
    left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0,
    top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
  };
}

//获取任意一个元素的某一个样式属性的值
function getStyle(element, attr) {
  //判断浏览器是否支持这个属性，就相当于浏览器判断浏览器是否支持这个方法
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null)[attr];
  } else {
    return element.currentStyle[attr];
  }
}
//为任意一个元素绑定多个相同的事件
function addEventListener(element, type, fn) {
  //判断浏览器是否支持这个方法
  if (element.addEventListener) {
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fn);
  } else {
    element["on" + type] = fn;
  }
}
//位元素解绑事件的兼容代码
function removeEventListener(element, type, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fn, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, fn);
  } else {
    element["on" + type] = null;
  }
}
//动画旋转
my$("imgRotate4").onmouseover = function () {
  Img.rotate('imgRotate4', 360);
}
my$('imgRotate4').onmouseout = function () {
  Img.rotate('imgRotate4', 360);
}
var Img = function () {
  var T$ = function (id) {
    return document.getElementById(id);
  }
  var ua = navigator.userAgent,
      isIE = /msie/i.test(ua) && !window.opera;
  var i = 0, sinDeg = 0, cosDeg = 0, timer = null;
  var rotate = function (target, degree) {
    target = T$(target);
    var orginW = target.clientWidth, orginH = target.clientHeight;
    clearInterval(timer);
    function run(angle) {
      if (isIE) { // IE
        cosDeg = Math.cos(angle * Math.PI / 180);
        sinDeg = Math.sin(angle * Math.PI / 180);
        with (target.filters.item(0)) {
          M11 = M22 = cosDeg;
          M12 = -(M21 = sinDeg);
        }
        target.style.top = (orginH - target.offsetHeight) / 2 + 'px';
        target.style.left = (orginW - target.offsetWidth) / 2 + 'px';
      } else if (target.style.MozTransform !== undefined) {  // Mozilla
        target.style.MozTransform = 'rotate(' + angle + 'deg)';
      } else if (target.style.OTransform !== undefined) {   // Opera
        target.style.OTransform = 'rotate(' + angle + 'deg)';
      } else if (target.style.webkitTransform !== undefined) { // Chrome Safari
        target.style.webkitTransform = 'rotate(' + angle + 'deg)';
      } else {
        target.style.transform = "rotate(" + angle + "deg)";
      }
    }

    timer = setInterval(function () {
      i += 10;
      run(i);
      if (i > degree - 1) {
        i = 0;
        clearInterval(timer);
      }
    }, 10);
  }
  return {rotate: rotate}
}();
