

documentReady(function(){
	
	//左侧导航栏的滑动显示子菜单----------------
	function subNav(){
		var leftNav=document.getElementById('left_nav')
		var aLi=leftNav.getElementsByTagName('li');
		var aPass=hxsd_tools.getByClass(document,'pass');
		//循环绑事件----------------
		for (var i=0;i<aLi.length;i++ ) {
			aLi[i].index=i		//发牌照	
			aLi[i].onmouseover=function(){
				for (var j=0;j<aLi.length;j++) {
					aPass[j].style.display='none'				
				}	
				aPass[this.index].style.display='block'	
				this.className='white'
			};
			aLi[i].onmouseout=function(){
				for (var j=0;j<aLi.length;j++) {
					aPass[j].style.display='none'				
				};
				this.className=''
			};			
		};
		//循环绑定事件---------
		for (var i=0;i<aLi.length;i++ ) {
			aPass[i].index=i
			aPass[i].onmouseover=function(){			
				this.style.display='block'
				aLi[this.index].className='white'
			};
			aPass[i].onmouseout=function(){
				this.style.display='none'
				aLi[this.index].className=''
			};		
		};				
	};
	subNav()//调用函数
	
	//主页轮播图--------------------------------------------------
	function bannerTab(){
		var oDiv=document.getElementById('slide');
		var aBtn=oDiv.getElementsByTagName('ol')[0].children;
		//var aPic=hxsd_tools.getByClass(document,'banner_tab')[0];		
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		aLi[0].style.opacity=1;		
		var pBtn=document.getElementById('prevBtn');
		var nBtn=document.getElementById('nextBtn');		
		
		var n=0;//当前显示图片索引
		var timerA=null;	
		var timerB=null;
	
		//添加点击事件
		//鼠标滑进关闭定时器并显示左右按钮--------------------
		oDiv.onmouseover=function(){		
			clearInterval(timerA)
			nBtn.style.display=pBtn.style.display='block';									
		};
		//鼠标滑出开启定时器并显示左右按钮--------------------
		oDiv.onmouseout=function(){				
			nBtn.style.display=pBtn.style.display='none';
			timerA=setInterval(function(){
				n++;
				if(n>aLi.length-1){
					n=0;
					slideItem(aLi.length-1,0);
				}else{
					slideItem(n-1,n);
				};
				changeAc();	
			},2000)
		};
		//自动播放-------------------
		timerA=setInterval(function(){
			n++;
			if(n>aLi.length-1){
				n=0;
				slideItem(aLi.length-1,0);
			}else{
				slideItem(n-1,n);
			};
			changeAc();	
		},2000);
		
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index=i;//发拍照
			aBtn[i].onmouseover=function(){	
				if(n!=this.index){					
					slideItem(n,this.index);					
					n=this.index;					
					changeAc();
				};									
			};
		};	
		
		pBtn.onclick=function(){
			if(n<1){
				n=aLi.length;
				slideItem(0,aLi.length-1);
			}else{
				slideItem(n,n-1);
			};
			n--;
			changeAc();		
		};
	
		nBtn.onclick=function(){
			n++;
			if(n>aLi.length-1){
				n=0;
				slideItem(aLi.length-1,0);
			}else{
				slideItem(n-1,n);
			};
			changeAc();			
		};			
		function slideItem(a,b){
			setTimeout(function(){
				aLi[a].style.display='block';
				aLi[a].style.opacity=1;;
				
				aLi[b].style.display='block';
				aLi[b].style.opacity=0;
				
				move(aLi[a],'opacity',0,1000);
				move(aLi[b],'opacity',100,1000,function(){
					aLi[a].style.display='none';
				});
			},300)
		};
		function changeAc(){
			setTimeout(function(){
				for(var j=0; j<aBtn.length; j++){
					aBtn[j].className='';
				};				
				aBtn[n].className='bg';
			},300)
		};
	};		
	 bannerTab()//调用函数-------------
	
	
	// 京东楼层显示------------------------------------------
	function Floor(){
		var LocationFloorList=getByClass(document,'LocationFloorList')[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var aFloor=getByClass(document,'floor_jd');
		var arr=[];
			
		//----------------------------------------------------
			
		for(var i=0; i<aLi.length; i++){
			var json={};
			json.name='f'+i;
			json.offsetTop=aFloor[i].offsetTop;
			arr.push(json);
		};

		window.onscroll=function(){
			//显示楼层编号-------------------------------------------------
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>1400){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';
			};

			// 根据楼层滚动位置，定位编号------------------------------------------------
			var screenHeight=document.documentElement.offsetHeight || document.body.Height;
			var last_arr=[];
			//console.log(last_arr)
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrolltop+400){
					last_arr.push(arr[j].name);
				}
			};
			if(last_arr.length==0){
				return;
			};
			var li_index=last_arr[last_arr.length-1].substr(1);

			for(var l=0; l<aLi.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};

		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end);
			}
		};
		//move-------------------------------------------------------
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		};
		
		function getByClass(oParent,cls){
			var arr=[]; //容器
			if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
			else{
				var aEl=oParent.getElementsByTagName('*');//所有标签
				for(var i=0;i<aEl.length;i++){
					if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
				};
			return arr;
			};
		};	
	};
	Floor();
	
	
	//每个楼层的选项卡-------------------------------
	
	function floorTab(){
		var subTab=hxsd_tools.getByClass(document,'subtab')[0];
		var tabLi=subTab.getElementsByTagName('li');		
		var subtitleA=document.getElementById('subtitleA');
		var tit_li=subtitleA.getElementsByTagName('li');
		
		//alert(tit_li.length)
		for (var i=0;i<tabLi.length;i++) {
			tit_li[i].index=i;
			tit_li[i].onmouseover=function(){
				for (var j=0;j<tabLi.length;j++) {
					tabLi[j].style.display='none';
					tit_li[j].className='';
				};
					tabLi[this.index].style.display='block';
					this.className='cat';				
			};			
		};
	};
	
	floorTab();

	function titleChange() {
		var Title= document.getElementsByClassName("c_ac");
		//console.log(Title);
		for (var i=0;i<Title.length;i++){
            Title[i].index=i;
            var oldMethod = window.onscroll;
            if(typeof oldMethod == 'function'){
                window.onscroll = function(){
                    oldMethod.call(this);
                    for (var i=0;i<Title.length;i++){
                        if(Title[i].offsetTop-document.body.scrollTop<100){
                            Title[i].style.backgroundPositionY=6+"px";
                        }else {
                            Title[i].style.backgroundPositionY=-29+"px";
                        };
                    };
                }
            }
		};
    };
    // titleChange()
});




















































