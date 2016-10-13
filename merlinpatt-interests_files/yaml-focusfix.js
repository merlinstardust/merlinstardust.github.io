




/*
     FILE ARCHIVED ON 14:55:54 Dec 21, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:18:24 Sep 28, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * "Yet Another Multicolumn Layout" - YAML CSS Framework
 *
 * (en) Workaround for IE8 und Webkit browsers to fix focus problems when using skiplinks
 * (de) Workaround für IE8 und Webkit browser, um den Focus zu korrigieren, bei Verwendung von Skiplinks
 *
 * @note			inspired by Paul Ratcliffe's article
 *					/web/20141221145554/http://www.communis.co.uk/blog/2009-06-02-skip-links-chrome-safari-and-added-wai-aria
 *                  Many thanks to Mathias Schäfer (/web/20141221145554/http://molily.de/) for his code improvements
 *
 * @copyright       Copyright 2005-2012, Dirk Jesse
 * @license         CC-BY 2.0 (/web/20141221145554/http://creativecommons.org/licenses/by/2.0/),
 *                  YAML-CDL (/web/20141221145554/http://www.yaml.de/license.html)
 * @link            /web/20141221145554/http://www.yaml.de
 * @package         yaml
 * @version         4.0+
 * @revision        $Revision: 617 $
 * @lastmodified    $Date: 2012-01-05 23:56:54 +0100 (Do, 05 Jan 2012) $
 */

(function () {
	var YAML_focusFix = {
		skipClass : 'ym-skip',

		init : function () {
			var userAgent = navigator.userAgent.toLowerCase();
			var	is_webkit = userAgent.indexOf('webkit') > -1;
			var	is_ie = userAgent.indexOf('msie') > -1;

			if (is_webkit || is_ie) {
				var body = document.body,
					handler = YAML_focusFix.click;
				if (body.addEventListener) {
					body.addEventListener('click', handler, false);
				} else if (body.attachEvent) {
					body.attachEvent('onclick', handler);
				}
			}
		},

		trim : function (str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},

		click : function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			var a = target.className.split(' ');

			for (var i=0; i < a.length; i++) {
				var cls = YAML_focusFix.trim(a[i]);
				if ( cls === YAML_focusFix.skipClass) {
					YAML_focusFix.focus(target);
					break;
				}
			}
		},

		focus : function (link) {
			if (link.href) {
				var href = link.href,
					id = href.substr(href.indexOf('#') + 1),
					target = document.getElementById(id);
				if (target) {
					target.setAttribute("tabindex", "-1");
					target.focus();
				}
			}
		}
	};
	YAML_focusFix.init();
})();