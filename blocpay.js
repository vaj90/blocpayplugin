(function($){
	var _defaults = {
        isModal: false,
        url: "",
        btn: {
            "class" : "btn",
            "icon": "",
            "text": "blocpay"
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
	BlocPay.fn = BlocPay.prototype = {
		init: function(){
			var elem = this._element;
			var opt = this._options;
            opt.left = (screen.width - opt.width) / 2,
            opt.top = (screen.height - opt.height) / 4
			elem.append(
				$("<button>").attr({
					"class": `blocpay-btn ${_defaults.btn.class}`
				}).html(_defaults.btn.text).click(function(){
					blocPayPop(opt);
				})
			)
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