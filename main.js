function move(obj,json,callback) {
    clearInterval(obj.timer);   // 清除定时器
    var json_start = {         // 获取初始值,定义一个对象装起来

    };                       
    for(var attr in json) {
        if(attr === "opacity") {
            json_start[attr] = parseFloat(getStyle(obj,attr))*100;  //如果是透明度，数值要扩大100倍，便于计算
        }else {
            json_start[attr] = parseInt(getStyle(obj,attr));  
        }
    }
    var speed;
    var current;
    obj.timer = setInterval(()=> {     // 开启定时器
        for(var attr in json) {    // 运动中 获取当前值
            if(attr === "opacity") {
                current = parseFloat(getStyle(obj,attr))*100;
            }else {
                current = parseInt(getStyle(obj,attr));
            }
            if(current === json[attr]) {   //判断  当前值达到最终值 清除定时器 运动结束 (要在for in里面执行)
                clearInterval(obj.timer);
                if(callback) {
                    callback();
                }
            }else {     //否则  计算步长 和 运动值
                speed = speed>0 ? Math.ceil((json[attr]-current)/10):Math.floor((json[attr]-current)/10);
                if(attr === "opacity") {
                    obj.style[attr] = (current + speed)/100;
                }else {
                    obj.style[attr] = (current + speed) + "px";
                }
            }
        }
    },400);
    // 做兼容
    function getStyle(obj,attr) {
        if(getComputedStyle) {
            return getComputedStyle(obj)[attr];  //获取非行内样式的值
        }else {
            return obj.currentStyle[attr];  
        }
    }
}
