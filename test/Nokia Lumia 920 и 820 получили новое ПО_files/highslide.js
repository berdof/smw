/******************************************************************************
Name:    Highslide JS
Version: 4.1.2 (March 27 2009)
Config:  default
Author:  Torstein Hшnsi
Support: http://highslide.com/support

Licence:
Highslide JS is licensed under a Creative Commons Attribution-NonCommercial 2.5
License (http://creativecommons.org/licenses/by-nc/2.5/).

You are free:
	* to copy, distribute, display, and perform the work
	* to make derivative works

Under the following conditions:
	* Attribution. You must attribute the work in the manner  specified by  the
	  author or licensor.
	* Noncommercial. You may not use this work for commercial purposes.

* For  any  reuse  or  distribution, you  must make clear to others the license
  terms of this work.
* Any  of  these  conditions  can  be  waived  if  you  get permission from the 
  copyright holder.

Your fair use and other rights are in no way affected by the above.
******************************************************************************/
var hs = {
// Language strings
lang : {
	cssDirection: 'ltr',
	loadingText : '��������...',
	loadingTitle : '',
	focusTitle : 'Click to bring to front',
	fullExpandTitle : '���������',
	creditsText : 'mobiltelefon.ru',
	creditsTitle : '',
	restoreTitle : ''
},
// See http://highslide.com/ref for examples of settings  
graphicsDir : 'highslide/graphics/',
expandCursor : 'zoomin.cur', // null disables
restoreCursor : 'zoomout.cur', // null disables
expandDuration : 250, // milliseconds
restoreDuration : 250,
marginLeft : 15,
marginRight : 15,
marginTop : 15,
marginBottom : 15,
zIndexCounter : 1001, // adjust to other absolutely positioned elements
loadingOpacity : 0.75,
allowMultipleInstances: true,
numberOfImagesToPreload : 5,
outlineWhileAnimating : 2, // 0 = never, 1 = always, 2 = HTML only 
outlineStartOffset : 3, // ends at 10
padToMinWidth : false, // pad the popup width to make room for wide caption
fullExpandPosition : 'bottom right',
fullExpandOpacity : 1,
showCredits : true, // you can set this to false if you want
creditsHref : 'http://mobiltelefon.ru/',
enableKeyListener : true,
openerTagNames : ['a'], // Add more to allow slideshow indexing

dragByHeading: true,
minWidth: 240,/*200,*/
minHeight: 200,
allowSizeReduction: true, // allow the image to reduce to fit client size. If false, this overrides minWidth and minHeight
outlineType : 'drop-shadow', // set null to disable outlines
wrapperClassName : 'highslide-wrapper', // for enhanced css-control
// END OF YOUR SETTINGS


// declare internal properties
preloadTheseImages : [],
continuePreloading: true,
expanders : [],
overrides : [
	'allowSizeReduction',
	'useBox',
	'outlineType',
	'outlineWhileAnimating',
	'captionId',
	'captionText',
	'captionEval',
	'captionOverlay',
	'headingId',
	'headingText',
	'headingEval',
	'headingOverlay',
	'dragByHeading',
	
	'width',
	'height',
	
	'wrapperClassName',
	'minWidth',
	'minHeight',
	'maxWidth',
	'maxHeight',
	'slideshowGroup',
	'easing',
	'easingClose',
	'fadeInOut',
	'src'
],
overlays : [],
idCounter : 0,
oPos : {
	x: ['leftpanel', 'left', 'center', 'right', 'rightpanel'],
	y: ['above', 'top', 'middle', 'bottom', 'below']
},
mouse: {},
headingOverlay: {},
captionOverlay: {},
timers : [],

pendingOutlines : {},
clones : {},
uaVersion: parseFloat((navigator.userAgent.toLowerCase().match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1]),
ie : (document.all && !window.opera),
safari : /Safari/.test(navigator.userAgent),
geckoMac : /Macintosh.+rv:1\.[0-8].+Gecko/.test(navigator.userAgent),

$ : function (id) {
	if (id) return document.getElementById(id);
},

push : function (arr, val) {
	arr[arr.length] = val;
},

createElement : function (tag, attribs, styles, parent, nopad) {
	var el = document.createElement(tag);
	if (attribs) hs.extend(el, attribs);
	if (nopad) hs.setStyles(el, {padding: 0, border: 'none', margin: 0});
	if (styles) hs.setStyles(el, styles);
	if (parent) parent.appendChild(el);	
	return el;
},

extend : function (el, attribs) {
	for (var x in attribs) el[x] = attribs[x];
	return el;
},

setStyles : function (el, styles) {
	for (var x in styles) {
		if (hs.ie && x == 'opacity') {
			if (styles[x] > 0.99) el.style.removeAttribute('filter');
			else el.style.filter = 'alpha(opacity='+ (styles[x] * 100) +')';
		}
		else el.style[x] = styles[x];
	}
},
animate: function(el, prop, opt) {
	var start,
		end,
		unit;
	if (typeof opt != 'object' || opt === null) {
		var args = arguments;
		opt = {
			duration: args[2],
			easing: args[3],
			complete: args[4]
		};
	}
	if (typeof opt.duration != 'number') opt.duration = 250;
	opt.easing = Math[opt.easing] || Math.easeInQuad;
	opt.curAnim = hs.extend({}, prop);
	for (var name in prop) {
		var e = new hs.fx(el, opt , name );
		
		start = parseFloat(hs.css(el, name)) || 0;
		end = parseFloat(prop[name]);
		unit = name != 'opacity' ? 'px' : '';
		
		e.custom( start, end, unit );
	}	
},
css: function(el, prop) {
	if (document.defaultView) {
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);

	} else {
		if (prop == 'opacity') prop = 'filter';
		var val = el.currentStyle[prop.replace(/\-(\w)/g, function (a, b){ return b.toUpperCase(); })];
		if (prop == 'filter') 
			val = val.replace(/alpha\(opacity=([0-9]+)\)/, 
				function (a, b) { return b / 100 });
		return val === '' ? 1 : val;
	} 
},

getPageSize : function () {
	var d = document, w = window, iebody = d.compatMode && d.compatMode != 'BackCompat' 
		? d.documentElement : d.body;
	
	var width = hs.ie ? iebody.clientWidth : 
			(d.documentElement.clientWidth || self.innerWidth),
		height = hs.ie ? iebody.clientHeight : self.innerHeight;
	
	return {
		width: width,
		height: height,		
		scrollLeft: hs.ie ? iebody.scrollLeft : pageXOffset,
		scrollTop: hs.ie ? iebody.scrollTop : pageYOffset
	}
},

getPosition : function(el)	{
	var p = { x: el.offsetLeft, y: el.offsetTop };
	while (el.offsetParent)	{
		el = el.offsetParent;
		p.x += el.offsetLeft;
		p.y += el.offsetTop;
		if (el != document.body && el != document.documentElement) {
			p.x -= el.scrollLeft;
			p.y -= el.scrollTop;
		}
	}
	return p;
},

expand : function(a, params, custom, type) {
	if (!a) a = hs.createElement('a', null, { display: 'none' }, hs.container);
	if (typeof a.getParams == 'function') return params;	
	try {	
		new hs.Expander(a, params, custom);
		return false;
	} catch (e) { return true; }
},


focusTopmost : function() {
	var topZ = 0, 
		topmostKey = -1,
		expanders = hs.expanders,
		exp,
		zIndex;
	for (var i = 0; i < expanders.length; i++) {
		exp = expanders[i];
		if (exp) {
			zIndex = exp.wrapper.style.zIndex;
			if (zIndex && zIndex > topZ) {
				topZ = zIndex;				
				topmostKey = i;
			}
		}
	}
	if (topmostKey == -1) hs.focusKey = -1;
	else expanders[topmostKey].focus();
},

getParam : function (a, param) {
	a.getParams = a.onclick;
	var p = a.getParams ? a.getParams() : null;
	a.getParams = null;
	
	return (p && typeof p[param] != 'undefined') ? p[param] : 
		(typeof hs[param] != 'undefined' ? hs[param] : null);
},

getSrc : function (a) {
	var src = hs.getParam(a, 'src');
	if (src) return src;
	return a.href;
},

getNode : function (id) {
	var node = hs.$(id), clone = hs.clones[id], a = {};
	if (!node && !clone) return null;
	if (!clone) {
		clone = node.cloneNode(true);
		clone.id = '';
		hs.clones[id] = clone;
		return node;
	} else {
		return clone.cloneNode(true);
	}
},

discardElement : function(d) {
	hs.garbageBin.appendChild(d);
	hs.garbageBin.innerHTML = '';
},
transit : function (adj, exp) {
	var last = exp = exp || hs.getExpander();
	if (hs.upcoming) return false;
	else hs.last = last;
	try {
		hs.upcoming = adj;
		adj.onclick(); 		
	} catch (e){
		hs.last = hs.upcoming = null;
	}
	try {
		exp.close();
	} catch (e) {}
	return false;
},

previousOrNext : function (el, op) {
	var exp = hs.getExpander(el);
	if (exp) {
		adj = exp.getAdjacentAnchor(op);
		return hs.transit(adj, exp);
	} else return false;
},

previous : function (el) {
	return hs.previousOrNext(el, -1);
},

next : function (el) {
	return hs.previousOrNext(el, 1);	
},

keyHandler : function(e) {
	if (!e) e = window.event;
	if (!e.target) e.target = e.srcElement; // ie
	if (typeof e.target.form != 'undefined') return true; // form element has focus
	var exp = hs.getExpander();
	
	var op = null;
	switch (e.keyCode) {
		case 70: // f
			if (exp) exp.doFullExpand();
			return true;
		case 32: // Space
		case 34: // Page Down
		case 39: // Arrow right
		case 40: // Arrow down
			op = 1;
			break;
		case 8:  // Backspace
		case 33: // Page Up
		case 37: // Arrow left
		case 38: // Arrow up
			op = -1;
			break;
		case 27: // Escape
		case 13: // Enter
			op = 0;
	}
	if (op !== null) {hs.removeEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);
		if (!hs.enableKeyListener) return true;
		
		if (e.preventDefault) e.preventDefault();
    	else e.returnValue = false;
    	if (exp) {
			if (op == 0) {
				exp.close();
			} else {
				hs.previousOrNext(exp.key, op);
			}
			return false;
		}
	}
	return true;
},


registerOverlay : function (overlay) {
	hs.push(hs.overlays, hs.extend(overlay, { hsId: 'hsId'+ hs.idCounter++ } ));
},


