(function($){
	/**
	 * 表头悬浮插件
	 * @author zxy
	 * @date 2017-07-18 13:17:54
	 * @param bgColor   用于定制表格表头的背景颜色，非必填,string类型，填空串也不影响结果;有时可能不起作用
	 * @param topOffset 生成的表头距顶部的高度，非必填，number类型，填0也不影响结果
	 * eg: $("#表格table的Id").fixedTableHeader("",0);
	 */
    $.fn.fixedTableHeader = function (bgColor,topOffset) {
		var isFirefox=(navigator.userAgent.toUpperCase().indexOf("FIREFOX") > 0) ? true:false;//是否是火狐浏览器
	    var t = $(this);
	    // 判断生成的表头距浏览器顶部的高度
	    if(typeof(topOffset)=="undefined"|| topOffset <= 0){
			topOffset = 0;
		}
	    var tableOffset = t.offset().top - topOffset;  // 这里需要减去距离顶部的那部分高度
	    // 创建一个表格，设置样式
	    var fixed_table = $('<table></table>').css({ 'display':'none', 'position':'fixed', 'top':topOffset, 'background-color':'white' });
	   	 // 如果传递了背景颜色进来，那么就设置背景颜色
	    if(typeof(bgColor) != "undefined" && bgColor.trim() != ""){
	    	fixed_table.css("background-color",bgColor);
	    }
	   	// 把表格的标题clone过来
	    t.parent().append(fixed_table.append(t.find("thead").clone()));
	   
		if(isFirefox){
			// 设置表格属性和样式
			fixed_table.attr("border",t.attr("border"));
			fixed_table.css("border-collapse",t.css("border-collapse"));
			fixed_table.attr("cellspacing",t.attr("cellspacing"));
			fixed_table.css("margin-left",t.css("margin-left"));
			fixed_table.css("margin-right",t.css("margin-right"));
			fixed_table.css("margin-top",t.css("margin-top"));
			fixed_table.css("margin-bottom",t.css("margin-bottom"));
			fixed_table.css("padding-right",t.css("padding-right"));
			fixed_table.css("padding-left",t.css("padding-left"));
			fixed_table.css("padding-top",t.css("padding-top"));
			fixed_table.css("padding-bottom",t.css("padding-bottom"));
			// 设置表格的宽度
			fixed_table.css("width",t.css("width"));
		}else{
			// 设置表格属性和样式
			fixed_table.attr("border",t.attr("border"));
			fixed_table.css("border-collapse",t.css("border-collapse"));
			fixed_table.attr("cellspacing",t.attr("cellspacing"));
			fixed_table.css("margin",t.css("margin"));
			fixed_table.css("padding",t.css("padding"));
			// 设置表格的宽度
			fixed_table.width(t.outerWidth());
		}
		
		// 设置表格悬浮标题单元格的宽度
	    fixed_table.find("th").each(function (i) {
	        $(this).css("width",t.find("th").eq(i).css("width"));
	        if(isFirefox){
	        	$(this).css("padding-left",t.find("th").eq(i).css("padding-left"));
		        $(this).css("padding-right",t.find("th").eq(i).css("padding-right"));
		        $(this).css("padding-top",t.find("th").eq(i).css("padding-top"));
		        $(this).css("padding-buttom",t.find("th").eq(i).css("padding-buttom"));
		        $(this).css("margin-left",t.find("th").eq(i).css("margin-left"));
		        $(this).css("margin-right",t.find("th").eq(i).css("margin-right"));
		        $(this).css("margin-top",t.find("th").eq(i).css("margin-top"));
		        $(this).css("margin-buttom",t.find("th").eq(i).css("margin-buttom"));
	        } else {
	        	$(this).css("padding",t.find("th").eq(i).css("padding"));
		        $(this).css("margin",t.find("th").eq(i).css("margin"));
	        }
	    });
	
	    $(window).bind("scroll", function () {
	        var offset = $(this).scrollTop();
	        if (offset >= tableOffset && fixed_table.is(":hidden")) {
	            fixed_table.show();
	        }
	        else if (offset < tableOffset) {
	            fixed_table.hide();
	        }
	    });
	    return t;
	}
}(jQuery));

