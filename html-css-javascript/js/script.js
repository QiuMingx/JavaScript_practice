// 封装getElmentByID()的方法
function byId(id){
    return typeof id === "string"? document.getElementById(id):id;
}
// 全局变量
var index = 0,
    timeEvent = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    menu = byId("menu-content"),
    menuItems = menu.getElementsByClassName('menu-item'),
    subMenu = byId('sub-menu'),
    subMenuItems =  subMenu.getElementsByClassName('inner-box'),
    len = pics.length;
    
// banner控制器 
function slideImg(){
    var main = byId("main");

    // 滑过清除定时器
    main.onmouseover = function(){
        clearInterval(timeEvent);
    }

    // 鼠标移出main区域执行定时器
    main.onmouseout = function(){
        timeEvent = setInterval(function(){
            index++;
            if(index >= len) index = 0;
            // 调用切换图片  
            changeImage();   
        },3000)
    }

    // 自动调用鼠标移出事件
    main.onmouseout();

    // 循环遍历有点击，绑定点击事件，点击圆点切换图片。
    for(var d=0;d<len; d++){
        // 给所有span添加一个id属性，值为d，作为span的索引
        dots[d].id = d;
        dots[d].onclick = function(){
            // 修改index为当前span的id值
            index = this.id;
            // 调用切换图片函数
            changeImage()
        }
    }
    // 上一张
    byId('prev').onclick = function(){
        index--;
        if(index < 0){
            index = 2;
        }
        changeImage()
    
    }
    // 下一张
    byId('next').onclick = function(){
        index++;
        if(index >= len){
            index =0;
        }
        changeImage()
    }
    for(var m=0;m<menuItems.length;m++){
        menuItems[m].setAttribute("data-index",m)
        menuItems[m].onmouseover = function(){
            subMenu.className = "sub-menu";
            
            for(var j=0;j<subMenuItems.length;j++){
                subMenuItems[j].style.display = "none";
                menuItems[j].style.background = "none";
            }
            
            showIndex = this.getAttribute('data-index');
            subMenuItems[showIndex].style.display = 'block'; 
            menuItems[showIndex].style.background = 'rgba(0,0,0,0.2)';  
        }
    }
    menu.onmouseout = function(){
        subMenu.className = "sub-menu hide";
    }
    subMenu.onmouseover = function(){
        this.className = "sub-menu";
    } 
    subMenu.onmouseout = function(){
        this.className = "sub-menu hide";
    } 
}

//  定义切换图片函数
function  changeImage(){
    // 循环遍历图片，设置图片属性为隐藏。
    for(var i=0; i< len; i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    // 根据index显示图片
    pics[index].style.display = "block";
    dots[index].className = "active";
}
// 调用控制器
slideImg();