getWrapperKey : function (element, expOnly) {
	var el, re = /^highslide-wrapper-([0-9]+)$/;
	// 1. look in open expanders
	el = element;
	while (el.parentNode)	{
		if (el.id && re.test(el.id)) return el.id.replace(re, "$1");
		el = el.parentNode;
	}
	// 2. look in thumbnail
	if (!expOnly) {
		el = element;
		while (el.parentNode)	{
			if (el.tagName && hs.isHsAnchor(el)) {
				for (var key = 0; key < hs.expanders.length; key++) {
					var exp = hs.expanders[key];
					if (exp && exp.a == el) return key;
				}
			}
			el = el.parentNode;
		}
	}
	return null; 
},

getExpander : function (el, expOnly) {
	if (typeof el == 'undefined') return hs.expanders[hs.focusKey] || null;
	if (typeof el == 'number') return hs.expanders[el] || null;
	if (typeof el == 'string') el = hs.$(el);
	return hs.expanders[hs.getWrapperKey(el, expOnly)] || null;
},

isHsAnchor : function (a) {
	return (a.onclick && a.onclick.toString().replace(/\s/g, ' ').match(/hs.(htmlE|e)xpand/));
},

reOrder : function () {
	for (var i = 0; i < hs.expanders.length; i++)
		if (hs.expanders[i] && hs.expanders[i].isExpanded) hs.focusTopmost();
},

mouseClickHandler : function(e) 
{	
	if (!e) e = window.event;
	if (e.button > 1) return true;
	if (!e.target) e.target = e.srcElement;
	
	var el = e.target;
	while (el.parentNode
		&& !(/highslide-(image|move|html|resize)/.test(el.className)))
	{
		el = el.parentNode;
	}
	var exp = hs.getExpander(el);
	if (exp && (exp.isClosing || !exp.isExpanded)) return true;
		
	if (exp && e.type == 'mousedown') {
		if (e.target.form) return true;
		var match = el.className.match(/highslide-(image|move|resize)/);
		if (match) {
			hs.dragArgs = { exp: exp , type: match[1], left: exp.x.pos, width: exp.x.size, top: exp.y.pos, 
				height: exp.y.size, clickX: e.clientX, clickY: e.clientY };
			
			
			hs.addEventListener(document, 'mousemove', hs.dragHandler);
			if (e.preventDefault) e.preventDefault(); // FF
			
			if (/highslide-(image|html)-blur/.test(exp.content.className)) {
				exp.focus();
				hs.hasFocused = true;
			}
			return false;
		}
	} else if (e.type == 'mouseup') {
		
		hs.removeEventListener(document, 'mousemove', hs.dragHandler);
		
		if (hs.dragArgs) {
			if (hs.styleRestoreCursor && hs.dragArgs.type == 'image') 
				hs.dragArgs.exp.content.style.cursor = hs.styleRestoreCursor;
			var hasDragged = hs.dragArgs.hasDragged;
			
			if (!hasDragged &&!hs.hasFocused && !/(move|resize)/.test(hs.dragArgs.type)) {
				exp.close();
			} 
			else if (hasDragged || (!hasDragged && hs.hasHtmlExpanders)) {
				hs.dragArgs.exp.doShowHide('hidden');
			}
			
			hs.hasFocused = false;
			hs.dragArgs = null;
		
		} else if (/highslide-image-blur/.test(el.className)) {
			el.style.cursor = hs.styleRestoreCursor;		
		}
	}
	return false;
},

dragHandler : function(e)
{
	if (!hs.dragArgs) return true;
	if (!e) e = window.event;
	var a = hs.dragArgs, exp = a.exp;
	
	a.dX = e.clientX - a.clickX;
	a.dY = e.clientY - a.clickY;	
	
	var distance = Math.sqrt(Math.pow(a.dX, 2) + Math.pow(a.dY, 2));
	if (!a.hasDragged) a.hasDragged = (a.type != 'image' && distance > 0)
		|| (distance > (hs.dragSensitivity || 5));
	
	if (a.hasDragged && e.clientX > 5 && e.clientY > 5) {
		
		if (a.type == 'resize') exp.resize(a);
		else {
			exp.moveTo(a.left + a.dX, a.top + a.dY);
			if (a.type == 'image') exp.content.style.cursor = 'move';
		}
	}
	return false;
},

wrapperMouseHandler : function (e) {
	try {
		if (!e) e = window.event;
		var over = /mouseover/i.test(e.type); 
		if (!e.target) e.target = e.srcElement; // ie
		if (hs.ie) e.relatedTarget = 
			over ? e.fromElement : e.toElement; // ie
		var exp = hs.getExpander(e.target);
		if (!exp.isExpanded) return;
		if (!exp || !e.relatedTarget || hs.getExpander(e.relatedTarget, true) == exp 
			|| hs.dragArgs) return;
		for (var i = 0; i < exp.overlays.length; i++) (function() {
			var o = hs.$('hsId'+ exp.overlays[i]);
			if (o && o.hideOnMouseOut) {
				if (over) hs.setStyles(o, { visibility: 'visible' });
				hs.animate(o, { opacity: over ? o.opacity : 0 }, o.dur, null, 
					over ? null : function() { hs.setStyles(o, { visibility: 'hidden' })});
			}
		})();	
	} catch (e) {}
},
addEventListener : function (el, event, func) {
	try {
		el.addEventListener(event, func, false);
	} catch (e) {
		try {
			el.detachEvent('on'+ event, func);
			el.attachEvent('on'+ event, func);
		} catch (e) {
			el['on'+ event] = func;
		}
	} 
},

removeEventListener : function (el, event, func) {
	try {
		el.removeEventListener(event, func, false);
	} catch (e) {
		try {
			el.detachEvent('on'+ event, func);
		} catch (e) {
			el['on'+ event] = null;
		}
	}
},

preloadFullImage : function (i) {
	if (hs.continuePreloading && hs.preloadTheseImages[i] && hs.preloadTheseImages[i] != 'undefined') {
		var img = document.createElement('img');
		img.onload = function() { 
			img = null;
			hs.preloadFullImage(i + 1);
		};
		img.src = hs.preloadTheseImages[i];
	}
},
preloadImages : function (number) {
	if (number && typeof number != 'object') hs.numberOfImagesToPreload = number;
	
	var arr = hs.getAnchors();
	for (var i = 0; i < arr.images.length && i < hs.numberOfImagesToPreload; i++) {
		hs.push(hs.preloadTheseImages, hs.getSrc(arr.images[i]));
	}
	
	// preload outlines
	if (hs.outlineType)	new hs.Outline(hs.outlineType, function () { hs.preloadFullImage(0)} );
	else
	
	hs.preloadFullImage(0);
	
	// preload cursor
	if (hs.restoreCursor) var cur = hs.createElement('img', { src: hs.graphicsDir + hs.restoreCursor });
},


init : function () {
	if (!hs.container) {
	
		hs.page = hs.getPageSize();
		hs.ieLt7 = hs.ie && hs.uaVersion < 7;
		for (var x in hs.langDefaults) {
			if (typeof hs[x] != 'undefined') hs.lang[x] = hs[x];
			else if (typeof hs.lang[x] == 'undefined' && typeof hs.langDefaults[x] != 'undefined') 
				hs.lang[x] = hs.langDefaults[x];
		}
		
		hs.container = hs.createElement('div', {
				className: 'highslide-container'
			}, {
				position: 'absolute', 
				left: 0, 
				top: 0, 
				width: '100%', 
				zIndex: hs.zIndexCounter,
				direction: 'ltr'
			}, 
			document.body,
			true
		);
		hs.loading = hs.createElement('a', {
				className: 'highslide-loading',
				title: hs.lang.loadingTitle,
				innerHTML: hs.lang.loadingText,
				href: 'javascript:;'
			}, {
				position: 'absolute',
				top: '-9999px',
				opacity: hs.loadingOpacity,
				zIndex: 1
			}, hs.container
		);
		hs.garbageBin = hs.createElement('div', null, { display: 'none' }, hs.container);
		
		// http://www.robertpenner.com/easing/ 
		Math.linearTween = function (t, b, c, d) {
			return c*t/d + b;
		};
		Math.easeInQuad = function (t, b, c, d) {
			return c*(t/=d)*t + b;
		};
		
		hs.hideSelects = hs.ieLt7;
		hs.hideIframes = ((window.opera && hs.uaVersion < 9) || navigator.vendor == 'KDE' 
			|| (hs.ie && hs.uaVersion < 5.5));
	}
},
domReady : function() {
	hs.isDomReady = true;
	if (hs.onDomReady) hs.onDomReady();
},

updateAnchors : function() {
	var el, els, all = [], images = [],groups = {}, re;
		
	for (var i = 0; i < hs.openerTagNames.length; i++) {
		els = document.getElementsByTagName(hs.openerTagNames[i]);
		for (var j = 0; j < els.length; j++) {
			el = els[j];
			re = hs.isHsAnchor(el);
			if (re) {
				hs.push(all, el);
				if (re[0] == 'hs.expand') hs.push(images, el);
				var g = hs.getParam(el, 'slideshowGroup') || 'none';
				if (!groups[g]) groups[g] = [];
				hs.push(groups[g], el);
			}
		}
	}
	hs.anchors = { all: all, groups: groups, images: images };
	return hs.anchors;
	
},

getAnchors : function() {
	return hs.anchors || hs.updateAnchors();
},


close : function(el) {
	var exp = hs.getExpander(el);
	if (exp) exp.close();
	return false;
}
}; // end hs object
hs.fx = function( elem, options, prop ){
	this.options = options;
	this.elem = elem;
	this.prop = prop;

	if (!options.orig) options.orig = {};
};
hs.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		(hs.fx.step[this.prop] || hs.fx.step._default)(this);
		
		if (this.options.step)
			this.options.step.call(this.elem, this.now, this);

	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = (new Date()).getTime();
		this.start = from;
		this.end = to;
		this.unit = unit;// || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && hs.timers.push(t) == 1 ) {
			hs.timerId = setInterval(function(){
				var timers = hs.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval(hs.timerId);
				}
			}, 13);
		}
	},


	// Each step of an animation
	step: function(gotoEnd){
		var t = (new Date()).getTime();
		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {	
				// Execute the complete function
				if (this.options.complete) this.options.complete.call(this.elem);
			}
			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = this.options.easing(n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}
		return true;
	}

};

