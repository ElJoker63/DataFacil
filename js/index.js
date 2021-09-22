// JavaScript Document
$(function(){
	//仿锤子官网主页3D动画
	/*
	 *		鼠标位置对应旋转角度正负
	 * 		+-	++
	 *		--	-+
	 * */
	if(typeof requestAnimationFrame != 'undefined')
	{
		var animating = !1, duration = .3, mouseX, mouseY, af, g = 10, f = 0, h = 0,
			k = {
				element: null,
				x: 0,
				y: 0,
				initX: 0,
				initY: 0,
				rotationX: 0,
				rotationY: 0,
				depth: 1,
				transformCss: !0
			},
			b = $.extend({}, k,{
				element: $('#animate-3d .animate-item')
			}),
			z1 = $.extend({}, k,{
				element: $('#animate-3d .animate-item h2'),
				depth: -1.4
			}),
			z2 = $.extend({}, k,{
				element: $('#animate-3d .animate-item p'),
				depth: -.8
			}),
			w = { x: 0, y: 0 }
		function trans3d(e){
			e.x += (e.initX + h / 20 * e.depth - e.x) / g;
			e.y += (e.initY - f / 50 * e.depth - e.y) / g;
		}
		function change3d(e, t, n) {
			var i = {},
				o = {},
				t = t || 0,
				n = n || "";
			i.x = e.x || 0, i.y = e.y || 0, o.x = -e.rotationX.toFixed(5) || 0, o.y = -e.rotationY.toFixed(5) || 0;
			var a = [];
			i.x && i.y && a.push("translate3d( " + i.x + "px, " + i.y + "px, 0px)"), o.x && o.y && a.push("rotateX(" + o.x + "deg) rotateY(" + o.y + "deg)");
			var r = [];
			e.opacityCss && r.push(m.duration + "s opacity " + n), e.transformCss && r.push(t + "s transform " + n);
			var s = {
				transform: a.join(" ")
			};
			s.transition = r.join(", "), e.element.css(s)
		}
		function looping(e){//动画回调
			if(animating)
			{
				if(mouseX && mouseY)
				{
					h = (w.x - mouseX) / 2;
					f = (mouseY - w.y) / 1.5;
					b.rotationX += (f / 20 - b.rotationX) / g,
					b.rotationY += (h / 50 - b.rotationY) / g,
					change3d(b, 0);
					trans3d(z1);
					change3d(z1, 0);
					trans3d(z2);
					change3d(z2, 0);
				}
				af = requestAnimationFrame(looping);
			}
		}
		$('#animate-3d').mouseenter(function(e){
			animating = !0;
			w.x = b.element.offset().left + b.element.width() / 2;
			w.y = b.element.offset().top + b.element.height() / 2;
			b.element.addClass("animating");
			looping();
		}).mousemove(function(e){
			mouseX = e.pageX;
			mouseY = e.pageY;
		}).mouseleave(function(e){
			cancelAnimationFrame(af);
			animating = !1;
			b.element.removeClass("animating");
			b.rotationX = 0, b.rotationY = 0;
			change3d(b, duration, "ease-in-out")
			setTimeout(function(){
				b.element.removeAttr('style');
			}, 1e3 * duration);
			z1.x = 0, z1.y = 0
			change3d(z1, duration, "ease-in-out");
			z2.x = 0, z2.y = 0
			change3d(z2, duration, "ease-in-out");
		});
		//仿小米官网    banner动画   偏移动画
		/*var maxOffset = { x:50, y: 20 };
		var nowOffset = { x: 0, y: 0 };
		var targetOffset = { x: 0, y: 0 };
		var screenSize = { width: $(window).width(), height: $(window).height() }
		var speedOffset = 10;
		var oaf;
		var banners = [//各元素信息
			{ name: 'store img', left: 110, top: 220 }
		];
		var loopingOffset = function(e){
			nowOffset.x += (targetOffset.x - nowOffset.x) / speedOffset;
			nowOffset.y += (targetOffset.y - nowOffset.y) / speedOffset;
			$.each(banners, function(i, v){
				$('.' + v.name).css({
					position: 'absolute',
					left: v.left,
					top: v.top,
					transform: 'translate3d(' + nowOffset.x + 'px, ' + nowOffset.y + 'px, 0px)',
					margin: 0,
					transition: 'all 0s'
				});
			});
		}
		var stopOffset = function(){
			$.each(banners, function(i, v){
				$('.' + v.name).removeAttr('style');
			});
			nowOffset = { x: 0, y: 0 };
			cancelAnimationFrame(oaf);
		}
		$('body').mousemove(function(e){
			if(screenSize.width > 1200)
			{
				targetOffset.x = e.screenX / screenSize.width > 0.5 ? -Math.abs(screenSize.width / 2 - e.screenX) / (screenSize.width / 2) * maxOffset.x : Math.abs(screenSize.width / 2 - e.screenX) / (screenSize.width / 2) * maxOffset.x;
				targetOffset.y = e.screenY / screenSize.height > 0.5 ? -Math.abs(screenSize.height / 2 - e.screenY) / (screenSize.height / 2) * maxOffset.y : Math.abs(screenSize.height / 2 - e.screenY) / (screenSize.height / 2) * maxOffset.y;
				oaf = requestAnimationFrame(loopingOffset);
			}
		}).mouseleave(function(){
			stopOffset();
		});
		$(window).resize(function(e){
			screenSize = { width: $(window).width(), height: $(window).height() };
			if(screenSize.width < 1200)
				stopOffset();
		});*/
		//升降动画
		var sWindowScrollTop = 0, saf, sDoms = [], smm = 0.1,
		sWindowHalfHeight = $(window).height() / 2,
		sFrame = function(e){
			sWindowHalfHeight = $(window).height() / 2;
			sWindowScrollTop = $(window).scrollTop() + sWindowHalfHeight;
			$.each(sDoms, function(i, v){
				var targetY = (v.direction > 0 ? (sWindowScrollTop - v.ly) : (v.ly - sWindowScrollTop)) / sWindowHalfHeight * v.my;
				if(Math.abs(targetY - v.ny) > 1)
				{
					var t = (targetY - v.ny) / v.speed;
					t = t > 0 ? Math.max(t, smm) : Math.min(t, -smm);
					v.ny += t;
					v.dom.css({
						transform: 'translate3d(0px, ' + v.ny + 'px, 0px)'
					});
				}
			});
			saf = requestAnimationFrame(sFrame);
		};
		sDoms.push({ dom: $('.store img'), ny:0, ly: $('.store img').offset().top + $('.store img').height() / 2, my: 25, speed: 6, direction: 1 });
		//sDoms.push({ dom: $('.flash .flash_img_01'), ny:0, ly: $('.flash .flash_img_01').offset().top + $('.flash .flash_img_01').height() / 2, my: 40, speed: 6, direction: -1 });
		sDoms.push({ dom: $('.flash .flash_img_02'), ny:0, ly: $('.flash .flash_img_02').offset().top + $('.flash .flash_img_02').height() / 2, my: 15, speed: 6, direction: -1 });
		sDoms.push({ dom: $('.flash .flash_img_03'), ny:0, ly: $('.flash .flash_img_03').offset().top + $('.flash .flash_img_03').height() / 2, my: 38, speed: 6, direction: -1 });
		sFrame();
	}
});