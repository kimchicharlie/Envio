(function (window, undefined) {

	window.SocialShare = { };

	SocialShare.Networks = [
		{
			name: 'Facebook',
			class: 'facebook',
			icon:'icon-facebook-1',
			url: 'http://www.facebook.com/sharer.php?s=100&p[url]={url}&p[images][0]={img}&p[title]={title}&p[summary]={desc}'
			
		},
		{
			name: 'Twitter',
			class: 'twitter',
			icon:'icon-twitter-bird',
			url: 'https://twitter.com/share?url={url}&text={title}&via={via}&hashtags={hashtags}'
			
		},
		{
			name: 'Google+',
			class: 'google',
			icon:'icon-gplus-1',
			url: 'https://plus.google.com/share?url={url}'
			
		},		
		{
			name: 'Linked In',
			class: 'linkedin',
			icon:'icon-linkedin-1',
			url: 'http://www.linkedin.com/shareArticle?url={url}&title={title}',
		}
	];

	SocialShare.generateSocialUrls = function(opt) {
		if (typeof opt !== 'object') { return false; }
		var links = [], network;
		for (var i = 0; i < SocialShare.Networks.length; i++) {
			network = SocialShare.Networks[i];
			links.push({
				name : network.name,
				class : network.class,
				icon:network.icon,
				color:network.color,
				url : SocialShare.generateUrl(network.url, opt)
				
			});
		}
		return links;
	};

	SocialShare.generateUrl = function(url, opt) {
		var prop, arg, arg_ne;
		for (prop in opt) {
			arg = '{' + prop + '}';
			if  (url.indexOf(arg) !== -1) {
				url = url.replace(new RegExp(arg, 'g'), encodeURIComponent(opt[prop]));
			}
			arg_ne = '{' + prop + '-ne}';
			if  (url.indexOf(arg_ne) !== -1) {
				url = url.replace(new RegExp(arg_ne, 'g'), opt[prop]);
			}
		}
		return this.cleanUrl(url);
	};

	SocialShare.cleanUrl = function(fullUrl) {
		//firstly, remove any expressions we may have left in the url
		fullUrl = fullUrl.replace(/\{([^{}]*)}/g, '');

		//then remove any empty parameters left in the url
		var params = fullUrl.match(/[^\=\&\?]+=[^\=\&\?]+/g),
			url = fullUrl.split("?")[0];
		if (params && params.length > 0) {
			url += "?" + params.join("&");
		}

		return url;
	};

	SocialShare.doPopup = function(e) {

		e = (e ? e : window.event);
		var t = (e.target ? e.target : e.srcElement);
		
		t = ( jQuery(t).is('a') ) ? t : e.target.parentElement ;

		var  width = t.data-width || 800,
		height = t.data-height || 500;

		console.log(e.target.parentElement);

		// popup position
		var px = Math.floor(((screen.availWidth || 1024) - width) / 2),
		py = Math.floor(((screen.availHeight || 700) - height) / 2);

		// open popup
		var popup = window.open(t.href, "social",
			"width="+width+",height="+height+
			",left="+px+",top="+py+
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");


		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		}

		return !!popup;
	};

})(window);