hs.extend( hs.fx, {
	step: {

		opacity: function(fx){
			hs.setStyles(fx.elem, { opacity: fx.now });
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});

hs.Outline =  function (outlineType, onLoad) {
	this.onLoad = onLoad;
	this.outlineType = outlineType;
	var v = hs.uaVersion, tr;
	
	this.hasAlphaImageLoader = hs.ie && v >= 5.5 && v < 7;
	if (!outlineType) {
		if (onLoad) onLoad();
		return;
	}
	
	hs.init();
	this.table = hs.createElement(
		'table', { 
			cellSpacing: 0 
		}, {
			visibility: 'hidden',
			position: 'absolute',
			borderCollapse: 'collapse',
			width: 0
		},
		hs.container,
		true
	);
	var tbody = hs.createElement('tbody', null, null, this.table, 1);
	
	this.td = [];
	for (var i = 0; i <= 8; i++) {
		if (i % 3 == 0) tr = hs.createElement('tr', null, { height: 'auto' }, tbody, true);
		this.td[i] = hs.createElement('td', null, null, tr, true);
		var style = i != 4 ? { lineHeight: 0, fontSize: 0} : { position : 'relative' };
		hs.setStyles(this.td[i], style);
	}
	this.td[4].className = outlineType +' highslide-outline';
	
	this.preloadGraphic(); 
};

hs.Outline.prototype = {
preloadGraphic : function () {
	var src = hs.graphicsDir + (hs.outlinesDir || "outlines/")+ this.outlineType +".png";
				
	var appendTo = hs.safari ? hs.container : null;
	this.graphic = hs.createElement('img', null, { position: 'absolute', 
		top: '-9999px' }, appendTo, true); // for onload trigger
	
	var pThis = this;
	this.graphic.onload = function() { pThis.onGraphicLoad(); };
	
	this.graphic.src = src;
},

onGraphicLoad : function () {
	var o = this.offset = this.graphic.width / 4,
		pos = [[0,0],[0,-4],[-2,0],[0,-8],0,[-2,-8],[0,-2],[0,-6],[-2,-2]],
		dim = { height: (2*o) +'px', width: (2*o) +'px' };
	for (var i = 0; i <= 8; i++) {
		if (pos[i]) {
			if (this.hasAlphaImageLoader) {
				var w = (i == 1 || i == 7) ? '100%' : this.graphic.width +'px';
				var div = hs.createElement('div', null, { width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}, this.td[i], true);
				hs.createElement ('div', null, { 
						filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale, src='"+ this.graphic.src + "')", 
						position: 'absolute',
						width: w, 
						height: this.graphic.height +'px',
						left: (pos[i][0]*o)+'px',
						top: (pos[i][1]*o)+'px'
					}, 
				div,
				true);
			} else {
				hs.setStyles(this.td[i], { background: 'url('+ this.graphic.src +') '+ (pos[i][0]*o)+'px '+(pos[i][1]*o)+'px'});
			}
			
			if (window.opera && (i == 3 || i ==5)) 
				hs.createElement('div', null, dim, this.td[i], true);
			
			hs.setStyles (this.td[i], dim);
		}
	}
	this.graphic = null;
	if (hs.pendingOutlines[this.outlineType]) hs.pendingOutlines[this.outlineType].destroy();
	hs.pendingOutlines[this.outlineType] = this;
	if (this.onLoad) this.onLoad();
},
	
setPosition : function (pos, offset, vis, dur, easing) {
	var exp = this.exp,
		stl = exp.wrapper.style,
		offset = offset || 0,
		pos = pos || {
			x: exp.x.pos + offset,
			y: exp.y.pos + offset,
			w: exp.x.get('wsize') - 2 * offset,
			h: exp.y.get('wsize') - 2 * offset
		};
	if (vis) this.table.style.visibility = (pos.h >= 4 * this.offset) 
		? 'visible' : 'hidden';
	hs.setStyles(this.table, {
		left: (pos.x - this.offset) +'px',
		top: (pos.y - this.offset) +'px',
		width: (pos.w + 2 * this.offset) +'px'
	});
	
	pos.w -= 2 * this.offset;
	pos.h -= 2 * this.offset;
	hs.setStyles (this.td[4], {
		width: pos.w >= 0 ? pos.w +'px' : 0,
		height: pos.h >= 0 ? pos.h +'px' : 0
	});
	if (this.hasAlphaImageLoader) this.td[3].style.height 
		= this.td[5].style.height = this.td[4].style.height;	
	
},
	
destroy : function(hide) {
	if (hide) this.table.style.visibility = 'hidden';
	else hs.discardElement(this.table);
}
};

hs.Dimension = function(exp, dim) {
	this.exp = exp;
	this.dim = dim;
	this.ucwh = dim == 'x' ? 'Width' : 'Height';
	this.wh = this.ucwh.toLowerCase();
	this.uclt = dim == 'x' ? 'Left' : 'Top';
	this.lt = this.uclt.toLowerCase();
	this.ucrb = dim == 'x' ? 'Right' : 'Bottom';
	this.rb = this.ucrb.toLowerCase();
	this.p1 = this.p2 = 0;
};
hs.Dimension.prototype = {
get : function(key) {
	switch (key) {
		case 'loadingPos':
			return this.tpos + this.tb + (this.t - hs.loading['offset'+ this.ucwh]) / 2;
		case 'wsize':
			return this.size + 2 * this.cb + this.p1 + this.p2;
		case 'fitsize':
			return this.clientSize - this.marginMin - this.marginMax;
		case 'opos':
			return this.pos - (this.exp.outline ? this.exp.outline.offset : 0);
		case 'osize':
			return this.get('wsize') + (this.exp.outline ? 2*this.exp.outline.offset : 0);
		case 'imgPad':
			return this.imgSize ? Math.round((this.size - this.imgSize) / 2) : 0;
		
	}
},
calcBorders: function() {
	// correct for borders
	this.cb = (this.exp.content['offset'+ this.ucwh] - this.t) / 2;
	this.marginMax = hs['margin'+ this.ucrb] + 2 * this.cb;
},
calcThumb: function() {
	this.t = this.exp.el[this.wh] ? parseInt(this.exp.el[this.wh]) : 
		this.exp.el['offset'+ this.ucwh];
	this.tpos = this.exp.tpos[this.dim];
	this.tb = (this.exp.el['offset'+ this.ucwh] - this.t) / 2;
	if (this.tpos == 0) {
		this.tpos = (hs.page[this.wh] / 2) + hs.page['scroll'+ this.uclt];		
	};
},
calcExpanded: function() {
	var exp = this.exp;
	this.justify = 'auto';
	
	
	// size and position
	this.pos = this.tpos - this.cb + this.tb;
	this.size = Math.min(this.full, exp['max'+ this.ucwh] || this.full);
	this.minSize = exp.allowSizeReduction ? 
		Math.min(exp['min'+ this.ucwh], this.full) :this.full;
	if (exp.isImage && exp.useBox)	{
		this.size = exp[this.wh];
		this.imgSize = this.full;
	}
	if (this.dim == 'x' && hs.padToMinWidth) this.minSize = exp.minWidth;
	this.marginMin = hs['margin'+ this.uclt];
	this.scroll = hs.page['scroll'+ this.uclt];
	this.clientSize = hs.page[this.wh];
},
setSize: function(i) {
	var exp = this.exp;
	if (exp.isImage && (exp.useBox || hs.padToMinWidth)) {
		this.imgSize = i;
		this.size = Math.max(this.size, this.imgSize);
		exp.content.style[this.lt] = this.get('imgPad')+'px';
	} else
	this.size = i;

	exp.content.style[this.wh] = i +'px';
	exp.wrapper.style[this.wh] = this.get('wsize') +'px';
	if (exp.outline) exp.outline.setPosition();
	if (this.dim == 'x' && exp.overlayBox) exp.sizeOverlayBox(true);
},
setPos: function(i) {
	this.pos = i;
	this.exp.wrapper.style[this.lt] = i +'px';	
	
	if (this.exp.outline) this.exp.outline.setPosition();
	
}
};

hs.Expander = function(a, params, custom, contentType) {
	if (document.readyState && hs.ie && !hs.isDomReady) {
		hs.onDomReady = function() {
			new hs.Expander(a, params, custom, contentType);
		};
		return;
	} 
	this.a = a;
	this.custom = custom;
	this.contentType = contentType || 'image';
	this.isImage = !this.isHtml;
	
	hs.continuePreloading = false;
	this.overlays = [];
	hs.init();
	var key = this.key = hs.expanders.length;
	
	// override inline parameters
	for (var i = 0; i < hs.overrides.length; i++) {
		var name = hs.overrides[i];
		this[name] = params && typeof params[name] != 'undefined' ?
			params[name] : hs[name];
	}
	if (!this.src) this.src = a.href;
	
	// get thumb
	var el = (params && params.thumbnailId) ? hs.$(params.thumbnailId) : a;
	el = this.thumb = el.getElementsByTagName('img')[0] || el;
	this.thumbsUserSetId = el.id || a.id;
	
	// check if already open
	for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && hs.expanders[i].a == a) {
			hs.expanders[i].focus();
			return false;
		}
	}	

	// cancel other
	for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && hs.expanders[i].thumb != el && !hs.expanders[i].onLoadStarted) {
			hs.expanders[i].cancelLoading();
		}
	}
	hs.expanders[this.key] = this;
	if (!hs.allowMultipleInstances && !hs.upcoming) {
		if (hs.expanders[key-1]) hs.expanders[key-1].close();
		if (typeof hs.focusKey != 'undefined' && hs.expanders[hs.focusKey])
			hs.expanders[hs.focusKey].close();
	}
	
	// initiate metrics
	this.el = el;
	this.tpos = hs.getPosition(el);
	hs.page = hs.getPageSize();
	var x = this.x = new hs.Dimension(this, 'x');
	x.calcThumb();
	var y = this.y = new hs.Dimension(this, 'y');
	y.calcThumb();
	this.wrapper = hs.createElement(
		'div', {
			id: 'highslide-wrapper-'+ this.key,
			className: this.wrapperClassName
		}, {
			visibility: 'hidden',
			position: 'absolute',
			zIndex: hs.zIndexCounter++
		}, null, true );
	
	this.wrapper.onmouseover = this.wrapper.onmouseout = hs.wrapperMouseHandler;
	if (this.contentType == 'image' && this.outlineWhileAnimating == 2)
		this.outlineWhileAnimating = 0;
	
	// get the outline
	if (!this.outlineType) {
		this[this.contentType +'Create']();
	
	} else if (hs.pendingOutlines[this.outlineType]) {
		this.connectOutline();
		this[this.contentType +'Create']();
	
	} else {
		this.showLoading();
		var exp = this;
		new hs.Outline(this.outlineType, 
			function () {
				exp.connectOutline();
				exp[exp.contentType +'Create']();
			} 
		);
	}
	return true;
};

