var W, H;
var XUE = {};
var fps = 30;

var defaultNum = 0; //初始显示第几个大类 资料中心

var fenyeCro;
var xfenlLen,  xfenTxt;
var xfenNum = 0;
var liHtml;
var n = 1;
var dlei = 0;
var xlei = 0;



function myBrowser() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
	if(isIE) {
		var IE5 = IE55 = IE6 = IE7 = IE8 = false;
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		IE55 = fIEVersion == 5.5;
		IE6 = fIEVersion == 6.0;
		IE7 = fIEVersion == 7.0;
		IE8 = fIEVersion == 8.0;
		IE9 = fIEVersion == 9.0;
		if(IE55) {
			return "IE55";
		}
		if(IE6) {
			return "IE6";
		}
		if(IE7) {
			return "IE7";
		}
		if(IE8) {
			return "IE8";
		}
		if(IE9) {
			return "IE9";
		}
	} //isIE end
	if(isFF) {
		return "FF";
	}
	if(isOpera) {
		return "Opera";
	}
}

XUE.main_index = function() {

	var navhh = document.getElementById('navnav');
	$('.main .nav .navbar .icon').bind({
		mouseenter: function() {
			if(myBrowser() == 'IE8' || myBrowser() == 'IE7' || myBrowser() == 'IE6') {

				navhh.childNodes[1].style.display = 'block';
				navhh.childNodes[1].setAttribute('class', 'navAni1');
			} else {
				$('.main .nav .navbar .icon').find('ul').fadeIn(100).removeClass("navAni").addClass("navAni1");

			}

			$(this).find('.iconimg').css('z-index', 0);
		},
		mouseleave: function() {
			//event.preventDefault();
			if(myBrowser() == 'IE8' || myBrowser() == 'IE7' || myBrowser() == 'IE6') {
				navhh.childNodes[1].style.display = 'none';
				navhh.childNodes[1].setAttribute('class', 'navAni');
			} else {
				$('.main .nav .navbar .icon').find('ul').fadeOut(100).removeClass("navAni1").delay(100).addClass("navAni");
			}
			$(this).find('.iconimg').css('z-index', 10);
		}
	});

	$('.hoverimg').mouseover(function() {
		$(this).find('.hoverp').addClass('hoverpAni');
		$(this).find('.txt').addClass('pictxtAni');
	});
	$('.hoverimg').mouseout(function() {
		$(this).find('.hoverp').removeClass('hoverpAni');
		$(this).find('.txt').removeClass('pictxtAni');

	});
	$('.hoverimg1').click(function() {
		$('.fuceng').fadeIn(300);
	});
	$('.fcimg').click(function() {
		$('.fuceng').fadeOut();
	});

}

