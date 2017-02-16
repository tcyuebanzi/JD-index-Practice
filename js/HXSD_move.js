// JavaScript Document

//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
}

//-----------------------------------------------------------------------------
function move(obj,moveMode,end,stopTime,fn){//对象 终点 运动终点  运动方式
	
	//距离=终点-起点;
	var start=getStyle(obj, moveMode);//起点数值

	var dis=end-start;//距离 distance
	
	//定时器---------------------------------------------
	var count=parseInt(stopTime/30);////次数
	var n=0;//步进

	clearInterval(obj.timer);//使用对象属性，定义计时器变量
	
	obj.timer=setInterval(function(){
		n++;
		
		var a=1-n/count;  //a的值会越来越小
		var step_dis=start+dis*(1-a*a*a);
		
		if(moveMode=='opacity'){//透明
			obj.style.filter='alpha(opacity:'+step_dis+')';
			obj.style.opacity=step_dis/100;
		}
		else{//其他
			obj.style[moveMode]=step_dis+'px';
		}
		
		//取消定时器
		if(n==count){
			clearInterval(obj.timer);
			fn && fn();
		};
	
	},30)
};