hs.Expander.prototype = {
error : function(e) {
	// alert ('Line '+ e.lineNumber +': '+ e.message);
	window.location.href = this.src;
},

connectOutline : function() {
	var outline = this.outline = hs.pendingOutlines[this.outlineType];
	outline.exp = this;
	outline.table.style.zIndex = this.wrapper.style.zIndex;
	hs.pendingOutlines[this.outlineType] = null;
},

showLoading : function() {
	if (this.onLoadStarted || this.loading) return;
	
	this.loading = hs.loading;
	var exp = this;
	this.loading.onclick = function() {
		exp.cancelLoading();
	};
	var exp = this, 
		l = this.x.get('loadingPos') +'px',
		t = this.y.get('loadingPos') +'px';
	setTimeout(function () { 
		if (exp.loading) hs.setStyles(exp.loading, { left: l, top: t, zIndex: hs.zIndexCounter++ })}
	, 100);
},

imageCreate : function() {
	var exp = this;
	
	var img = document.createElement('img');
    this.content = img;
    img.onload = function () {
    	if (hs.expanders[exp.key]) exp.contentLoaded(); 
	};
    if (hs.blockRightClick) img.oncontextmenu = function() { return false; };
    img.className = 'highslide-image';
    hs.setStyles(img, {
    	visibility: 'hidden',
    	display: 'block',
    	position: 'absolute',
		maxWidth: '9999px',
		zIndex: 3
	});
    img.title = hs.lang.restoreTitle;
    if (hs.safari) hs.container.appendChild(img);
    if (hs.ie && hs.flushImgSize) img.src = null;
	img.src = this.src;
	
	this.showLoading();
},

contentLoaded : function() {
	try {	
		if (!this.content) return;
		this.content.onload = null;
		if (this.onLoadStarted) return;
		else this.onLoadStarted = true;
		
		var x = this.x, y = this.y;
		
		if (this.loading) {
			hs.setStyles(this.loading, { top: '-9999px' });
			this.loading = null;
		}	
			x.full = this.content.width;
			y.full = this.content.height;
			
			hs.setStyles(this.content, {
				width: x.t +'px',
				height: y.t +'px'
			});
			this.wrapper.appendChild(this.content);
			hs.container.appendChild(this.wrapper);
		
		x.calcBorders();
		y.calcBorders();
		
		hs.setStyles (this.wrapper, {
			left: (x.tpos + x.tb - x.cb) +'px',
			top: (y.tpos + x.tb - y.cb) +'px'
		});
		this.getOverlays();
		
		var ratio = x.full / y.full;
		
		x.calcExpanded();
		this.justify(x);
		
		y.calcExpanded();
		this.justify(y);
		if (this.overlayBox) this.sizeOverlayBox(0, 1);
		
		if (this.allowSizeReduction) {
				this.correctRatio(ratio);
			if (this.isImage && this.x.full > (this.x.imgSize || this.x.size)) {
				this.createFullExpand();
				if (this.overlays.length == 1) this.sizeOverlayBox();
			}
		}
		this.show();
		
	} catch (e) {
		this.error(e);
	}
},

justify : function (p, moveOnly) {
	var tgtArr, tgt = p.target, dim = p == this.x ? 'x' : 'y';
	
		var hasMovedMin = false;
		
		var allowReduce = p.exp.allowSizeReduction;
			p.pos = Math.round(p.pos - ((p.get('wsize') - p.t) / 2));
		if (p.pos < p.scroll + p.marginMin) {
			p.pos = p.scroll + p.marginMin;
			hasMovedMin = true;		
		}
		if (!moveOnly && p.size < p.minSize) {
			p.size = p.minSize;
			allowReduce = false;
		}
		if (p.pos + p.get('wsize') > p.scroll + p.clientSize - p.marginMax) {
			if (!moveOnly && hasMovedMin && allowReduce) {
				p.size = p.get('fitsize'); // can't expand more
			} else if (p.get('wsize') < p.get('fitsize')) {
				p.pos = p.scroll + p.clientSize - p.marginMax - p.get('wsize');
			} else { // image larger than viewport
				p.pos = p.scroll + p.marginMin;
				if (!moveOnly && allowReduce) p.size = p.get('fitsize');
			}			
		}
		
		if (!moveOnly && p.size < p.minSize) {
			p.size = p.minSize;
			allowReduce = false;
		}
		
	
		
	if (p.pos < p.marginMin) {
		var tmpMin = p.pos;
		p.pos = p.marginMin; 
		
		if (allowReduce && !moveOnly) p.size = p.size - (p.pos - tmpMin);
		
	}
},

correctRatio : function(ratio) {
	var x = this.x, 
		y = this.y,
		changed = false,
		xSize = Math.min(x.full, x.size),
		ySize = Math.min(y.full, y.size),
		useBox = (this.useBox || hs.padToMinWidth);
	
	if (xSize / ySize > ratio) { // width greater
		xSize = ySize * ratio;
		if (xSize < x.minSize) { // below minWidth
			xSize = x.minSize;
			ySize = xSize / ratio;
		}
		changed = true;
	
	} else if (xSize / ySize < ratio) { // height greater
		ySize = xSize / ratio;
		changed = true;
	}
	
	if (hs.padToMinWidth && x.full < x.minSize) {
		x.imgSize = x.full;
		y.size = y.imgSize = y.full;
	} else if (this.useBox) {
		x.imgSize = xSize;
		y.imgSize = ySize;
	} else {
		x.size = xSize;
		y.size = ySize;
	}
	this.fitOverlayBox(useBox ? null : ratio);
	if (useBox && y.size < y.imgSize) {
		y.imgSize = y.size;
		x.imgSize = y.size * ratio;
	}
	if (changed || useBox) {
		x.pos = x.tpos - x.cb + x.tb;
		x.minSize = x.size;
		this.justify(x, true);
	
		y.pos = y.tpos - y.cb + y.tb;
		y.minSize = y.size;
		this.justify(y, true);
		if (this.overlayBox) this.sizeOverlayBox();
	}
},
fitOverlayBox : function(ratio) {
	var x = this.x, y = this.y;
	if (this.overlayBox) {
		while (y.size > this.minHeight && x.size > this.minWidth 
				&&  y.get('wsize') > y.get('fitsize')) {
			y.size -= 10;
			if (ratio) x.size = y.size * ratio;
			this.sizeOverlayBox(0, 1);
		}
	}
},

show : function () {
	var x = this.x, y = this.y;
	this.doShowHide('hidden');
	
	// Apply size change
	this.changeSize(
		1, {
			wrapper: {
				width : x.get('wsize'),
				height : y.get('wsize'),
				left: x.pos,
				top: y.pos
			},
			content: {
				left: x.p1 + x.get('imgPad'),
				top: y.p1 + y.get('imgPad'),
				width:x.imgSize ||x.size,
				height:y.imgSize ||y.size
			}
		},
		hs.expandDuration
	);
},

changeSize : function(up, to, dur) {
	
	if (this.outline && !this.outlineWhileAnimating) {
		if (up) this.outline.setPosition();
		else this.outline.destroy();
	}
	
	
	if (!up) this.destroyOverlays();
	
	var exp = this,
		x = exp.x,
		y = exp.y,
		easing = this.easing;
	if (!up) easing = this.easingClose || easing;
	var after = up ?
		function() {
				
			if (exp.outline) exp.outline.table.style.visibility = "visible";
			setTimeout(function() {
				exp.afterExpand();
			}, 50);
		} :
		function() {
			exp.afterClose();
		};
	if (up) hs.setStyles( this.wrapper, {
		width: x.t +'px',
		height: y.t +'px'
	});
	if (this.fadeInOut) {
		hs.setStyles(this.wrapper, { opacity: up ? 0 : 1 });
		hs.extend(to.wrapper, { opacity: up });
	}
	hs.animate( this.wrapper, to.wrapper, {
		duration: dur,
		easing: easing,
		step: function(val, args) {
			if (exp.outline && exp.outlineWhileAnimating && args.prop == 'top') {
				var fac = up ? args.pos : 1 - args.pos;
				var pos = {
					w: x.t + (x.get('wsize') - x.t) * fac,
					h: y.t + (y.get('wsize') - y.t) * fac,
					x: x.tpos + (x.pos - x.tpos) * fac,
					y: y.tpos + (y.pos - y.tpos) * fac
				};
				exp.outline.setPosition(pos, 0, 1);				
			}
		}
	});
	hs.animate( this.content, to.content, dur, easing, after);
	if (up) {
		this.wrapper.style.visibility = 'visible';
		this.content.style.visibility = 'visible';
		this.a.className += ' highslide-active-anchor';
	}
},




afterExpand : function() {
	this.isExpanded = true;	
	this.focus();
	if (hs.upcoming && hs.upcoming == this.a) hs.upcoming = null;
	this.prepareNextOutline();
	var p = hs.page, mX = hs.mouse.x + p.scrollLeft, mY = hs.mouse.y + p.scrollTop;
	this.mouseIsOver = this.x.pos < mX && mX < this.x.pos + this.x.get('wsize')
		&& this.y.pos < mY && mY < this.y.pos + this.y.get('wsize');	
	if (this.overlayBox) this.showOverlays();
	
},


prepareNextOutline : function() {
	var key = this.key;
	var outlineType = this.outlineType;
	new hs.Outline(outlineType, 
		function () { try { hs.expanders[key].preloadNext(); } catch (e) {} });
},


preloadNext : function() {
	var next = this.getAdjacentAnchor(1);
	if (next && next.onclick.toString().match(/hs\.expand/)) 
		var img = hs.createElement('img', { src: hs.getSrc(next) });
},


getAdjacentAnchor : function(op) {
	var current = this.getAnchorIndex(), as = hs.anchors.groups[this.slideshowGroup || 'none'];
	
	/*< ? if ($cfg->slideshow) : ?>s*/
	if (!as[current + op] && this.slideshow && this.slideshow.repeat) {
		if (op == 1) return as[0];
		else if (op == -1) return as[as.length-1];
	}
	/*< ? endif ?>s*/
	return as[current + op] || null;
},

getAnchorIndex : function() {
	var arr = hs.getAnchors().groups[this.slideshowGroup || 'none'];
	if (arr) for (var i = 0; i < arr.length; i++) {
		if (arr[i] == this.a) return i; 
	}
	return null;
},


cancelLoading : function() {	
	hs.expanders[this.key] = null;
	if (this.loading) hs.loading.style.left = '-9999px';
},

writeCredits : function () {
	this.credits = hs.createElement('a', {
		href: hs.creditsHref,
		className: 'highslide-credits',
		innerHTML: hs.lang.creditsText,
		title: hs.lang.creditsTitle
	});
	this.createOverlay({ 
		overlayId: this.credits, 
		position: 'top left' 
	});
},

getInline : function(types, addOverlay) {
	for (var i = 0; i < types.length; i++) {
		var type = types[i], s = null;
		if (!this[type +'Id'] && this.thumbsUserSetId)  
			this[type +'Id'] = type +'-for-'+ this.thumbsUserSetId;
		if (this[type +'Id']) this[type] = hs.getNode(this[type +'Id']);
		if (!this[type] && !this[type +'Text'] && this[type +'Eval']) try {
			s = eval(this[type +'Eval']);
		} catch (e) {}
		if (!this[type] && this[type +'Text']) {
			s = this[type +'Text'];
		}
		if (!this[type] && !s) {
			var next = this.a.nextSibling;
			while (next && !hs.isHsAnchor(next)) {
				if ((new RegExp('highslide-'+ type)).test(next.className || null)) {
					this[type] = next.cloneNode(1);
					break;
				}
				next = next.nextSibling;
			}
		}
		
		if (!this[type] && s) this[type] = hs.createElement('div', 
				{ className: 'highslide-'+ type, innerHTML: s } );
		
		if (addOverlay && this[type]) {
			var o = { position: (type == 'heading') ? 'above' : 'below' };
			for (var x in this[type+'Overlay']) o[x] = this[type+'Overlay'][x];
			o.overlayId = this[type];
			this.createOverlay(o);
		}
	}
},


// on end move and resize
doShowHide : function(visibility) {
	if (hs.hideSelects) this.showHideElements('SELECT', visibility);
	if (hs.hideIframes) this.showHideElements('IFRAME', visibility);
	if (hs.geckoMac) this.showHideElements('*', visibility);
},
showHideElements : function (tagName, visibility) {
	var els = document.getElementsByTagName(tagName);
	var prop = tagName == '*' ? 'overflow' : 'visibility';
	for (var i = 0; i < els.length; i++) {
		if (prop == 'visibility' || (document.defaultView.getComputedStyle(
				els[i], "").getPropertyValue('overflow') == 'auto'
				|| els[i].getAttribute('hidden-by') != null)) {
			var hiddenBy = els[i].getAttribute('hidden-by');
			if (visibility == 'visible' && hiddenBy) {
				hiddenBy = hiddenBy.replace('['+ this.key +']', '');
				els[i].setAttribute('hidden-by', hiddenBy);
				if (!hiddenBy) els[i].style[prop] = els[i].origProp;
			} else if (visibility == 'hidden') { // hide if behind
				var elPos = hs.getPosition(els[i]);
				elPos.w = els[i].offsetWidth;
				elPos.h = els[i].offsetHeight;
			
				
					var clearsX = (elPos.x + elPos.w < this.x.get('opos') 
						|| elPos.x > this.x.get('opos') + this.x.get('osize'));
					var clearsY = (elPos.y + elPos.h < this.y.get('opos') 
						|| elPos.y > this.y.get('opos') + this.y.get('osize'));
				var wrapperKey = hs.getWrapperKey(els[i]);
				if (!clearsX && !clearsY && wrapperKey != this.key) { // element falls behind image
					if (!hiddenBy) {
						els[i].setAttribute('hidden-by', '['+ this.key +']');
						els[i].origProp = els[i].style[prop];
						els[i].style[prop] = 'hidden';
						
					} else if (hiddenBy.indexOf('['+ this.key +']') == -1) {
						els[i].setAttribute('hidden-by', hiddenBy + '['+ this.key +']');
					}
				} else if ((hiddenBy == '['+ this.key +']' || hs.focusKey == wrapperKey)
						&& wrapperKey != this.key) { // on move
					els[i].setAttribute('hidden-by', '');
					els[i].style[prop] = els[i].origProp || '';
				} else if (hiddenBy && hiddenBy.indexOf('['+ this.key +']') > -1) {
					els[i].setAttribute('hidden-by', hiddenBy.replace('['+ this.key +']', ''));
				}
						
			}
		}
	}
},

focus : function() {
	this.wrapper.style.zIndex = hs.zIndexCounter++;
	// blur others
	for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && i == hs.focusKey) {
			var blurExp = hs.expanders[i];
			blurExp.content.className += ' highslide-'+ blurExp.contentType +'-blur';
				blurExp.content.style.cursor = hs.ie ? 'hand' : 'pointer';
				blurExp.content.title = hs.lang.focusTitle;
		}
	}
	
	// focus this
	if (this.outline) this.outline.table.style.zIndex 
		= this.wrapper.style.zIndex;
	this.content.className = 'highslide-'+ this.contentType;
		this.content.title = hs.lang.restoreTitle;
		
		if (hs.restoreCursor) {
			hs.styleRestoreCursor = window.opera ? 'pointer' : 'url('+ hs.graphicsDir + hs.restoreCursor +'), pointer';
			if (hs.ie && hs.uaVersion < 6) hs.styleRestoreCursor = 'hand';
			this.content.style.cursor = hs.styleRestoreCursor;
		}
		
	hs.focusKey = this.key;	
	hs.addEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);	
},
moveTo: function(x, y) {
	this.x.setPos(x);
	this.y.setPos(y);
},
resize : function (e) {
	var w, h, r = e.width / e.height;
	w = Math.max(e.width + e.dX, Math.min(this.minWidth, this.x.full));
	if (this.isImage && Math.abs(w - this.x.full) < 12) w = this.x.full;
	h = w / r;
	if (h < Math.min(this.minHeight, this.y.full)) {
		h = Math.min(this.minHeight, this.y.full);
		if (this.isImage) w = h * r;
	}
	this.resizeTo(w, h);
},
resizeTo: function(w, h) {
	this.y.setSize(h);
	this.x.setSize(w);
},

