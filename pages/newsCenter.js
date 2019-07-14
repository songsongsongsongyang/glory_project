window.onload=function(){
    var newsHd = document.getElementById("newsHd");
    var myUl = newsHd.getElementsByTagName("ul")[0];
    var liList = myUl.getElementsByTagName("li");
    var newsBd = document.getElementById("newsBd");
    var myTab = newsBd.getElementsByTagName("ul");

    for(var i=0;i<liList.length;i++){
        liList[i].index=i;  //为每个li添加对应的索引index
        liList[i].onmouseover=function(){
            for(var j=0;j<liList.length;j++){
                liList[j].className=''; //循环清空li样式
                myTab[j].style.display='none'; //循环隐藏所有ul
            }
            this.className='active'; //当前点击的元素样式变成active
            myTab[this.index].style.display='block';
        }
    }
}