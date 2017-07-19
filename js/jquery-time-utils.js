/**
 * jQuery时间插件+倒计时插件
 * 时间插件使用方式:selector.runtime(),这样会自动更新selector中的内容
 * 时间插件使用方式:selector.downcount('time秒后重新发送',60)
 */
(function($){
	
	$.fn.extend({
		
		/** 显示系统运行时间 */
		runtime : function(){
			// 2016年11月01日 星期二 20:20:20
			/** 创建日期对象 */
			var d = new Date();
			/** 定义数组 */
			var res = new Array();
			/** 获取年 (加1900) */
			res.push(d.getFullYear() + "年");
			/** 获取月 0-11 */
			res.push($.calc(d.getMonth() + 1) + "月");
			/** 获取日 */
			res.push($.calc(d.getDate()) + "日");
			/** 获取星期几 0(星期日)-6(星期六) */
			res.push("&nbsp;" + $.weeks[d.getDay()] + "&nbsp;");
			/** 获取时 */
			res.push($.calc(d.getHours()) + ":");
			/** 获取分 */
			res.push($.calc(d.getMinutes()) + ":");
			/** 获取秒 */
			res.push($.calc(d.getSeconds()));
			
			/** join把数组元素用逗号分隔开返回一个字符串 */
			this.html(res.join(""));
			
			/** 声明成局部变量 */
			var obj = this;
			
			/** 延迟的定时器 */
			setTimeout(function(){
				obj.runtime();
			},1000);
		},
		
		/** 获取短信验证码按钮倒计时的方法 */
		downcount : function(msg,seconds){
			if (seconds > 1){
				/** msg: time秒后，重新获取! */
				seconds--;
				var text = msg.replace("time", seconds);
				/** 设置按钮的value */
				this.val(text).attr("disabled", true);//禁用按钮
				var obj = this;
				/** 开启延迟的定时器 */
				setTimeout(function(){
					obj.downcount(msg, seconds);
				},1000);
			}else{
				this.val("获取验证码").attr("disabled", false);//启用按钮
			}
		}
		
	});
	
	/** 批量添加静态的方法 */
	$.extend({
		weeks : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
		calc : function(num){
			return num > 9 ? num : "0" + num;
		}
	});
})(jQuery);