close : function() {
	if (this.isClosing || !this.isExpanded) return;
	this.isClosing = true;
	
	hs.removeEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);
	
	try {
		this.content.style.cursor = 'default';
		this.changeSize(
			0, {
				wrapper: {
					width : this.x.t,
					height : this.y.t,
					left: this.x.tpos - this.x.cb + this.x.tb,
					top: this.y.tpos - this.y.cb + this.y.tb
				},
				content: {
					left: 0,
					top: 0,
					width: this.x.t,
					height: this.y.t
				}
			}, hs.restoreDuration
		);
	} catch (e) { this.afterClose(); }
},

createOverlay : function (o) {
	var el = o.overlayId;
	if (typeof el == 'string') el = hs.getNode(el);
	if (o.html) el = hs.createElement('div', { innerHTML: o.html });
	if (!el || typeof el == 'string') return;
	el.style.display = 'block';
	this.genOverlayBox();
	var width = o.width && /^[0-9]+(px|%)$/.test(o.width) ? o.width : 'auto';
	if (/^(left|right)panel$/.test(o.position) && !/^[0-9]+px$/.test(o.width)) width = '240px';/*'200px';*/
	var overlay = hs.createElement(
		'div', {
			id: 'hsId'+ hs.idCounter++,
			hsId: o.hsId
		}, {
			position: 'absolute',
			visibility: 'hidden',
			width: width,
			direction: hs.lang.cssDirection || '',
			opacity: 0
		},this.overlayBox,
		true
	);
	
	overlay.appendChild(el);
	hs.extend(overlay, {
		opacity: 1,
		offsetX: 0,
		offsetY: 0,
		dur: (o.fade === 0 || o.fade === false || (o.fade == 2 && hs.ie)) ? 0 : 250
	});
	hs.extend(overlay, o);
		
	if (this.gotOverlays) {
		this.positionOverlay(overlay);
		if (!overlay.hideOnMouseOut || this.mouseIsOver) 
			hs.animate(overlay, { opacity: overlay.opacity }, overlay.dur);
	}
	hs.push(this.overlays, hs.idCounter - 1);
},
positionOverlay : function(overlay) {
	var p = overlay.position || 'middle center',
		offX = overlay.offsetX,
		offY = overlay.offsetY;
	if (overlay.parentNode != this.overlayBox) this.overlayBox.appendChild(overlay);
	if (/left$/.test(p)) overlay.style.left = offX +'px'; 
	
	if (/center$/.test(p))	hs.setStyles (overlay, { 
		left: '50%',
		marginLeft: (offX - Math.round(overlay.offsetWidth / 2)) +'px'
	});	
	
	if (/right$/.test(p)) overlay.style.right = - offX +'px';
		
	if (/^leftpanel$/.test(p)) { 
		hs.setStyles(overlay, {
			right: '100%',
			marginRight: this.x.cb +'px',
			top: - this.y.cb +'px',
			bottom: - this.y.cb +'px',
			overflow: 'auto'
		});		 
		this.x.p1 = overlay.offsetWidth;
	
	} else if (/^rightpanel$/.test(p)) {
		hs.setStyles(overlay, {
			left: '100%',
			marginLeft: this.x.cb +'px',
			top: - this.y.cb +'px',
			bottom: - this.y.cb +'px',
			overflow: 'auto'
		});
		this.x.p2 = overlay.offsetWidth;
	}

	if (/^top/.test(p)) overlay.style.top = offY +'px'; 
	if (/^middle/.test(p))	hs.setStyles (overlay, { 
		top: '50%', 
		marginTop: (offY - Math.round(overlay.offsetHeight / 2)) +'px'
	});	
	if (/^bottom/.test(p)) overlay.style.bottom = - offY +'px';
	if (/^above$/.test(p)) {
		hs.setStyles(overlay, {
			left: (- this.x.p1 - this.x.cb) +'px',
			right: (- this.x.p2 - this.x.cb) +'px',
			bottom: '100%',
			marginBottom: this.y.cb +'px',
			width: 'auto'
		});
		this.y.p1 = overlay.offsetHeight;
	
	} else if (/^below$/.test(p)) {
		hs.setStyles(overlay, {
			position: 'relative',
			left: (- this.x.p1 - this.x.cb) +'px',
			right: (- this.x.p2 - this.x.cb) +'px',
			top: '100%',
			marginTop: this.y.cb +'px',
			width: 'auto'
		});
		this.y.p2 = overlay.offsetHeight;
		overlay.style.position = 'absolute';
	}
},

