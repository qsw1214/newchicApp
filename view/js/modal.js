var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, 
            presto: u.indexOf('Presto') > -1, 
            webKit: u.indexOf('AppleWebKit') > -1, 
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
            iPhone: u.indexOf('iPhone') > -1 , 
            iPad: u.indexOf('iPad') > -1, 
            webApp: u.indexOf('Safari') == -1,
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

;(function(){
	$.nc_item = {
		modal_show:function(obj){
			if(RegExp("modal").test($("body").attr("class")) && $("body").attr("class") != "modal_"+obj.target) return;
			if(!$("body").hasClass("modal_"+obj.target)){
				$(".container").append('<div class="mnc_model"></div>');
				$(".mnc_model").fadeIn(function(){
					if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
					$(".container .mnc_model").click(function(){ $.nc_item.modal_out(obj); });
				});
				$("body").addClass("modal_"+obj.target);
			}else{
				this.modal_out(obj);
			}
		},
		modal_out:function(obj){
			$("body").removeClass("modal_"+obj.target);
			$(".mnc_model").fadeOut(function(){
				$(this).remove();
				if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.disable();
			}).bind(this);
		},
		country_nav_select:function(obj){
			obj.parent().siblings("h3.res_nav").children("strong").text(obj.text());
			obj.addClass("active").siblings("li").removeClass("active");
			obj.parent().slideUp(200).removeClass("show");
			var index = $(".country_view .country_list ul li[data_val="+obj.text()+"]:first").index();
			$(".country_list ul").scrollTop($(".country_view .country_list ul li").outerHeight()*index);
		},
		show_nav_select:function(obj){
			if(obj.siblings("ul").hasClass("show")){
				obj.siblings("ul").slideUp(200).removeClass("show");
			}else{
				obj.siblings("ul").slideDown(200).addClass("show");
			}
		},
		country_list_scroll:function(obj){
			$(".country_view .sele_top ul").slideUp(200).removeClass("show");
			var item_index = Math.ceil(obj.scrollTop()/obj.children("li").outerHeight());
			var res_val = $(".country_view .country_list ul li:eq("+item_index+")").text().substr(0,1);			
			$("h3.res_nav").children("strong").text(res_val);
			$(".country_view .sele_top ul li[data_val="+res_val+"]").addClass("active").siblings("li").removeClass("active");
		},
		get_country:function(obj){			
			$("strong.sele_country").text(obj.text());
			$("h3.res_nav").children("strong").text(obj.text().substr(0,1));
			$(".country_view .sele_top ul li[data_val="+obj.text().substr(0,1)+"]").addClass("active").siblings("li").removeClass("active");
		},
		show_sub_cate:function(obj){			
			var $parent = obj.parent()
			if(!$parent.hasClass("show")){
				$parent.addClass("show");				
				$parent.children(".inner_group").slideDown(200);
				if(obj.parents(".filter_group").length>0) $parent.siblings("li").removeClass("show").children(".inner_group").slideUp(200);				
			}else{
				$parent.removeClass("show");
				$parent.children(".inner_group").slideUp(200);
			}
		},
		switch_segment_item:function(obj){
			if(obj.hasClass("active")) return;
			obj.addClass("active").siblings(".segment_item").removeClass("active");
			obj.parent().siblings(".seg_index").css({"webkitTransform":"translate("+100*obj.index()+"%,0)","transform":"translate("+100*obj.index()+"%,0)"})
			$(".cou_content").css({"webkitTransform":"translate("+100*obj.index()*-1+"%,0)","transform":"translate("+100*obj.index()*-1+"%,0)"})
		},
		fil_item_select:function(obj){
			obj.addClass("active").parent().siblings("li").children("button").removeClass("active");
			obj.parents("li.list_group_item").find("s").text(obj.text())
		},
		select_item_check:function(obj) {
			obj.addClass("active").siblings("li").removeClass("active");
			if(obj.parents(".inner_group").length>0){
				obj.parents(".inner_group").slideUp().parent().removeClass("show");
				obj.parents(".inner_group").siblings(".group_top").find("b").text(obj.text())
			}
		},
		reset_img_size:function(){			
			$(".collection_view ul li span.img_box").height($(".collection_view ul li").width()*4/3);
		}
	}
})(jQuery);


$(document)
.on("click","strong.sele_country",function(){
	$.nc_item.modal_show({ target:"country_view" });
})
.on("click",".country_view .sele_top ul li",function(){
	$.nc_item.country_nav_select($(this));
})
.on("click",".cate_fil .icon_fil",function(){
	$.nc_item.modal_show({ target:"filter_view" });
})
.on("click",".reviews .icon_camera",function(){
	$.nc_item.modal_show({ target:"image_view" });
})
.on("click",".cate_fil .icon_sort",function(){
	$.nc_item.modal_show({ target:"sort_view" });
})
.on("click",".country_view .sele_top h3.res_nav",function(){
	$.nc_item.show_nav_select($(this));
})
.on("click",".country_list ul li",function(){
	$.nc_item.get_country($(this));
	$.nc_item.modal_out({ target:"country_view" });
})
.on("click",".list_group .group_top",function(){
	$.nc_item.show_sub_cate($(this));
})
.on("click",".segment_box .segment .segment_item",function(){
	$.nc_item.switch_segment_item($(this));
})
.on("click",".inner_group li button",function(){
	$.nc_item.fil_item_select($(this));
})
.on("click",".list_group.select li",function(){
	$.nc_item.select_item_check($(this));
})
.on("click",".icon_back.i_head_1",function(){
	history.back();
})
;

$(".country_list ul").scroll(function(){
	$.nc_item.country_list_scroll($(this));
})

$(document).ready(function(){
	$.nc_item.reset_img_size();
})

var swiper = new Swiper(".main_swiper", {pagination:".swiper-pagination",loop: true,autoplay: 4000,autoplayDisableOnInteraction: false});
