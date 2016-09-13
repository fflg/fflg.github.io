window.onload=function(){
	//获取元素
	var img=$('#img');
	var btn=$('#btn');
	var cut=$('#cut');
	var add=$('#add');
	var atate=$('#atate');
	var atateBox=$('#atateBox');
	var score=$('#score');
	var lose=$('#lose');
	var promptBj=$('#promptBj');
	var wrap=$('#wrap');
	var prompt=$('#prompt');
	var con=$('#con');
	var can=$('#can');
	atateBox.onmouseover=function(){
		tab(atateBox,"right",0,500);
	}
	atateBox.onmouseout=function(){
		tab(atateBox,"right",-220,500);
	}
	//声明变量a b,a 用于记录加分，b用于计算减分 
	var a=0;
	var b=0;
	//声明变量用于改变时间
	var changeTime=3000;
	//点击开始按钮开始游戏
	//为防止游戏中重复点击开始按钮，给按钮设置开关
	var btnOnoff=false;
	btn.onclick=function(){
		if(btnOnoff){
			return;
		}else{
			btnOnoff=true;
			clearInterval(timer);
			move();
		}
	}
	//让开关按钮不停变大变大变小
	var timer=null;
	var onoff=true;
	blink();
	function blink(){
		timer=setInterval(function(){
			if(onoff){
				btn.style.transform="scaleX(1.2) scaleY(1.2)";
			}else{
				btn.style.transform="scaleX(1) scaleY(1)";
			}
			onoff=!onoff;
		},1200)
	}
	//封装从新开始函数
	function start(){
		//改变开始按钮的状态
		btnOnoff=false;
		//将上次得分清零
		a=0;
		b=0;
		changeTime=3000
		score.innerHTML=0+"分";
		lose.innerHTML=0+"分";
		img.style.top=0;
	}
	//将img的运动封装成为一个函数
	function move(){
		//生成屏幕宽度范围内的随机数，及随机选择图片
		var m=Math.round(Math.random() * 1320);
		var n=Math.round( Math.random() * 10 )+1;
		//每次调用函数就说就有一个新的小鱼游下去，将top值设为0
		img.style.cssText="position:absolute;";
		
		img.style.top=0;
		//随机设置img的left值
		img.style.left=m+'px';
		//随机选择一张图片
		img.src='img/'+n+'.png';
		//让时间随着游戏的深入不段的减少，运动越来越快
		changeTime-=400;
		if(changeTime<1200){
			changeTime=1200;
		}
		//将add恢复大小
		add.style.transform="scaleX(1) scaleY(1)";
		//调用运动函数
		tab(img,"top",713,changeTime,function(){
			shake(cut,'left',20,20,function(){
				//程序走到这时说明有一条落网之鱼
				b++;
				lose.innerHTML=b+"分";
				if(b==5){
					hint('失败了，在来一局吧，加油？？');
					blink();
				}else{
					move();
				}
			});
		});
	}
	//给img添加点击事件
	//声明开关，防止img重复被点击
	var imgOnoff=true;
	img.onmousedown=function(){
		//防止img重复点击
		if(imgOnoff){
			//程序运行中改变开关的状态
			imgOnoff=false;
			//点中将add恢复变大
			add.style.transform="scaleX(1.2) scaleY(1.2)";
			clearInterval(this.top);
			shake(this,'left',20,20,function(){
				//程序走到此说明得分了
				a++;
				score.innerHTML=a+'分';
				if(a==10){
					hint('恭喜您过关了，是否在来一局？？');
					blink();
				}else{
					move();
				}
			});	
		}
		//程序运行完将开关设为真
		imgOnoff=true;
	}
	//封装提醒函数
	function hint(textInfo){
		prompt.innerHTML=textInfo;
		wrap.style.left='460px';
		wrap.style.top='200px';
		promptBj.style.display="block";
		con.onclick=function(){
			wrap.style.left='-9999px';
			wrap.style.top='-9999px';
			promptBj.style.display="none";
			add.style.transform="scaleX(1) scaleY(1)";
			clearInterval(timer);
			btnOnoff=true;
			start();
			move();
		}
		can.onclick=function(){
			wrap.style.left='-9999px';
			wrap.style.top='-9999px';
			promptBj.style.display="none";
			add.style.transform="scaleX(1) scaleY(1)";
			start();
		}
	}
	//封装元素抖动函数
	/*
	 * 函数所需要的参数   obj 对象，attr 元素，speed 抖动的幅度，rate 抖动频率  callback 回调函数
	 */

	function shake(obj,attr,speed,rate,callback){
		//首先清楚定时器
		clearInterval(obj[attr]);
		//给传入的speed做值得判断，当传的有值得时候用传入的值，没有的时候默认设置为30
		speed = speed || 10;
		//给传入的rate做值得判断
		rate = rate || 10;
		//声明数组，用于存储数据
		var arr=[];
		//用for循环将speed拆为一组数字
		for(var i=speed;i>0;i--){
			arr.push(i,-i);
		}
		//将0push进数组的最后一个，让抖动的元素停下来
		arr.push(0);
		//声明变量m,用于找到数组中的每一个数
		var m=0;
		//获取距离可视区的距离
		var b=parseFloat(getComputedStyle(obj)[attr]);
		//打开定时器，让arr里面的数有时间间隔的调用
		obj[attr]=setInterval(function(){
			//给元素添加抖动的值
			obj.style[attr]=b+arr[m]+'px';
			m++;
			//判断当值去到最后一个的时候
			if(m==arr.length){
				//清楚定时器
				clearInterval(obj[attr]);
				//如果callback传 入的是函数，则执行
				if(typeof callback==="function"){
					callback();
				}
			}
		},rate)
	}
	//获取元素，参数分别为#id .className  TagName 。obj元素名称  context从什么下面找元素
	function $(obj,context){
		context = context || document;
		if(obj.charAt(0)==='#'){
			return document.getElementById(obj.slice(1));
		}else if(obj.charAt(0)==='.'){
			return context.getElementsByClassName(obj.slice(1));
		}else{
			return context.getElementsByTagName(obj);
		}
	}
}