$(document).ready(function() {
	$('.nav').load("./nav.html", function() {
		XUE.main_index();
	});
	//大会直播代码
	$('.li_videobg').click(function() {
		$('.li_fix').fadeIn(200);
	});
	$('.video_close').click(function() {
		$('.li_fix').hide();
	});

	//热力图代码
	//var inptap;
	var textArr = [];
	var texti = 0;
	var endText = [];
	$('.di_right ul li').find('.di_inp').click(function() {
		var inptap = $(this).attr('ifr');
		console.log(inptap);
		if(inptap == 'true') {
			console.log(1);
			$(this).css({
				'background': 'url("http://s-event.cn/EDM/dell/161011reg/images/check1.jpg") no-repeat'
			}).attr('ifr', 'false');
			// console.log( $(this).next().text());
			texti++;
			// console.log(texti);
			textArr.push($(this).next().text());
		} else {
			$(this).css({
				'background': 'url("http://s-event.cn/EDM/dell/161011reg/images/check.jpg") no-repeat'
			}).attr('ifr', 'true');
			texti--;
			textArr.splice(texti);
			// console.log('是否简直'+texti);
		}

		endText = textArr;

		// console.log('总数'+texti);
		// console.log('数组值————'+textArr);
		// console.log('endText___'+endText);
		// console.log(textArr[texti-1]);

	});
	$('.di_btn').click(function() {
		var inptxt = $('.form-control').val();
		endText.push(inptxt);
		// console.log('inptxt————'+inptxt);
		// console.log('endText哈哈___'+endText);
		$.ajax({
			url: "http://www.k-ad.cn/bg/dellmeet/hotimg",
			type: "GET",
			dataType: 'jsonp',
			jsonp: 'callback',
			data: {
				hotInfo: endText,
				pc: 'pc'
			},
			success: function(json) {
				// console.log(json);
				var html = "";
				if(json.code == 200) {
					console.log('上传成功');
					$('.di_fc').fadeIn();
					//for (var i in json){
					//    if(json[i].meditaTionNumber){

					//    }
					//
					//}
				}

			}
		});
	});
	$('.di_close').click(function() {
		$('.di_fc').hide();
	});

	var agtNum = 0;
	var agnavtap = document.getElementById('agnav');

	$('.ag_title ul li').bind('click', function() {
		agtNum = $(this).index();
		$('.ag_title ul li').css({
			'color': '#ffffff'
		});
		$(this).css({
			'color': '#43d1f8'
		});
		$('.ag_cont').hide();
		$('.ag_cont').eq(agtNum).fadeIn(300);
		if(agtNum == 1) {
			$('.ag_af_nav').show();
			$('.line_hover').animate({
				'left': 282 + 'px'
			}, 300);
		} else {
			$('.ag_af_nav').hide();
			$('.line_hover').animate({
				'left': -35 + 'px'
			}, 300);
		}
	});
	$('.e_close').click(function() {
		$('.ewm').hide();
		$('.ewm_btn').show();
	});
	$('.ewm_btn').click(function() {
		$('.ewm_btn').hide();
		$('.ewm').show();
	});

	//日程

	var ag_listcont = [{
		idtit: '平滑云演进 - 云参考架构与设计',
		//intro:'企业如何平滑地向云计算演进？如何制定符合业务发展的云战略？如何构建合适自己的混合云平台？我们将从战略制定到经验分享的不同维度，和您全面探讨可行的云部署解决方案。',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">戴尔混合云：变革以加速您的业务发展</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">14:30-15:00</div><div class="t_span1">基于英特尔技术的云架构研究与实践 </div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">Pivotal车联网分享专题 － 如何利用云计算及大数据技术实现车联网</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">VMware － 新一代跨云计算架构</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">XSKY SDS释放数据潜能</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-17:05</div><div class="t_span1">航天全融合架构云助力企业转型升级</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:05-17:35</div><div class="t_span1">忧云 优云 有云 —— OpenStack开源云平台建设实践分享</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:35-17:45</div><div class="t_span1">结束及抽奖</div></div>'),
	}, {
		idtit: '平滑云演进 - 云运营与应用创新',
		//intro:'企业在向云计算演进中，会面临多重挑战。运营和云原生应用是其中最大的挑战。我们将为您介绍多云平台管理、灾备、运维和云原生应用开发的解决方案，帮助您实现最有效利用云计算资源，提高效率。',
		//contlist:'分会场日程正在更新，敬请期待...',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">戴尔云战略及混合云解决方案优特云案例分享</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">14:30-15:00</div><div class="t_span1">戴尔PowerEdge － 云时代运维当然之选</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">开发与运维在云化转型潮流下的趋势</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">东软 － 戴尔混合云跨云服务之超级云管平台</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">英方 － 戴尔混合云跨云服务之灾备即服务</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-16:55</div><div class="t_span1">美团演讲</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:55-17:15</div><div class="t_span1">安畅 － 中国特色的混合云落地实践</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:15-17:45</div><div class="t_span1">混合IT下的多云管理与业务交付</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:45-17:55</div><div class="t_span1">结束及抽奖</div></div>'),

	}, {
		idtit: '迈向实时企业 - 大数据优化',
		//intro:'加速新业态是企业在数字化变革中必须面对的重点挑战之一。实时企业是企业实现实时决策分析的关键一步。大数据解决方案将会帮助企业实现以数据为发展驱动，及时抓住市场机遇。我们将会为您介绍大数据套件、SAP HANA、物联网、智能监控等解决方案。',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">如何成为数据驱动发展的企业</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">14:30-15:00</div><div class="t_span1">戴尔SAP HANA解决方案</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">Pivotal 大数据套件：云时代的一站式开源大数据套件</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">大数据深度分析 － 归本溯源</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">合作共赢， 赢在物联网时代</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-17:05</div><div class="t_span1">云引变革， 智领未来 </div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:05-17:35</div><div class="t_span1">大数据助力绿色金融</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:35-17:45</div><div class="t_span1">结束及抽奖</div></div>'),
	}, {
		idtit: '软件定义和融合架构',
		//intro:'企业不仅要保持数据中心稳健的运营，也要及时利用更为敏捷的技术以优化数据中心，提高资源利用率和性能。软件定义和融合架构会是企业业务保持敏捷的关键。vSAN、Nutanix，软件定义存储和网络都会是您必须关注的关键技术。',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">流动数据助力数字化转型</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">14:30-15:00</div><div class="t_span1">Vmware vSAN架构和应用场景</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">超融合架构：基于Nutanix的XC解决方案</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">数据驱动的同程旅游</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">基于开放架构的软件定义网络</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-17:05</div><div class="t_span1">VMware NSX：SDN驱动下的下一代云数据中心</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:05-17:35</div><div class="t_span1">戴尔助力迅达云构建覆盖全球的云服务能力</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:35-17:45</div><div class="t_span1">结束及抽奖</div></div>'),
	}, {
		idtit: '数据中心现代化 - 加速关键业务',
		//intro:'从传统企业走向数字化企业，IT将会扮演越来越重要的角色。IT不仅是支持部门，也将会更多转变为业务增长的关键。现代化的数据中心是这一个转变的核心。利用模块化数据中心、闪存技术、新一代高性能计算等技术保证数据中心跟随业务发展。',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">戴尔模块化数据中心</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">14:30-15:00</div><div class="t_span1">在变革中确保业务连续性</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">戴尔数据库加速解决方案 </div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">探究全闪存阵列的“高”与“低”</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">戴尔HPC高性能计算解决方案</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-17:05</div><div class="t_span1">人工智能与深度学习</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:05-17:35</div><div class="t_span1">戴尔专业服务：全IT生命周期服务方法</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:35-17:45</div><div class="t_span1">结束及抽奖</div></div>'),
	}, {
		idtit: '移动互联新应用',
		//intro:'员工是企业的核心，在数字化变革中是关键因素之一。如何确保员工发挥最大效率、如何促进员工的创新力，会是企业急需面对的挑战。戴尔全方位的客户端解决方案将会为企业提高员工生产力，为员工无处不在的数字化工作空间。',
		contlist: $('<div class="t_li t_li01"><div class="t_span">14:00-14:30</div><div class="t_span1">戴尔的未来就绪产品及解决方案助力数字化变革</div></div>' +
			'<div class="t_li t_li02"><div class="t_span" >14:30-15:00</div><div class="t_span1">驭变 . 演进 － 在中国为中国的戴尔终端解决方案之路</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">15:00-15:30</div><div class="t_span1">中国制造2025 － 从数字化制造走向智能化制造</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">15:35-16:05</div><div class="t_span1">打造数字化的工作空间</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">16:05-16:35</div><div class="t_span1">戴尔云客户端计算：安全、易管理和可靠的端到端虚拟桌面解决方案</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">16:35-17:05</div><div class="t_span1">可信赖的基础服务，驱动移动应用创新升级</div></div>' +
			'<div class="t_li t_li01"><div class="t_span">17:05-17:35</div><div class="t_span1">用革命性安全技术进化斩断网络攻击杀伤链：WINDOWS 10 安全特性概述</div></div>' +
			'<div class="t_li t_li02"><div class="t_span">17:35-17:45</div><div class="t_span1">结束及抽奖</div></div>'),
	}];

	$('.ag_af_nav ul li').click(function() {
		var thisNum = $(this).index();

		// console.log(thisNum);

		$('.ag_af_nav ul li').css('color', '#575757').hover(
			function() {
				$(this).css('color', '#fff');
			},
			function() {
				$(this).css('color', '#575757');
			}
		);
		$(this).css('color', '#fff').hover(
			function() {
				$(this).css('color', '#fff');
			},
			function() {
				$(this).css('color', '#fff');
			}
		);
		$('.ag_cont1').find('.t_cont').fadeOut(100);
		setTimeout(function() {
			$('.ag_cont1').find('.t_cont').text(ag_listcont[thisNum].intro).fadeIn(100);
			if(ag_listcont[thisNum].contlist == '') {
				$('.ag_cont1').find('.t_aglist').hide();
			} else {
				$('.ag_cont1').find('.t_aglist').show();
				$('.ag_cont1').find('.t_aglist').empty().append(ag_listcont[thisNum].contlist);
			}
		}, 100)
	});

	

	// 资料中心
	

});

var random1 = Math.round(Math.random() * 100);
console.log(random1);
if(random1 < 25) {
	$(".di_fc_cont").css("background","url(images/01.png)")
} else
if(random1 < 50) {
$(".di_fc_cont").css("background","url(images/02.png)no-repeat")
}else
if(random1 < 75){
	$(".di_fc_cont").css("background","url(images/03.png)no-repeat")
}else
if(random1 < 100){
	$(".di_fc_cont").css("background","url(images/04.png)no-repeat")
}
