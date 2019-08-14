function my$(id) {
    return document.getElementById(id);
}

//获取各元素，方便操作
var rotate=my$("rotate");
var ulObj=rotate.children[0];
var imgList=ulObj.children;
var imgWidth=rotate.offsetWidth;
var olObj=rotate.children[1];
var arr=my$("arr");
var left=my$("left");
var right=my$("right");
var pic=0;
//设置
var timeId_time=3000;

//根据li个数，创建小按钮
for(var i = 0;i<imgList.length;i++){
    var liObj=document.createElement("li");
    olObj.appendChild(liObj);
    liObj.setAttribute("index",i);
    //为按钮注册mouseover事件
    liObj.onmouseover=function () {
        //先清除所有按钮的样式
        for (var j=0;j<olObj.children.length;j++){
            olObj.children[j].removeAttribute("class");
        }
        this.className="current";
        pic=this.getAttribute("index");
        animate(ulObj,-pic*imgWidth);
    }
}

//设置ol中第一个li有背景颜色
olObj.children[0].className = "current";
//克隆一个ul中第一个li,加入到ul中的最后
ulObj.appendChild(ulObj.children[0].cloneNode(true));
//计时器，自动切换
var timeId=setInterval(leftMove,timeId_time);
// 当浏览器窗口切出或页面切换到其他页面一段时间再回来时，轮播效果会有短暂加速
// （随切出时间加长而加长）。主要是因为虽然窗口切出去了，定时器依然在执行，但
// 页面却没有将效果显示，所以切回来后会将之前的效果显示出来而加速轮播图。所以
// 添加页面焦点事件：
//页面失去焦点停止
onblur = function(){
    stop();
}
//页面获取焦点时开始
onfocus = function(){
    start();
}
function stop(){  //计时器暂停
    clearInterval(timeId);
}
function start(){  //计时器开始
    clearInterval(timeId);
    timeId=setInterval(leftMove,timeId_time);
}

//左右焦点实现点击切换图片功能
rotate.onmouseover=function () {
    arr.style.display="block";
};
rotate.onmouseout=function () {
    arr.style.display="none";
};
right.onclick=leftMove;
function leftMove() {
    if (pic == imgList.length - 1) {
        pic = 0;
        ulObj.style.left = 0 + "px";
    }
    pic++;
    animate(ulObj, -pic * imgWidth);
    if (pic == imgList.length - 1) {
        olObj.children[olObj.children.length - 1].className = "";
        olObj.children[0].className = "current";
    } 
    else {
        //取消所有的小按钮的背景颜色
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }
}
left.onclick=function () {
    if (pic==0){
        pic=imgList.length-1;
        ulObj.style.left=-pic*imgWidth+"px";
    }
    pic--;
    animate(ulObj,-pic*imgWidth);
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    olObj.children[pic].className = "current";
};

//设置任意的一个元素,移动到指定的目标位置
function animate(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } 
        else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 10);
}
// timeId_time其中包含了animate的时间，本想用stop()和start()清除这段
// 时间，但是写出来都是bug，嘤嘤嘤