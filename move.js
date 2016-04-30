function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE
	}else{
		return getComputedStyle(obj,null)[attr];//!IE
	}
}
function startChange(obj,json,fn){
	//避免定时器共用，重复omouseover时timer叠加
	clearInterval(obj.timer);
	//定时器
	obj.timer=setInterval(function(){
		var flag=true;//假设一个标杆，用于判断是否所有json都到目标值
		//0 excute every json
		for(var i in json){
			//1 get attr key
			var icur=0;
			if(i==="opacity"){
				icur=Math.round(parseFloat(getStyle(obj,i))*100);
				/*
				 **计算机parseFloat取0.07*100得到的是7.0...1，Math.round()四舍五入一下**
				 */
			}else{
				icur=parseInt(getStyle(obj,i));
			}
			//2 caculate bufferSpeed
			var speed=(json[i]-icur)/10;//!int
			speed=speed>0?Math.floor(speed):Math.ceil(speed);
			/*
			**Math.ceil,floor取整，避免浏览器计算问题来的小数问题**
			 */
			//3 to continue
			if(icur!=json[i]){
			    flag=false;
			}
			if(i==="opacity"){
					obj.style.filter="alpha(opacity:"+icur+speed+")";//IE
					obj.style.opacity=(icur+speed)/100;//opera,fire !IE
			}else{
					obj.style[i]=icur+speed+"px";
			}
		}
		//4 to stop
		if(flag){
			//设置一个总的原因在于，当所有json的键值对都到要求时才关闭定时器
			clearInterval(obj.timer);
			//5 fn 有回调函数执行链式运动
			if(fn){
				fn();
			}
		}
	},20);
}