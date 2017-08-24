/**
 * Created by Administrator on 2017/7/7.
 */
//防止不同分辨率的解决方法
$(document).ready(function () {
  resizeHtml();
  //为了防止用户拖动窗口自适应大小
  $(window).resize(function () {
    resizeHtml();
  });
});
function resizeHtml() {
  //main为body下第一层div的id
  //$('#main').height($(window).width());
  $('#space').css({"height": "800px", "width": "1348px"});
}
//顶部的展开特效
//设置鼠标进入显示隐藏的div
$("#jump").mouseenter(function () {
  $("#hide").stop().slideDown(500);
}).mouseleave(function () {
  $("#hide").stop().slideUp(500);
});
//设置鼠标进入div的事件
$("#hide").mouseenter(function () {
  $(this).stop().slideDown(500);
}).mouseleave(function () {
  $(this).stop().slideUp(500);
});
//顶部进入有下边框
$("#topRight").find("li").mouseenter(function () {
  $(this).css("border-bottom", "4px solid red");
}).mouseleave(function () {
  $(this).css("border-bottom", "");
});
//中间小播放器的旋转效果
var d=0;
function setTime(){
  d+=10;
  $("#snow").css("transform","rotate("+d+"deg)");
}
setInterval(setTime,80);
//新闻tab切换
//先获取li,鼠标进入事件
$(".newstop>li").mouseenter(function () {
  //当前的li应用类样式
  $(this).addClass("active");
  //兄弟元素移除类样式
  $(this).siblings("li").removeClass("active");
  //获取当前li的索引
  var index = $(this).index();
  //获取所有的div
  $(".newsContent>div:eq(" + index + ")").addClass("selected");
  //这个div的兄弟元素要移除类样式
  $(".newsContent>div:eq(" + index + ")").siblings("div").removeClass("selected");
});
//大轮播图
var config = [
  {
    width: 250,
    top: 20,
    left: 155,
    opacity: 0.2,
    zIndex: 2
  },//0
  {
    width: 313,
    top: 30,
    left: 105,
    opacity: 0.8,
    zIndex: 3
  },//1
  {
    width: 500,
    top: 50,
    left: 305,
    opacity: 1,
    zIndex: 4
  },//2
  {
    width: 313,
    top: 30,
    left: 705,
    opacity: 0.8,
    zIndex: 3
  },//3
  {
    width: 250,
    top: 20,
    left: 755,
    opacity: 0.2,
    zIndex: 2
  }//4
];
$(function () {
  var flag = true;
  function assign() {
    for (var i = 0; i < $("#slide li").length; i++) {
      $("#slide li:eq('" + i + "')").animate(config[i], 200);
      flag = true;
    }
  }
  assign();
  $("#wrap").mouseenter(function () {
    $("#arrow").animate({"opacity": 1}, 20);
  }).mouseleave(function () {
    $("#arrow").animate({"opacity": 0}, 20);
  });

  $("#arrLeft").click(function () {
    config.unshift(config.pop());
    assign();
  });
  $("#arrRight").click(function () {
    config.push(config.shift());
    assign();
  });
});