getOverlays : function() {	
	this.getInline(['heading', 'caption'], true);
	if (this.heading && this.dragByHeading) this.heading.className += ' highslide-move';
	if (hs.showCredits) this.writeCredits();
	for (var i = 0; i < hs.overlays.length; i++) {
		var o = hs.overlays[i], tId = o.thumbnailId, sg = o.slideshowGroup;
		if ((!tId && !sg) || (tId && tId == this.thumbsUserSetId)
				|| (sg && sg === this.slideshowGroup)) {
			this.createOverlay(o);
		}
	}
	var os = [];
	for (var i = 0; i < this.overlays.length; i++) {
		var o = hs.$('hsId'+ this.overlays[i]);
		if (/panel$/.test(o.position)) this.positionOverlay(o);
		else hs.push(os, o);
	}
	for (var i = 0; i < os.length; i++) this.positionOverlay(os[i]);
	this.gotOverlays = true;
},
genOverlayBox : function() {
	if (!this.overlayBox) this.overlayBox = hs.createElement (
		'div', {
			className: this.wrapperClassName
		}, {
			position : 'absolute',
			width: (this.x.size || this.x.full) +'px',
			height: (this.y.size || this.y.full) +'px',
			visibility : 'hidden',
			overflow : 'hidden',
			zIndex : hs.ie ? 4 : null
		},
		hs.container,
		true
	);
},
sizeOverlayBox : function(doWrapper, doPanels) {
	var overlayBox = this.overlayBox, 
		x = this.x,
		y = this.y;
	hs.setStyles( overlayBox, {
		width: x.size +'px', 
		height: y.size +'px'
	});
	if (doWrapper || doPanels) {
		for (var i = 0; i < this.overlays.length; i++) {
			var o = hs.$('hsId'+ this.overlays[i]);
			var ie6 = (hs.ieLt7 || document.compatMode == 'BackCompat');
			if (o && /^(above|below)$/.test(o.position)) {
				if (ie6) {
					o.style.width = (overlayBox.offsetWidth + 2 * x.cb
						+ x.p1 + x.p2) +'px';
				}
				y[o.position == 'above' ? 'p1' : 'p2'] = o.offsetHeight;
			}
			if (o && ie6 && /^(left|right)panel$/.test(o.position)) {
				o.style.height = (overlayBox.offsetHeight + 2* y.cb) +'px';
			}
		}
	}
	if (doWrapper) {
		hs.setStyles(this.content, {
			top: y.p1 +'px'
		});
		hs.setStyles(overlayBox, {
			top: (y.p1 + y.cb) +'px'
		});
	}
},

showOverlays : function() {
	var b = this.overlayBox;
	b.className = '';
	hs.setStyles(b, {
		top: (this.y.p1 + this.y.cb) +'px',
		left: (this.x.p1 + this.x.cb) +'px',
		overflow : 'visible'
	});
	if (hs.safari) b.style.visibility = 'visible';
	this.wrapper.appendChild (b);
	for (var i = 0; i < this.overlays.length; i++) {
		var o = hs.$('hsId'+ this.overlays[i]);
		o.style.zIndex = 4;
		if (!o.hideOnMouseOut || this.mouseIsOver) {
			o.style.visibility = 'visible';
			hs.animate(o, { opacity: o.opacity }, o.dur);
		}
	}
},

destroyOverlays : function() {
	if (!this.overlays.length) return;
	hs.discardElement(this.overlayBox);
},



createFullExpand : function () {
	this.fullExpandLabel = hs.createElement(
		'a', {
			href: 'javascript:hs.expanders['+ this.key +'].doFullExpand();',
			title: hs.lang.fullExpandTitle,
			className: 'highslide-full-expand'
		}
	);
	
	this.createOverlay({ 
		overlayId: this.fullExpandLabel, 
		position: hs.fullExpandPosition, 
		hideOnMouseOut: true, 
		opacity: hs.fullExpandOpacity
	});
},

doFullExpand : function () {
	try {
		if (this.fullExpandLabel) hs.discardElement(this.fullExpandLabel);
		
		this.focus();
		var xSize = this.x.size;
		this.resizeTo(this.x.full, this.y.full);
		
		var xpos = this.x.pos - (this.x.size - xSize) / 2;
		if (xpos < hs.marginLeft) xpos = hs.marginLeft;
		
		this.moveTo(xpos, this.y.pos);
		this.doShowHide('hidden');
	
	} catch (e) {
		this.error(e);
	}
},


afterClose : function () {
	this.a.className = this.a.className.replace('highslide-active-anchor', '');
	
	this.doShowHide('visible');
		if (this.outline && this.outlineWhileAnimating) this.outline.destroy();
	
		hs.discardElement(this.wrapper);
	
	hs.expanders[this.key] = null;		
	hs.reOrder();
}

};
if (document.readyState && hs.ie) {
	(function () {
		try {
			document.documentElement.doScroll('left');
		} catch (e) {
			setTimeout(arguments.callee, 50);
			return;
		}
		hs.domReady();
	})();
}
hs.langDefaults = hs.lang;
// history
var HsExpander = hs.Expander;

// set handlers
hs.addEventListener(window, 'load', function() {
	if (hs.expandCursor) {
		var sel = '.highslide img', 
			dec = 'cursor: url('+ hs.graphicsDir + hs.expandCursor +'), pointer !important;';
			
		var style = hs.createElement('style', { type: 'text/css' }, null, 
			document.getElementsByTagName('HEAD')[0]);
	
		if (!hs.ie) {
			style.appendChild(document.createTextNode(sel + " {" + dec + "}"));
		} else {
			var last = document.styleSheets[document.styleSheets.length - 1];
			if (typeof(last.addRule) == "object") last.addRule(sel, dec);
		}
	}
});
hs.addEventListener(window, 'resize', function() {
	hs.page = hs.getPageSize();
});
hs.addEventListener(document, 'mousemove', function(e) {
	hs.mouse = { x: e.clientX, y: e.clientY	};
});
hs.addEventListener(document, 'mousedown', hs.mouseClickHandler);
hs.addEventListener(document, 'mouseup', hs.mouseClickHandler);
hs.addEventListener(window, 'load', hs.preloadImages);

/* by P.Gleb for Bookmarks START */
var list_bk_partName = new Array(),
	list_bk_isenabled = new Array();

function init_datas_Bookmarks(){ // инициализация и проверка всех закладок
	for (var i = 0; i < list_bk_partName.length; i++){
		list_bk_isenabled[i] = false; // делаем закладку пассивным
	}
	list_bk_isenabled[0] = true; // активируем первую закладку
	checkBookmarks();//вызов функции проверки закладок
}

function checkBookmarks(){ // проверка всех закладок
/*
		obj.className.replace(/\bactive_\b/, ' ');
		obj.className.replace(/\bdeactivate_\b/, ' ');
		obj.className += " "+setClass;
//		if (obj.className.match(/\bactive_\b/)
*/

	var obj, setClass;
	for (var i = 0; i < list_bk_partName.length; i++){
		//управляем активностью закладки и заменяем соответственно класс
		obj = element('bk'+(i+1)+list_bk_partName[i]);
		setClass = (list_bk_isenabled[i]) ? "active_" : "deactivate_";
		obj.className = "bookmark_ "+setClass;//управляем отображением закладки с помощью CSS стиля
		
		//управляем видимостью отображения блока комментов в соответствии с состоянием i+1'ой закладки
		obj = element('block'+(i+1)+list_bk_partName[i]);
		obj.style.display = (list_bk_isenabled[i]) ? "block" : "none";//управляем отображением div контнейнера комментов с помощью CSS стиля
	}
}

function setCtrlBookmarks(bk_number){ // функция активации bk_number'ой закладки
	for (var i = 0; i < list_bk_partName.length; i++){
		list_bk_isenabled[i] = (bk_number == i) ? true : false;
	}
	checkBookmarks();//вызов функции проверки закладок
}

/* by P.Gleb for bookmarks END */
/* by P.Gleb  v2 START */
	var	isDOM=document.getElementById?true:false,
		isOpera=isOpera5=window.opera && isDOM
		isOpera6=isOpera && window.print,
		isOpera7=isOpera && document.readyState,
		isMSIE=isIE=document.all && document.all.item && !isOpera,
		isStrict=document.compatMode=='CSS1Compat',
		isNN=isNC=navigator.appName=="Netscape",
		isNN4=isNC4=isNN && !isDOM,
		isMozilla=isNN6=isNN && isDOM,
		
		pageLeft=0,
		pageTop=0;

	var is_chrome = false, chrome_version = false;
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		   is_chrome = true;
		   chrome_version = navigator.userAgent.replace(/^.*Chrome\/([\d\.]+).*$/i, '$1')
	}
			
	function element(elementName){
		if ((elementName == "VirtLabApplet") && isNN){
			elementName += "_emb";
			return document.getElementById(elementName);
		}
		
		//MSIE4
		if(document.all) {
			return document.all[elementName];
		}
		
		//DOM1
		if(document.getElementById) {
			return document.getElementById(elementName);
		}
		
		//Netscape 4
		if(document.elements) {
			return document.elements[elementName];
		}
		
		return null
	};

	function elementStyle(elementObject){
		if(elementObject.style){
			return elementObject.style;
		}
		return elementObject
	};

	function setVisible_msg(obj1, visible){
		//elementStyle(element(obj1)).visibility = (visible) ? "visible" : "hidden";
		elementStyle(element(obj1)).display = (visible) ? "block" : "none";
	}

	function ltrim(in_) {
		var ptrn = /\s*((\S+\s*)*)/;
		return in_.replace(ptrn, "$1");
	}

	function rtrim(in_) {
		var ptrn = /((\s*\S+)*)\s*/;
		return in_.replace(ptrn, "$1");
	}

	function trim(in_) {
		return ltrim(rtrim(in_));
	}
	
	function CheckEmail(email, strict){
		if ( !strict ) email = email.replace('/^\s+|\s+$/g', '');
		return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
	}

function srch_value_istrueOnFocus(obj, def_val){
	var obj_val_tmp = trim(""+obj.value);
	var def_val_tmp = trim(""+def_val);
	if (obj_val_tmp.toLowerCase() == def_val_tmp.toLowerCase()){
		obj.value = "";
		return true;
	}
	return false;
}

