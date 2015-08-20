define(function(require, exports, module) {
    module.exports = {
        
        // 过滤特殊字符
        stripscript:function(letters) {
           var rule = new RegExp("[`~!@#$^&*()=|{}':;'\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。、？]");
            var replaceLetters = ""; 
            for (var i = 0; i < letters.length; i++) { 
                replaceLetters = replaceLetters+letters.substr(i, 1).replace(rule, ''); 
            } 
            return replaceLetters;
        },

        // 截取字符串
        subString:function(str, len, hasDot) {
            var newLength = 0;
            var newStr = "";
            var chineseRegex = /[^\x00-\xff]/g; //中文字符正则
            var singleChar = "";
            var strLength = str.replace(chineseRegex,"**").length;
            for(var i = 0;i < strLength;i++){
                singleChar = str.charAt(i).toString();
                if(singleChar.match(chineseRegex) != null){
                    newLength += 2;
                }    
                else{
                    newLength++;
                }
                if(newLength > len){
                    break;
                }
                newStr += singleChar;
            }

            if(hasDot && strLength > len){ //hasDot为true，截字后加省略号
                newStr += "...";
            }
            return newStr;
        },

        // 去除空格方法, 默认为去除左右空格, isGlobal为true时去除前中后的所有空格
        Trim:function (str,isGlobal) { 
            var result; 
            
            result = str.replace(/(^\s+)|(\s+$)/g,""); 
            if(isGlobal == true) 
            result = result.replace(/\s/g,""); 
            return result; 
        },

        /**
         * 截取url参数的方法
         * @param {string} name, 参数名称;
         */
        getUrlParam: function(name){
            // ;/?:@&=+$,#对于这些字符，encodeURI不对他们进行编码
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
            var r = window.location.search.substr(1).match(reg);  
            if (r!=null) return decodeURIComponent(r[2]); 
            return null; 
        },

        /**
         * Unescape解码
         * @param {string} name, 参数名称;
         */
        getUrlParamUnescape: function(name){
            // ;/?:@&=+$,#对于这些字符，encodeURI不对他们进行编码
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
            var r = window.location.search.substr(1).match(reg);  
            if (r!=null) return unescape(r[2]); 
            return null; 
        },

        /*
        * 将秒化为时间格式的方法
        * @param time {object}  可选参数，要格式化的data对象(毫秒数)，没有则为当前时间，但不可为空
        * @param format {string} 格式化字符串，必填，不可为空
        * @return {string} 返回格式化的字符串
        * tf {fn}将时间数字格式转化成字符串格式，以便跟传的字符串类型相符，小于10的数字前面会补充一个0
        * /yyyy|MM|dd|HH|mm|ss|星期|周|www|week/g 正则表达式，匹配传入的字符串，进行时间的替换
        * 格式：   
        * YYYY：4位年,如1993
        * YY：2位年,如93
        * MM：月份
        * DD：日期
        * hh：小时
        * mm：分钟
        * ss：秒钟
        * 星期：星期，返回如 星期二
        * 周：返回如 周二
        * week：英文星期全称，返回如 Saturday
        * www：三位英文星期，返回如 Sat
        */
        format: function(time, format){ 
            if (arguments.length < 2) {  //判断参数个数
                format = time;
                t = new Date();
            }
            else{
                var t = new Date(time); 
            }
            var tf = function(i){return (i < 10 ? '0' : '') + i}; 
            var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
            return format.replace(/yyyy|MM|dd|HH|mm|ss|星期|周|www|week/g, function(a){   //正则表达式匹配字符串，替换
                switch(a){ 
                    case 'yyyy': 
                    return tf(t.getFullYear()); 
                    break; 
                    case 'MM': 
                    return tf(t.getMonth() + 1); 
                    break; 
                    case 'mm': 
                    return tf(t.getMinutes()); 
                    break; 
                    case 'dd': 
                    return tf(t.getDate()); 
                    break; 
                    case 'HH': 
                    return tf(t.getHours()); 
                    break; 
                    case 'ss': 
                    return tf(t.getSeconds()); 
                    break; 
                    case "星期": 
                    return "星期" + week[t.getDay() + 7];
                    break;
                    case "周": 
                    return "周" +  week[t.getDay() + 7];
                    break;
                    case "week": 
                    return week[t.getDay()];
                    break;
                    case "www": 
                    return week[t.getDay()].slice(0,3);
                    break;
                }; 
            }); 
        },

        /* IE8兼容newDate方法 */
        NewDate: function(str) { 
            str = str.split('-'); 
            var date = new Date(); 
            date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
            date.setUTCHours(0, 0, 0, 0); 
            return date; 
        },

        /*
        * 将价格用逗号格式化的方法
        * @param price {number} or {string}，价格
        * @param dotLength {number} 分隔的位数
        */
        separatePrice: function(price) {
            price += '';
            x = price.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        
        getIntervalTime : function(startTime) {
            var day, diffTime, eTime, hour, minute, sTime, second, time;
            sTime = new Date(startTime.replace(/\-/g, "/"));
            eTime = new Date();
            diffTime = eTime.getTime() - sTime.getTime();
            second = 1000;
            minute = 1000 * 60;
            hour = 1000 * 3600;
            day = 1000 * 3600 * 24;
            if (diffTime < second) {
                time = '刚刚';
            } else if (diffTime < minute) {
                time = parseInt(diffTime / parseInt(second)) + '秒前';
            } else if (diffTime < hour) {
                time = parseInt(diffTime / parseInt(minute)) + '分钟前';
            } else if (diffTime < day) {
                time = parseInt(diffTime / parseInt(hour)) + '小时前';
            } else {
                time = startTime.split(' ')[0];
            }
            return time;
        };
        
        /* 从右往左每三位数字加个逗号 */   
        this.separateNum : function(num) {
            var ret;
            ret = [];
            while (num) {
                num = num.replace(/\d{1,3}$/g, function(a) {
                  ret.unshift(a);
                  return "";
                });
            }
            return ret.join(",");
        };
        
    }
});
