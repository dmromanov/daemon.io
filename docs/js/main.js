var body = document.body,
	docEl = document.documentElement;

function getPageHeight() {
	var scrollHeight = docEl.scrollHeight;
	var clientHeight = docEl.clientHeight;
	
	return Math.max(scrollHeight, clientHeight);
}

function getWindowHeight() {
	return docEl.clientHeight;
}
function getWindowWidth() {
	return docEl.clientWidth;
}

var getPageScroll = (window.pageXOffset !== undefined) ?
	function() {
		return {
			left: pageXOffset,
			top: pageYOffset
		};
	} :
	function() {
		var top = docEl.scrollTop || body && body.scrollTop || 0;
		top -= docEl.clientTop;

		var left = docEl.scrollLeft || body && body.scrollLeft || 0;
		left -= docEl.clientLeft;

		return { top: top, left: left };
	};

var getOffset = document.documentElement.getBoundingClientRect ?
	function(elem) {
		return getOffsetRect(elem);
	} :
	function(elem) {
		return getOffsetSum(elem);
	};

function getOffsetSum(elem) {
	var top=0, left=0;

	while(elem) {
		top = top + parseInt(elem.offsetTop, 10);
		left = left + parseInt(elem.offsetLeft, 10);
		elem = elem.offsetParent;
	}

	return {
		top: top,
		left: left
	};
}

function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect();

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0;
	var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return {
		top: Math.round(top),
		left: Math.round(left)
	};
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Аргументы:
// name
// 	название cookie
// value
// 	значение cookie (строка)
// options
// 	Объект с дополнительными свойствами для установки cookie:
// 	expires
// 		Время истечения cookie. Интерпретируется по-разному, в зависимости от типа:
// 		Число — количество секунд до истечения. Например, expires: 3600 — кука на час.
// 		Объект типа Date — дата истечения.
// 		Если expires в прошлом, то cookie будет удалено.
// 		Если expires отсутствует или 0, то cookie будет установлено как сессионное и исчезнет при закрытии браузера.
// 	path
// 		Путь для cookie.
// 	domain
// 		Домен для cookie.
// 	secure
// 		Если true, то пересылать cookie только по защищенному соединению.
function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires*1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for(var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}