function srch_value_istrueOnBlur(obj, def_val){
	var obj_val_tmp = trim(""+obj.value);
	if ((obj_val_tmp.toLowerCase() == def_val.toLowerCase()) || (""+obj_val_tmp).length < 1){
		obj.value = def_val;
		//setVisible_msg('h_a5_v2', false);
		return true;
	}
	check_srch_data();
	return false;
}

function cntl_hmenu_v2(number, isCurr){
	var x_array = new Array();
	x_array[1] = '0px';
	x_array[2] = '-242px';
	x_array[3] = '-484px';
	x_array[4] = '-726px';
	x_array[5] = '-968px';
	var y_tmp = (isCurr) ? '-38px' : ((number < 5 && n_activeBtn == number) ? '-76px' : '0px');
	elementStyle(element('h_btn'+number+'_v2')).backgroundImage = 'url(i/h_btns.png)';
    elementStyle(element('h_btn'+number+'_v2')).backgroundPosition = x_array[number]+' '+y_tmp;
    elementStyle(element('h_btn'+number+'_v2')).backgroundRepeat = 'no-repeat';	
}

var isBlock_v2 = true;
function start_search(isTurned){
	var def_val = 'Поиск по сайту';
	var obj_val_tmp = '';
	if (!isBlock_v2 || srch_value_istrueOnBlur(element('q'), def_val)){
		//on_send_key_sql_srch();
		var obj_val_tmp = trim(""+element('q').value);
		var def_val_tmp = trim(""+def_val);
		if (obj_val_tmp.toLowerCase() == def_val_tmp.toLowerCase()){
//			alert('err2 ['+obj_val_tmp+'] = ['+def_val_tmp+']');
			return false;
		} else if (!isTurned){
//			alert('send2 ['+obj_val_tmp+'] = ['+def_val_tmp+']');
			document.forms.csesearchbox.submit();
			return true;
		}
	}
}

function on_send_key_sql_srch(){
	//element('q').disabled = true;
//	elementStyle(element('td_srch_v2')).background = 'i/h_search_bg2.png';
}

function check_srch_data(def_val){
	var val_tmp = trim(""+element('q').value);
	//var def_val_tmp = trim(""+def_val);
	
	var check1 = (val_tmp.length > 0);
	//var check2 = (val_tmp.toLowerCase() == def_val_tmp.toLowerCase());
	
	isBlock_v2 = !(check1);
	
	//setVisible_msg('h_a5_v2', !isBlock_v2);
}
	
function ReplaceString(Instr, OldChars, NewChars){
	var resultStr = "", i = 0;
	var subStr = '', partInstr_ = '';
	if ((OldChars == "") || (OldChars == null)){
		return Instr;
	}
	partInstr = Instr;
	while (partInstr.length > 0){
		subStr = partInstr.slice(0, i+OldChars.length);
		if (subStr == OldChars){
			partInstr_ = partInstr.slice(OldChars.length, partInstr.length);
			resultStr += NewChars;
			partInstr = partInstr_;
		} else {
			resultStr += partInstr.slice(i, i+1);
			partInstr = partInstr.slice(i+1, partInstr.length);
		}
	}
	return resultStr;
}

function parserBanner(isSearched_1){
	var html_tmp = '';

	var id1 = 'topadvert_div_1_v2';
	var isSearched_1tmp = isSearched_1;

	if (!isSearched_1tmp){
		if (element(id1)){
			html = element(id1).innerHTML;
			pos = html.indexOf('_items_distance');
			if (pos > 0){
				/*html_tmp1 = html.slice(0, pos);
				pos1 = html_tmp1.lastIndexOf('<tr>');
				
				html_tmp2 = html.slice(pos, html.length);
				pos2 = html_tmp2.indexOf('</tr>');
				
				html_tmp = html.slice(pos1, pos2);
				alert('['+html_tmp+']');*/
				html = ReplaceString(html, '<tr><td height="1"><div class="topadvert_div_1_v2_items_distance">&nbsp;</div></td></tr>', '');
				element(id1).innerHTML = html;
				isSearched_1tmp = true;
			}
		}
	}
	
	if (!isSearched_1tmp){
		setTimeout('parserBanner('+isSearched_1tmp+')', 500);
	}
}

function ReplaceChar(Instr, OldChar, NewChar){
	var oldStr, newStr, resultStr = "", strErr, i = 0;
	if ((OldChar == "") || (OldChar == null)){
		return Instr;
	}
	while (i < Instr.length){
		oldStr = Instr.slice(i, i+OldChar.length);
		if (NewChar == null){
			newStr = oldStr.replace(OldChar, "");
		} else {
			newStr = oldStr.replace(OldChar, NewChar);
		}
		if (oldStr == newStr){
			resultStr += newStr.slice(0, 1);
			i++;
		} else {
			resultStr += newStr;
			i += OldChar.length;
		}
	}
	return resultStr;
}

function vk_click_v2(u, i, t, d){
	var w = 630,//window.screen.width*0.7,
		h = window.screen.height*0.7,
		x = Math.ceil((window.screen.width - w) / 2),
		y = Math.ceil((window.screen.height - h) / 2) - 25,
		d_ = d;
	//u=location.href;
	//t=document.title;
	d_ = ReplaceChar(d_.substring(0, 400), "\"", "\\\"")+((d_.length > 397)?"...":"");
//	var name = window.open('http://vkontakte.ru/share.php?url='+encodeURIComponent('http://mobiltelefon.ru/index234684653546.php')+'&amp;title='+ReplaceChar(encodeURIComponent(t), "\"", "\\\"")+'&description='+encodeURIComponent(d_)+'&image='+'http://mobiltelefon.ru/i/other/february12/22/c3_gold.png', 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	var name = window.open('http://vkontakte.ru/share.php?url='+encodeURIComponent(u)+'&amp;title='+ReplaceChar(encodeURIComponent(t), "\"", "\\\"")+'&description='+encodeURIComponent(d_)+'&image='+i, 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	name.moveTo(x,y);
	name.focus();
	return false;
}	

function fbs_click_v2(u, t){
	var w = window.screen.width*0.7,
		h = window.screen.height*0.7,
		x = Math.ceil((window.screen.width - w) / 2),
		y = Math.ceil((window.screen.height - h) / 2) - 25;
	//u=location.href;
	//t=document.title;
	var name = window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	name.moveTo(x,y);
	name.focus();
	return false;
}

