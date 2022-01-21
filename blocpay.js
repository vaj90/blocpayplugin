(function($){
	var blocPayPop = (opt) => {
        const newWindow = window.open(opt.url, opt.title, 
            `
            scrollbars=yes,
            width=${opt.width}, 
            height=${opt.height}, 
            top=${opt.top}, 
            left=${opt.left}
            `
        )
        if (window.focus) newWindow.focus();
    }
	var ext =["jpeg","png","gif","bmp","svg"];
	var _defaults = {
        isModal: false,
        url: "",
        btn: {
            "class" : "blocpay-plain",
            "icon": "assets/img/icon.png",
            "text": "BlocPay",
			"event": blocPayPop,
			"customContent": "",
			"customEvent": null
        },
        title: "Bloc Pay",
        width: 640,
        height: 480,
        left : 0,
        top : 0
	};
	function BlocPay(elem, opt){
		this._defaults = _defaults;
		this._options = $.extend(true, {}, _defaults, opt);
		this._element = elem;
		this.init();
	}

	BlocPay.fn = BlocPay.prototype = {
		init: function(){
			var elem = this._element;
			var opt = this._options;
            opt.left = (screen.width - opt.width) / 2
            opt.top = (screen.height - opt.height) / 4
			var $btn = $("<button>");
			if(opt.btn.class!=""){
				$btn.attr({"class": `blocpay ${opt.btn.class}`})
			}
			if(opt.btn.icon!=""){
				if(ext.indexOf(opt.btn.icon)){
					$btn.append($("<img>").attr({"src": opt.btn.icon}))
				}
			}			
			if(opt.btn.text!=""){
				$btn.append($("<span>").html(opt.btn.text))
			}
			if(opt.btn.customContent!=""){
				$btn.html(opt.btn.custom)
			}
			if(opt.btn.event!=null){
				$btn.click(function(){
					if(!opt.isModal){
						opt.btn.event(opt)
					}
					else{
						var dialog = bootbox.dialog({
							message: `<div class='blocpay-container'>
										<iframe src='${opt.url}' class="border-0"></iframe>
									</div>`,
							size: 'md'
						});
					}
				})
			}
			if(opt.btn.customEvent!=null){
				$btn.click(function(){
					opt.btn.customEvent
				})
			}
			elem.append($btn)
		},
		isModal: function(){
			var args = arguments;
			if(args.length == 0) return this._options.isModal;
			else if(args.length > 0 && typeof args[0] === "boolean"){
				this._options.isModal = args[0];
				return this;
			}
		},	
        url: function(){
			var args = arguments;
			if(args.length == 0) return this._options.url;
			else if(args.length > 0 && typeof args[0] === "string"){
				this._options.url = args[0];
				return this;
			}
		},	
		title: function(){
			var args = arguments;
			if(args.length == 0) return this._options.title;
			else if(args.length > 0 && typeof args[0] === "string"){
				this._options.title = args[0];
				return this;
			}
		},	
		width: function(){
			var args = arguments;
			if(args.length == 0) return this._options.width;
			else if(args.length > 0 && typeof args[0] === "number"){
				this._options.width = args[0];
				return this;
			}
		},	
		height: function(){
			var args = arguments;
			if(args.length == 0) return this._options.height;
			else if(args.length > 0 && typeof args[0] === "number"){
				this._options.height = args[0];
				return this;
			}
		},	
		btn: function(){
			var args = arguments;
			if(args.length == 0) return this._options.btn;
			else if(args.length > 0 && typeof args[0] === "object"){
				this._options.btn = args[0];
				return this;
			}
		},	
	};

	$.fn.blocpay = function(options){
		var args = arguments;
		var isGet = false;
		
		$.each(this, function(){
			var $this = $(this);
			var plugin = $this.data("blocpay");
			if(!plugin){
				plugin = new BlocPay($this, options);
				$this.data("blocpay_plugin", plugin);
			}
			
			if(args.length > 0){
				if(typeof args[0] === 'string'){
					var f = plugin[args[0]];
					if(f && typeof f === 'function'){
						if(args.length > 1){
                            plugin[args[0]](args[1]);
                        } 
						else {
							isGet = plugin[args[0]]();
						}
					}
				}
			}
		});
		return isGet ? isGet : this;
	}
})(jQuery);