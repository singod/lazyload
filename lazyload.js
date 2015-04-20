// JavaScript Document
;(function ($) {
	var navappVer = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
		dps = navappVer && navappVer[2].split("_");
	    dps = dps && parseFloat(dps.length > 1 ? dps.splice(0, 2).join(".") : dps[0], 10);
	var ise = dps && 6 > dps;
	$.fn.lazyload = function(options) {
		var config = {
			loadHidden: true,
			interval: 200,
			threshold: 3,
			listCell:"lazy",
			isImg:false,
			placeAttr:"dataimg",
			errorImg: "",
			container: null,
			placeholder: null
        };
        var opts = $.extend(config, options);
		return this.each(function() {
			var that=$(this);
		    touchScroll(), triggers();
			function touchScroll(){
				if (ise) {
					var ds = {}, fs = null;
					$(window).on("touchstart", function() {
						ds = {
							scrollY: window.scrollY,
							time: Date.now()
						}, fs && clearTimeout(f)
					}).on("touchend", function(obj) {
						if (obj && obj.changedTouches) {
							var mabs = Math.abs(window.scrollY - ds.scrollY);
							if (mabs > opts.threshold) {
								var Dat = Date.now() - ds.time;
								fs = setTimeout(function() {
									update(), ds = {}, clearTimeout(fs), fs = null
								}, Dat > opts.interval ? 0 : 200)
							}
						} else {update();}
					}).on("touchcancel", function() {
						fs && clearTimeout(fs), ds = {};
					})
				} else {
					var conwin = $(opts.container ? opts.container : window);
					conwin.on("scroll", function() { update(); })
				}
			};
			function triggers() {
				var cope = (opts, ise && "touchend" || "scroll");
				that.prevlist && that.prevlist.each(function(i, bs) {
					bs && (bs.onerror = bb.onload = null)
				}), 
				that.imglist = $("."+opts.listCell), 
				that.prevlist = $.extend({}, true, that.imglist), 
				$(window).trigger(cope);
			};
			function inviewport(obj, val) {
				var wpY = window.pageYOffset,
					wpYH = window.pageYOffset + window.innerHeight,
					oftop = obj.offset().top;
				return oftop >= wpY && wpYH >= oftop + (val || -100);
			};
			function update() {
				that.imglist.each(function(d, e) {
					var isHide = opts.loadHidden ? false : $(e).is(":hidden");
					if (e && inviewport($(e)) && !isHide) {
						var gCell = $(e),
							attrPath = gCell.attr(opts.placeAttr),
							igs = "img" === gCell[0].tagName.toLowerCase(),
							neImg = new Image;
						neImg.src = attrPath, neImg.onload = function() {
							that.imglist[d] = null, gCell.removeClass(opts.listCell).removeAttr(opts.placeAttr), 
							igs ? gCell.attr("src", attrPath) : gCell.css("background-image", "url(" + attrPath + ")"), 
							neImg.onload = neImg.onerror = null;
						}, neImg.onerror = function() {
							that.imglist[d] = null, gCell.removeClass(opts.listCell).removeAttr(opts.placeAttr), 
							igs ? gCell.attr("src", opts.errorImg) : gCell.css("background-image", "url(" + opts.errorImg + ")"), 
							neImg.onload = neImg.onerror = null;
						}
					}
				})
			};
			
		});	
	};
})(window.jQuery || window.Zepto || window.$);