function twttr_click_v2(u, t){
	var w = 630,//window.screen.width*0.7,
		h = 440,//window.screen.height*0.7,
		x = Math.ceil((window.screen.width - w) / 2),
		y = Math.ceil((window.screen.height - h) / 2) - 25;
	//u=location.href;
	//t=document.title;
	var t_ = encodeURIComponent(t).replace("'", "\\'");
	
	var name = window.open('http://twitter.com/share?&text='+t_+'%20-%20&url='+encodeURIComponent(u), 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	name.moveTo(x,y);
	name.focus();
	return false;
}

function lj_click_v2(u, t, d, html_img, w_img, h_img){
	var w = window.screen.width*0.7,
		h = window.screen.height*0.7,
		x = Math.ceil((window.screen.width - w) / 2),
		y = Math.ceil((window.screen.height - h) / 2) - 25,
		html = '', html_part = '';
	//u=location.href;
	//t=document.title;
//	html_part = (html_img != '') ? '<td><a href="'+u+'"><div style="width:"'+w_img+'"px;height:"'+h_img+'"px;float:left;background-colo:white;overflow:hidden;">'+html_img+'</div></a></td>' : '';
	html_part = (html_img != '') ? '<td><a href="'+u+'"><div>'+html_img+'</div></a></td>' : '';
	html = '<table cellspacing="1" cellpadding="1" border="0" align="left" width="100%"><tbody><tr>'+html_part+'<td align="left" valign="top">'+d+'<hr />������: <a href="'+u+'">'+u+'</a></td></tr></tbody></table>';
	
	var name = window.open('http://www.livejournal.com/update.bml?event='+encodeURIComponent(html)+'&subject='+encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	name.moveTo(x,y);
	name.focus();
	return false;
}

function ok_click_v2(u, t){
	var w = 630,//window.screen.width*0.7,
		h = 440,//window.screen.height*0.7,
		x = Math.ceil((window.screen.width - w) / 2),
		y = Math.ceil((window.screen.height - h) / 2) - 25;
	//u=location.href;
	//t=document.title;
	var name = window.open('http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl='+encodeURIComponent(u)+'&title='+encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,scrollbars=1,width='+w+',height='+h, true);
	name.moveTo(x,y);
	name.focus();
	return false;
}

/* AJAX start */
var httpRequest = createHttpRequest();
var resultId = '', resilt_gl_ = '';

function createHttpRequest() {
	var httpRequest;
	var browser = navigator.appName;

	if (browser == "Microsoft Internet Explorer") {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		httpRequest = new XMLHttpRequest();
	}

	return httpRequest;
}

function sendRequest(file, _resultId, getRequestProc){
	resultId = _resultId;
	if (resultId == 'bg_msg_session'){
		// empty
	} else if (resultId == 'bg_msg_'){
		if (element(resultId))
			element(resultId).value = 'Please wait...';
	} else {
		if (element(resultId))
			element(resultId).innerHTML = 'Loading. Please wait...';
	}
	httpRequest.open('get', file);
	httpRequest.onreadystatechange = getRequestProc;
	httpRequest.send(null);
} 

function getRequest(){
	var result = '';
	if (httpRequest.readyState == 4){
		if (resultId == 'empty'){
			element('dvi_lk5').innerHTML = httpRequest.responseText;
		} else if (resultId == 'bg_msg_session'){
			//element(resultId).value = httpRequest.responseText;
//alert("#0 data from server:["+httpRequest.responseText+"]");
			element(resultId).value = httpRequest.responseText;
		} else if (resultId == 'bg_msg_'){
			//element(resultId).value = httpRequest.responseText;
			resilt_gl_ = httpRequest.responseText;
		} else {
			element(resultId).innerHTML = httpRequest.responseText;
		}
	}
}
/* AJAX  end  */

	function loadDynamicContent_Direct(){
		var obj = 'div_yandex_direct';

		//version 3:
		/* сам код баннера писать ниже */
		yandex_partner_id = 17203;
		yandex_site_charset = 'windows-1251';
		yandex_ad_format = 'direct';
		yandex_font_size = 1;	
		yandex_direct_type = 'flat';
		yandex_direct_border_type = 'ad';
		yandex_direct_limit = 1;
		yandex_direct_title_color = '0033FF';
		yandex_direct_url_color = '666666';
		yandex_direct_all_color = '666666';
		yandex_direct_text_color = '000000';
		yandex_direct_site_bg_color = 'FFFFFF';
		var yandex_stat_id = 3;
		document.write('<sc'+'ript type="text/javascript" src="http://an.yandex.ru/system/context.js"></sc'+'ript>');
		/* сам код баннера писать выше */
	}
	
	function loadDynamic_other(){
		/* для внедрения дополнительного баннера */
		document.write('<div id="avaholder_63726"></div>');
		/* для внедрения дополнительного баннера */
	}

	function loadDynamic_other2(){
		/* для внедрения дополнительного баннера */
				var url = document.location;
				var regexp = /\/([^\/]+)\.html/
				var result = regexp.exec(url)[1];
				var model = unescape(result);
				model = model.replace("+", " ");
				document.write ('<' + 'textarea name="topadvert_request_async" disabled="true" style="display:none"> title: <b>Аксессуары для ' + model + '</b><div class="center_zone"> feed_id: 6527 pattern_id: 3077 tech_model: ' + model + '</div><' + '/textarea' + '><div class="topadvert_div" style="display:none"></div>');
		/* для внедрения дополнительного баннера */
	}

	function check_title_v2(objId){
		element(objId).value = ReplaceString(element(objId).value, '"', '&quot;');
	}
	
/* by P.Gleb  v2 END */
/* by P.Gleb  v3 START */

function windowHeight(){
	var de = document.documentElement;
	return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
}

// Определение ширины видимой части страницы
function windowWidth() {
	var de = document.documentElement;
	return self.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
}

// Определение высоты видимой части страницы
function windowHeight() {
	var de = document.documentElement;
	return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
}

function get_mode_btn(){
	return (windowWidth() > $('#lasto').outerWidth()+minW_bg_btn_top*2+10) ? "big" : "mini";
}

var w_btn_top = 180;//191;
var horisontal_margin = 10;
var minW_bg_btn_top = w_btn_top + (horisontal_margin*2);
//var lpadding_bg_btn_top = 50;
var visible_bg_btn_top = 0;

function ctrl_display_btn_top(is_resized){

		var y_cnt_scroll = $(this).scrollTop();
		var w_bg_btn_top, h_bg_btn_top;
		var l_btn_top;
		
		var position_;
		
		if (document.getElementById('pointer1_v3')){
			position_ = $('#pointer1_v3').position().top;
		} else if (document.getElementById('pointer2_v3')){
			position_ = $('#pointer2_v3').position().top;
		} else {
			return false;
		}

////var test = '';		
		if (position_ < windowHeight()){
			position_ = windowHeight() + 145;
		}
		
		var btn_mode = get_mode_btn();
        if (y_cnt_scroll + windowHeight() > position_){
//			var btn_mode = get_mode_btn();
			if (btn_mode == "big"){
				w_bg_btn_top = $('#lasto').position().left/2;
				w_bg_btn_top = (w_bg_btn_top < minW_bg_btn_top) ? minW_bg_btn_top : w_bg_btn_top;

//				w_btn_top = 191;//Math.ceil(w_bg_btn_top - l_btn_top*2 - 5);
				h_bg_btn_top = $(document).height();//windowHeight();
				
//				l_btn_top = (w_bg_btn_top > w_btn_top+(2*horisontal_margin)) ? Math.ceil((w_bg_btn_top-(w_btn_top+(2*horisontal_margin)))/2) : 5;
//				l_btn_top = Math.ceil((w_bg_btn_top-(w_btn_top+(2*horisontal_margin)))/2);
				l_btn_top = Math.ceil(w_bg_btn_top-w_btn_top)/2;
				//if (l_btn_top < 0) l_btn_top = 0;
////test += " w_bg_btn("+minW_bg_btn_top+":"+w_bg_btn_top+")  w_btn("+w_btn_top+")   l_btn("+l_btn_top+") ["+((w_bg_btn_top-w_btn_top)/2)+"]";

				if ($('div#bg_move_up').position().top != 0 || $('div#bg_move_up').position().left != 0){
					$('div#bg_move_up').offset({top:0, left:0});
				}

				$('div#bg_move_up').width(w_bg_btn_top);
				$('div#bg_move_up').height(h_bg_btn_top);
				$('a#move_up').offset({left: l_btn_top});
				$('a#move_up').width(w_btn_top);

				$('a#move_up').fadeIn();
				$('div#bg_move_up').fadeIn(400);
				
			} else {
//				l_btn_top = $('#lasto').position().left+horisontal_margin;
				l_btn_top = horisontal_margin;
				w_btn_top = 180;
////test += " w_bg_btn("+minW_bg_btn_top+":"+w_bg_btn_top+")  w_btn("+w_btn_top+")   l_btn("+l_btn_top+") ["+((w_bg_btn_top-w_btn_top)/2)+"]";

				$('div#bg_move_up').fadeOut(0);
				$('a#move_up').fadeIn();
				$('a#move_up').offset({left: l_btn_top});
				$('a#move_up').width(w_btn_top);
			}
        } else {
			$('a#move_up').fadeOut(400);
			$('div#bg_move_up').fadeOut();
		}
		
//20120527		move_block_likebtns(btn_mode);
////if (test != "") document.getElementById('testHTML').value += "\n"+test;
}

//20120527
/*

function move_block_likebtns(btn_mode){
	if (""+$('div#right').position() == "null"){
		setTimeout('move_block_likebtns(\''+btn_mode+'\')', 800);
	} else {
		var w = 200,
			h = 200,
			t = 250,
			l = 0;

		elementStyle(element('right_Likebtn_block')).display = 'block';
		t = $('#right').position().top + 5;
		if (btn_mode == "big"){
			l = $('#lasto_v2').width() - w;
			$('div.right_Likebtn_block').offset({left: l});
		} else {
			l = $('#right').position().left + $('#right').width() - w;
			$('div.right_Likebtn_block').offset({left: l});
		}
	}
}*/

//20120527move_block_likebtns(get_mode_btn());
$(function (){
	$(window).resize(function() {
		ctrl_display_btn_top(true);
	});

    $(window).scroll(function () {
		ctrl_display_btn_top(false);
    });
    $('a#move_up').click(function () {
        scrollTo(0,0);
        return false;
    });
});

$(document).ready(
	$(window).scroll(function (){
		ctrl_display_btn_top(false);
	})
);

function add2memory_newurl(url_n){
	var obj = "bg_msg_session";//"bg_msg_"; //"bg_msg_session"
	if (!url_n) return false;
	sendRequest('/translator/index3.php?createN='+url_n+'&timer='+Math.round( Math.random()*1000 ), obj, getRequest);
	checkSession_answer_submit(obj);
}

function checkSession_answer_submit(obj){
	if (element(obj).value == ''){
		setTimeout("checkSession_answer_submit('"+obj+"')", 50);
	} else {
//alert('#0 start SEND DATA...');
		$('#form_post').submit();
	}
}
/* by P.Gleb  v3 END */

var cntLrh = 0;
function check_txt(i7){
	var i3 = 'i';
	var i0 = 'dv';
	//var i7 = '_lk';
	var i9 = 5;
	var v_tmp = '';
	var pos1, pos2, subriu = '';
	var rh, di, mn;
	var cntLrh_tmp = -1;

	if (!element(i0+i3+i7+i9.toString())){
		setTimeout("check_txt('"+i7+"')", 50);
	} else {
		eval("i0 = element(i0+i3+"+i3+"7+i9.toString()).innerHTML");
		if (i0.length <= 3){
			return false;
		}
		eval("v_tmp = " + i3 + "0");
		while (v_tmp.length > 0){
			pos1 = (" "+v_tmp).indexOf("[|");
			if (pos1 <= 0){
				break;
			} else {
				pos1--;
				pos2 = v_tmp.indexOf(".:|:.");
					rh = v_tmp.substring(pos1+3, pos2);
					cntLrh_tmp = parseInt(v_tmp.substring(v_tmp.indexOf('tshL|')+5, v_tmp.indexOf(':')), 10);					
				pos1 = v_tmp.indexOf(".||.");
					di = v_tmp.substring(pos2+5, pos1);
				pos2 = v_tmp.indexOf(".|]");
					mn = v_tmp.substring(pos1+4, pos2);
				v_tmp = v_tmp.substring(pos2+3, v_tmp.length);
				if (subriu.length > 0){
					subriu += "&";
				}
				if (cntLrh_tmp > cntLrh) cntLrh = cntLrh_tmp;
				subriu += "irh"+cntLrh.toString()+"="+encodeURIComponent(rh)+"&ldi"+cntLrh.toString()+"="+di+"&hn"+cntLrh.toString()+"="+mn;
			}
		}
		
		var answer = 'riu_rh.p';
		sendRequest(answer + 'hp?' + subriu, 'empty', getRequest);
		set_resultSend();
	}
}

function set_resultSend(){
	var v_tmp = '', pos1, pos2, rh, ti, ti_check;
	var obj_finded = false;
	for (var i = 0; i < 11; i++){
		if (element('rh_17830_'+i)){
			obj_finded = true;
			break;
		}
	}
	if (!obj_finded){
		setTimeout("set_resultSend()", 50);
	} else {
		for (var cn_i = 1; cn_i <= cntLrh+1; cn_i++){
			if (!element('rh_17830_'+cn_i)) continue;
			v_tmp = element('rh_17830_'+cn_i).innerHTML;
			pos1 = (" "+v_tmp).indexOf("hr=");
			if (pos1 <= 0){
				continue;
			} else {
				pos1--;
				pos2 = v_tmp.indexOf(" ttr=");
					rh = v_tmp.substring(pos1+3, pos2);
					ti = v_tmp.substring(pos2+5, v_tmp.length);
					ti_check = ti.substring(ti.lastIndexOf('-->'));
					if ((" "+ti_check).indexOf("-->") > 0){
						ti = ti.substring(0, ti.lastIndexOf('-->'));
					}
				element('rh_knl_'+cn_i).innerHTML = "<!-- noindex --><a target='blank_' rel='nofollow' href='"+rh+"'>"+ti+"</a><!--/ noindex -->";
			}
		}
		element('dvi_lk5').innerHTML = "";
	}
}