$ && $(function(){
	var $win = $(window),
		$doc = $(document),
		$body = $('body'),
		global_lang = $('html').attr('lang');

	$('.toggle_sidebar_button').on('click', function(){
		$body.toggleClass('force_show_sidebar');
	});

	// hide sidebar on every click in menu (if small screen)
	$('.sidebar').on('click', 'a', function() {
		$body.removeClass('force_show_sidebar');
	});

	$doc
		.on('click', '.method code a', function(event) {
			event.stopPropagation();
		})
		.on('click', ':header[id] .anchor', function() {
			window.location = '#' + $(this).parent().attr('id');
		});

	//выбор языка
	(function(){
		var btn = $('#langchoose'),
			bar = $('.lang-chooser').eq(0);

		btn.on('click', function(event) {
			event.preventDefault();

			bar.stop().animate({
				top: bar.css('top') != '-50px' ? -50 : 35
			}, 300);
		});

		$('.lang-chooser a').on('click', function(event) {
			event.preventDefault();

			var href = $(this).attr('href'),
				langs = href.split('/');

			langs.pop();
			setCookie('lang', langs.pop(), {expires: 315360000, path: '/docs/'});

			window.location.href = href + window.location.hash;
			// btn.trigger('click');
		});
	})();

	// подсветка синтаксиса
	(function(){
		return;
		var phpTypes = {
			'boolean': 1,
			'integer': 1,
			'float': 1,
			'string': 1,
			'array': 1,
			'object': 1,
			'resource': 1,
			'null': 1,
			'callable': 1,
			'mixed': 'http://php.net/manual/'+ global_lang +'/language.pseudo-types.php#language.types.mixed',
			'number': 'http://php.net/manual/'+ global_lang +'/language.pseudo-types.php#language.types.number',
			'callback': 'http://php.net/manual/'+ global_lang +'/language.pseudo-types.php#language.types.callback',
			'void': 'http://php.net/manual/'+ global_lang +'/language.pseudo-types.php#language.types.void',

			'true': 'http://php.net/manual/'+ global_lang +'/language.types.boolean.php',
			'false': 'http://php.net/manual/'+ global_lang +'/language.types.boolean.php',

			'url': '#basics/pseudotypes/url'
		};

		var phpTypesKeys = [];
		for(var k in phpTypes) phpTypesKeys.push(k);
		// var reg = new RegExp('(^|[^\\w\\-\\/])('+phpTypesKeys.join('|')+')(?=[^\\w\\-\\/])', 'g');
		var reg = new RegExp('(^|\\(|\\( |\\,|\\, |\\||\\| )('+phpTypesKeys.join('|')+')(?=( \\$| \\&\\$| public| protected| private|\\||\\| ))', 'gm');

		// типы переменных делаем ссылками
		$('.method code').each(function(){
			var that = $(this),
				source = that.html();

			source = source.replace(reg, function(str, p1, p2) {
				if(phpTypes[p2] === 1) {
					return p1 + '<a class="type-link" href="http://php.net/manual/'+ global_lang +'/language.types.'+ p2 +'.php" target="_blank">'+ p2 + '</a>';
				}

				if (phpTypes[p2]) {
					var target = phpTypes[p2].charAt(0) === '#' ? '' : ' target="_blank"';
					return p1 + '<a class="type-link" href="'+ phpTypes[p2] +'"'+ target +'>'+ p2 + '</a>';
				}

				return p1 + p2;
			});

			that.html(source);

			// ссылка на githab у методов
			var pre = that.parent(),
				link = pre.data('link');

			if(link) {
				pre.prepend('<a target="_blank" class="method-link tpl-git" href="'+ link +'"><i class="fa fa-github"></i></a>');
			}
		});

		$("pre code, .code_highlight").each(function(i, block) {
			hljs.highlightBlock(block);
		});

		$("pre.spoiler code").each(function() {
			if(this.offsetHeight > 300) {
				var that = $(this);
				that.height(250);
				that.width( that.width() + 30 );
			}
		});

		$('.hljs-class .hljs-title a').addClass('hljs-title');
	})();

	var currLink = null,
		prevLink = null,
		currNavItem = null,
		prevNavItem = null,
		currNavLink = null,
		prevNavLink = null;

	var wrapSidebar = $('.sidebar'),
		wrapSidebarUl = wrapSidebar.children('ul').eq(0),
		wrapSidebarBtn = $('.sidebar-downbtn'),
		wrapMain = $('.main_wrap'),
		wrapNavWaypoints = $(':header[id], .anchor[id]'),
		wrapHeadvWaypoints = wrapNavWaypoints.filter(':header'),
		firstHeaderOffset = getOffset(wrapNavWaypoints.get(0)).top;
		// @TODO херед методов
		// wrapHeadvWaypoints = wrapNavWaypoints;

	var wrapMainhead = document.getElementById('mainhead');
	wrapMainhead.style.display = 'block';

	$(wrapMainhead).on('click', ':header', function() {
		window.location = '#' + $(this).data('id');
	});

	(function(){
		var scrollTo = 0;
		var lastPushedLink = '';

		// переход по разделам
		var pushState = $.debounce(500, false, function(){
			if(currLink !== lastPushedLink) {
				history.pushState(null, null, currLink);
				lastPushedLink = currLink;
			}
		});

		var scrollToDo = $.throttle(700, false, function(){
			wrapSidebar.stop().animate({
				scrollTop: scrollTo
			}, 200);
		});

		// кнопка сайдбара
		wrapSidebarBtn.on('click', function() {
			scrollTo = wrapSidebar.scrollTop() + 100;
			// scrollToDo();
			wrapSidebar.stop().animate({
				scrollTop: scrollTo
			}, 200);
		});

		var wrapSidebarBtnHasClass = false;
		var wrapSidebarScrollBtn = $.throttle(200, false, function(){
			if(wrapSidebar.scrollTop() >= wrapSidebarUl.height() - wrapSidebar.height()) {
				if(wrapSidebarBtnHasClass) {
					wrapSidebarBtn.removeClass('showbtn');
					wrapSidebarBtnHasClass = false;
				}
			} else {
				if(!wrapSidebarBtnHasClass) {
					wrapSidebarBtn.addClass('showbtn');
					wrapSidebarBtnHasClass = true;
				}
			}
		});

		wrapSidebar.on({
			scroll: function(event) {
				wrapSidebarScrollBtn();
			},
			mouseenter: function() {
				$body.css('overflow', 'hidden');
			},
			mouseleave: function() {
				$body.css('overflow', '');
			},
		});

		wrapSidebarScrollBtn();

		var wrapSidebarUlOffset, currNavItemRect, neighbor, neighborRect,
			rectTop, rectBot, winHeight;
			topMarg = 45;

		function setNavActive(header, dir) {
			prevNavLink = currNavLink;
			currNavLink = wrapSidebar.find('a[href="'+ currLink +'"]');

			prevNavItem = currNavItem;
			currNavItem = currNavLink.parent();

			if(prevNavLink) {
				prevNavLink.removeClass('active');
			}

			if(!currNavLink.length) {
				return;
			}

			currNavLink.addClass('active');

			currNavItem
				.children('ul').show()
				.children('li').children('ul').hide();
			currNavItem.parents('li').addBack().siblings('li').children('ul').hide();
			currNavItem.parents('ul').show();

			wrapSidebarUlOffset = wrapSidebarUl.offset();
			currNavItemRect = getOffset(currNavItem.get(0));
			rectTop = currNavItemRect.top - wrapSidebarUlOffset.top;
			rectBot = rectTop + currNavItem.height();
			neighbor = getNavElemV(dir === 'down' ? 'next' : 'prev').get(0);

			if(neighbor) {
				neighborRect = getOffset(neighbor);
				rectTop = Math.min(rectTop, neighborRect.top - wrapSidebarUlOffset.top);
				rectBot = Math.max(rectBot, neighborRect.top - wrapSidebarUlOffset.top + neighbor.clientHeight);
			}

			winHeight = getWindowHeight();
			scrollTo = (rectTop + rectBot - winHeight)/2 + topMarg;
			scrollToDo();
		}

		var headers_by_hash = {};
		function getHeaderByHash(hash, context) {
			if(headers_by_hash[hash]) {
				return headers_by_hash[hash];
			}

			var obj = $(hash.replace(/\//g, '\\/'), context);
			headers_by_hash[hash] = obj;
			return obj;
		}

		function getClearedHeadClone(elem) {
			return $(elem).clone().removeAttr('id').data('id', elem.id)[0];

			// @TODO херед методов
			// if(!obj.is('.method')) {
			// 	return obj.clone().removeAttr('id').data('id', obj.attr('id'));
			// }

			// var nav_item = getNavElemH('left').children('a');
			// if(!nav_item.length) {
			// 	return '';
			// }

			// var clone = getHeaderByHash(nav_item.attr('href')).clone();
			// if(!clone.length) {
			// 	return '';
			// }

			// var cloneDom = clone.get(0),
			// 	result = $('<h5 />'),
			// 	method_name = obj.find('code a[href^="#./"]').eq(0).text();

			// $(cloneDom.childNodes[0].childNodes[1]).prepend( cloneDom.childNodes[0].childNodes[0] );
			// clone = $(cloneDom);
			// clone.children('.in').prepend(method_name).appendTo(result);

			// return result;
		}

		var waypointOffset = 120;
		var topFromLevel = [0,60,58,56,54,52,50];

		function fixCurrHead(dir) {
			// console.log(+new Date(), 'fixCurrHead', dir, this.options.fixed);
			if (!this.element || getPageScroll().top < 0) {
				return;
			}
			if (dir === 'down' || dir === 'fake') {
				if (!this.options.fixed) {
					wrapMainhead.style.top = topFromLevel[this.options.headerLevel] + 'px';
					wrapMainhead.className = 'mainhead m-float';
					wrapMainhead.textContent = "";
					wrapMainhead.appendChild(getClearedHeadClone(this.element));
				}
			} else
			if (this.triggerPoint > -2) {
				fixPrevHead.apply(this, ['fake']);
			}
		}

		function fixPrevHead(dir) {
			// console.log(+new Date(), 'fixPrevHead', dir, this.options.fixed);
			if (!this.element) {
				return;
			}
			if (dir === 'down') {
				var elem = this.previous();
				if (!elem || wrapMainhead.className === 'mainhead m-fixed') {
					return;
				}
				wrapMainhead.style.top = (this.triggerPoint + topFromLevel[this.options.headerLevel]) + 'px';
				wrapMainhead.className = 'mainhead m-fixed';
				wrapMainhead.textContent = "";
				wrapMainhead.appendChild(getClearedHeadClone(elem.element));
			} else
			if (dir === 'fake') {
				var elem = this.next();
				if (!elem) {
					return;
				}
				var top = this.options.fixed
					? this.triggerPoint
					: elem.triggerPoint - (waypointOffset - topFromLevel[elem.options.headerLevel]);
				wrapMainhead.style.top = top + 'px';
				wrapMainhead.className = 'mainhead m-fixed';
				wrapMainhead.textContent = "";
				wrapMainhead.appendChild(getClearedHeadClone(this.element));
			} else
			if (this.triggerPoint > 0) {
				fixCurrHead.apply(this.previous(), ['fake']);
			}
		}

		// var callWaypointByHash = function() {
		// 	var hashObj, hash = window.location.hash;
		// 	if(hash) {
		// 		hashObj = getHeaderByHash(hash);
		// 	}

		// 	if(hashObj && hashObj.length) {
		// 		callbackNavWaypointsDebounce('down', hashObj.get(0));
		// 	}
		// 	else {
		// 		callbackNavWaypointsDebounce('down', wrapHeadvWaypoints.get(0));
		// 	}
		// };

		// var isCallbackNavWaypointsCalled = false;
		var callbackNavWaypoints = function(dir) { // elem
			// isCallbackNavWaypointsCalled = true;
			var point = (dir === 'up') ? (this.previous() || this) : this;
			prevLink = currLink;
			currLink = '#' + point.element.id;
			setNavActive(point.element, dir);
			pushState();
		};

		var callbackNavWaypointsDebounce = $.debounce(50, false, callbackNavWaypoints);

		var fixCurrHeadCallback = function(dir) {
			var point = (dir === 'up') ? (this.previous() || this) : this;
			fixCurrHead.apply(point, [dir]);
		};

		wrapNavWaypoints.each(function(i){
			var w = new Waypoint({
				element: this,
				handler: callbackNavWaypointsDebounce,
				group: 'nav'
			});
		});
		wrapHeadvWaypoints.each(function(i){
			new Waypoint({
				element: this,
				headerLevel: this.tagName.substr(1,1),
				handler: fixCurrHeadCallback,
				group: 'curr',
				fixed: 0
			});
		});
		wrapHeadvWaypoints.each(function(i){
			new Waypoint({
				element: this,
				headerLevel: this.tagName.substr(1,1),
				handler: fixPrevHead,
				offset: waypointOffset,
				group: 'prev',
				fixed: 0
			});
		});

		Waypoint.refreshAll();

		var group, waypoints;

		group = Waypoint.Group.findOrCreate({name:'curr',axis:'vertical'});
		waypoints = group.waypoints;
		for (var i = 0, end = waypoints.length; i < end; i++) {
			var w = waypoints[i];
			var p = w.previous();
			if(p && w.triggerPoint - p.triggerPoint < waypointOffset * 1.2) {
				p.options.fixed = 1;
			}
		}

		group = Waypoint.Group.findOrCreate({name:'prev',axis:'vertical'});
		waypoints = group.waypoints;
		for (var i = 0, end = waypoints.length; i < end; i++) {
			var w = waypoints[i];
			var p = w.previous();
			if(p && w.triggerPoint - p.triggerPoint < waypointOffset * 1.2) {
				p.options.fixed = 1;
			}
		}

		// $win.on('load.waypoints.extra', function() {
		// 	setTimeout(function(){
		// 		if(!isCallbackNavWaypointsCalled) {
		// 			callWaypointByHash();
		// 		}
		// 	}, 100);
		// });


		function getNavElemPrev(elem) {
			var curr = currNavItem,
				prev = null,
				sub = null;

			if(elem) {
				curr = elem;
			}

			if(!curr || !curr.length) {
				return $();
			}

			prev = curr.prev();
			if(prev.length) {
				sub = prev.find('li').last();
				if(sub.length) {
					return sub;
				}

				return prev;
			}

			curr = curr.parent('ul').parent('li');
			if(curr.length) {
				return curr;
			}

			return $();
		}

		// навигация клавиатурой
		function getNavElemV(dir, elem) {
			var curr = currNavItem,
				next = $();

			if(elem) {
				curr = elem;
			}

			while(true) {
				if(!curr || !curr.length) break;

				next = curr[dir]();
				if(!next.length) {
					curr = curr.parent('ul').parent('li');

					if(dir === 'prev') {
						next = curr;
						break;
					}

					continue;
				}

				break;
			}

			return next;
		}

		function getNavElemH(dir, elem) {
			var curr = currNavItem,
				next = $();

			if(elem) {
				curr = elem;
			}

			if(dir === 'right') {
				next = curr.children('ul').eq(0).children('li').eq(0);

				if(!next.length) {
					return getNavElemV('next');
				}
			}
			else {
				next = curr.parent('ul').parent('li');

				if(!next.length) {
					return getNavElemV('prev');
				}
			}

			return next;
		}

		function vMove(dir) {
			var next = getNavElemV(dir);
			var url = next.children('a').eq(0).attr('href');

			if(url) {
				window.location = url;
			}
		}

		function hMove(dir) {
			var next = getNavElemH(dir);
			var url = next.children('a').eq(0).attr('href');

			if(url) {
				window.location = url;
			}
		}

		$doc.keydown(function(event) {
			var superKey = event.ctrlKey || event.altKey;

			// left
			if(superKey && event.which === 37) {
				event.preventDefault();
				hMove('left');
			}
			else
			// right
			if(superKey && event.which === 39) {
				event.preventDefault();
				hMove('right');
			}
			else
			// up
			if(superKey && event.which === 38) {
				event.preventDefault();
				vMove('prev');
			}
			else
			// down
			if(superKey && event.which === 40) {
				event.preventDefault();
				vMove('next');
			}
		});
	})();
});