$(function(){
	//页面加载完调用第一屏动画
	anmition1(20,1,140);
	//获取可视区的高度
	var getWindowHeight=window.innerHeight;
	//给每一屏设置高度
	$('.section').css('height',getWindowHeight);
	//给box设置高度
	$('.box').css('height',getWindowHeight);
	//获取总共屏幕有多少页
	var pageNum=$('.section').size();
	//设置页面总高度
	var superContainerHeight=getWindowHeight*pageNum;
	$('#superContainer').css('height',superContainerHeight);
	//添加鼠标滚轮事件
	$('#superContainer')[0].onmousewheel=move;
	//火狐浏览器单独添加滚轮事件
	$('#superContainer')[0].addEventListener('DOMMouseScroll',move);
	
	//开关控制火狐与其他浏览器滚动方向
	var state=true;
	//开关控制鼠标滚轮的连续滚动
	var onoff=true;
	//声明变量用于存储当前处于第几页
	var num=0;
	function move(e){
		if(e.wheelDelta){
			state=e.wheelDelta<0 ? true : false;
		}else{
			state=e.detail>0 ? true : false;
		}
		//判断鼠标的滚动方向,为真说明 向上滚动
		if(state){
			if(onoff){
				//将开关状态改为false
				onoff=false;
				num++;
				//控制num的取值
				if(num>=pageNum-1){
					num=pageNum-1;
				};
				$('.page-nav li').removeClass();
				$('.page-nav li').eq(num).addClass('active');
				//判断是第几屏执行动画
				switch(num){
					case 1 :
					anmition1(-500,0,-440);
					anmition2(0,1);
					break;
					case 2 :
					anmition2(-60,0);
					anmition3.upward();
					break;
				}
				//给页面添加滚动
				$('#superContainer').animate({
					top:-num*getWindowHeight
				},500,'easeInCubic',function(){
					onoff=true;
				})
			}
		}else{
			if(onoff){
				onoff=false;
				num--;
				//控制num的取值
				if(num<=0){
					num=0;
				};
				switch(num){
					case 1 :
					anmition2(0,1);
					anmition3.downward();
					break;
				}
				$('.page-nav li').removeClass();
				$('.page-nav li').eq(num).addClass('active');
				//给页面添加滚动
				$('#superContainer').animate({
					top:-num*getWindowHeight
				},500,'easeInCubic',function(){
					onoff=true;
					//判断处于第几屏执行相应的动画
					switch(num){
						case 0 :
						anmition1(20,1,140);
						anmition2(-60,0);
						break;
					}
				})
			}
		}
	}
	var gint=true;
	//第一屏动画
	function anmition1(range,transparency,run){
		$('.yuan').animate({
			top:range
		},1000,'easeOutBack',function(){
			$('.redLine').animate({
				opacity:transparency
			},2000)
		})
		$('.biaoti').animate({
			left:run
		},1000,'easeOutBack')
		setInterval(function(){
			if(gint){
				$('.xingxing').fadeIn(1500);
			}else{
				$('.xingxing').fadeOut(1500);
			}
			gint=!gint;
		},1000)
	}
	//第二屏动画
	function anmition2(space,num){
		var itemLi=$('.page2-nav li');
		var textInfo=$('.textInfo');
		//添加鼠标移入效果
		$('.page2-nav a').hover(
			function(){
				var aIndex=$('.page2-nav a').index(this);
				$('.icon'+(aIndex+1)+' img').attr('src','img/change'+(aIndex+1)+'.png'),
				$('.page2 .bj').css('backgroundImage','url(img/bj'+(aIndex+1)+'.png)'),
				itemLi.eq(aIndex).find('div').eq(1).stop(true).animate({
					bottom:-50,
					opacity:1
				},500)
			},function(){
				var aIndex=$('.page2-nav a').index(this);
				$('.icon'+(aIndex+1)+' img').attr('src','img/picture'+(aIndex+1)+'.png'),
				$('.page2 .bj').css('backgroundImage','url(img/bj'+(aIndex+1)+'.png)'),
				itemLi.eq(aIndex).find('div').eq(1).stop(true).animate({
					bottom:-100,
					opacity:0
				},500)
			}
		)
		
		itemLi.eq(0).animate({
			top:space
		},100,'easeOutBack',function(){
			itemLi.eq(0).animate({
				opacity:num
			})
		})
		itemLi.eq(1).animate({
			top:space,
			opacity:num
		},200,'easeOutBack',function(){
			itemLi.eq(1).animate({
				opacity:num
			})
		})
		itemLi.eq(2).animate({
			top:space,
			opacity:num
		},400,'easeOutBack',function(){
			itemLi.eq(2).animate({
				opacity:num
			})
		})
		itemLi.eq(3).animate({
			top:space,
			opacity:num
		},600,'easeOutBack',function(){
			itemLi.eq(3).animate({
				opacity:num
			})
		})
	}
	
	//第三屏动画
	var anmition3={
		upward:function(){
			$('.sortTitle').css('transform','scaleX(1)');
			$('.conputerIco').css('transform','scaleY(1)');
			$('.conputerIco div').css('opacity',1);
			$('.chineseBox').css('transform','translateX(-50px)');
			$('.mathBox').css('transform','translateX(-90px)');
			$('.englishBox').css('transform','translateX(-70px) translateY(-20px)');
			$('.zhengzhiBox').css('transform','translateY(-120px)');
			$('.diliBox').css('transform','translateY(-140px)');
			$('.lishiBox').css('transform','translateY(-120px)');
			$('.wuliBox').css('transform','translateX(70px)');
			$('.huaxueBox').css('transform','translateX(90px)');
			$('.shengwuBox').css('transform','translateX(50px)');
		},
		downward:function(){
			$('.sortTitle').css('transform','scaleX(0)');
			$('.conputerIco').css('transform','scaleY(0)');
			$('.conputerIco div').css('opacity',0);
			$('.chineseBox').css('transform','translateX(30px)');
			$('.mathBox').css('transform','translateX(70px)');
			$('.englishBox').css('transform','translateX(50px) translateY(20px)');
			$('.zhengzhiBox').css('transform','translateY(120px)');
			$('.diliBox').css('transform','translateY(140px)');
			$('.lishiBox').css('transform','translateY(120px)');
			$('.wuliBox').css('transform','translateX(-50px)');
			$('.huaxueBox').css('transform','translateX(-70px)');
			$('.shengwuBox').css('transform','translateX(-30px)');
		}
	}
	
	//设置右侧导航按钮
	$('.page-nav li').on('click',function(){
		$('.page-nav li').removeClass();
		$(this).addClass('active');
		num=$(this).index();
		anmition1(-500,0,-440);
		anmition2(1,0);
		anmition3.downward();
		switch(num){
			case 0 :
			anmition1(20,1,140);
			break;
			case 1 :
			anmition2(0,1);
			break;
			case 2 :
			anmition3.upward();
			break;
		}
		$('#superContainer').animate({
			top:-num*getWindowHeight
		},500,'easeInCubic',function(){
			onoff=true;
		})
	})
})
