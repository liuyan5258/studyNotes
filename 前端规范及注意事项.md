##收集一些前端开发规范  
为什么要做前端开发规范呢，规范并不是一种限制，它是一种约定，它能提高工作效率，促进团队之间的协作，形成一种团队文化。  

* 【约定】规范
    *  文件命名全部都用小写和下划线，样式命名全部使用小写和连接符，JS的钩子使用“J_HiTao”
* 【js】规范  
    *  在书写代码时，应该尽量在函数开始地方统一进行变量声明，变量名注意语义化，一般使用名词来命名，不要在意名字的长度，压缩后会替换为简短的变量名的。
    *  [浮点数的计算过程是：先将浮点数转化为二进制，然后进行计算，再转化为十进制，这样子会有少许的误差，所以为了避免这种误差我们可先将浮点数乘以10的n次方，转化为整数计算，然后再转化为小数。](http://blog.csdn.net/zcczcw/article/details/7362473)
    *  [尽量向 setTimeout() 和 setInterval()传送函数名，而不要传送字串。setTimeout() 和 setInterval() 方法近似于 eval。如果传进参数是字符串，则在一段时间之后，会和 eval一样执行字符串值，当然其低效率也和 eval 一样。但这些方法也可以接受函数作为第一个参数。在一段时间后将调用此函数，但此函数可在编译时被解释和优化，也就是说会有更好的性能。](http://blog.csdn.net/zxsrendong/article/details/6992771)
    *  字符串合并是比较慢的。+ 运算符并不管是否将结果保存在变量中。它会创建新 string 对象，并将结果赋给此对象；也许新对象会被赋给某个变量。下面是一个常见的字符串合并语句： a += 'x' + 'y'; 此代码首先创建临时string对象保存合并后的'xy'值，然后和a变量合并，最后将结果赋给a。下面的代码使用两条分开的命令，但每次都直接赋值给a ，因此不需要创建临时string对象。结果在大部分浏览器中，后者比前者快20%，而且消耗更少的内存： a += 'x'; a += 'y'  
    *  [在遍历Dom结构时，应该尽量避免修改Dom，比如在遍历的时候不断的增加元素，可能会造成无限循环，每次修改都是实时更新的，如果有需要可以先建立一个静态列表进行遍历](http://www.cnblogs.com/hyddd/archive/2013/02/07/2908960.html)
    *  [绝对不能为Object.prototype添加属性，所添加的任何属性和方法都可以通过for/in循环枚举，当一个对象被当做关联数组使用时将会带来很大的问题](http://www.cnblogs.com/ziyunfei/archive/2012/12/03/2799984.html)
    *  需要做页面刷新的时候推荐使用location.replace和location.href两个方法，而不推荐使用location.reload和history.go(0)，因为这两个刷新相当于按F5刷新，有表单提交的页面很容易会给出是否重复提交表单的提示
    *  关于Preload的一篇文章：http://www.phpied.com/preload-cssjavascript-without-execution/
    *  toFixed 方法返回一个以定点表示法表示的数字的字符串形式，但是有一点需要注意的是，各浏览器下返回的值会稍有不同，有些会进行四舍五入，而有些是进行直接截取，解决的方法一是重写这个方法，二是在进行相应操作时先乘以10的n次方，然后再转化为小数。
    *  !!可以便捷的强制把其他类型转换为布尔类型，比如 !!1
    *  在使用 parseInt 函数转换数字的时候，尽量带上第二个参数，强制转换为某一进制类型的数字，否则，如 parseInt('080') 可能不能获得你想要的结果，推荐使用 parseInt('080', 10)
    *  在做数组或者其它依赖 length 属性的循环时，建议先对 length 赋值，这样可以避免每次循环都去计算 length（特殊情况除外），例如：
    ```javascript
    var myString = "Hello"; 
    for ( var i = 0, len = myString.length; i < len; i++ ) { 
        alert( myString.charAt( i ) ); 
    }
    ```
    *  条件判断时，比如 if ( myNum == 3 )，建议书写为 if ( 3 == myNum )，因为后者在你误写 == 为 = 或者其它失误时，错误发生后你可以很容易的发行问题，浏览器的报错提示也会有更友好的提示。
    *  在使用 setTimeout 或者 setInterval 函数时，需要注意，如果第一个参数传入的是字符串，那么将在全局作用域里寻找此函数，而不会在当前作用域中寻找，所以建议第一个参数传入函数，比如：
    ```javascript
    setTimeout( function() { loop(counter); }, 1000 )
    ```
    *  setTimeout可以改变调用栈的顺序：
    ```javascript
    alert(1); 
    setTimeout(function (){
        alert(2) 
    },0); 
    alert(3); 
    alert(4); //执行顺序 1 → 3 → 4 → 2
    ```
    相关延伸阅读: http://ejohn.org/blog/how-javascript-timers-work/ 
    *  在创建img时，src不要设置为空或者#，否则会对页面再次发生请求，建议设置为about:blank;在创建a时，href也不要设置为空或者#，否则会对页面再次发生请求，建议设置为javascript:void(0);
    *  逻辑运算符&&和||的“短路”原理，如&&中第一个表达式为假就不会去处理第二个表达式，而||正好相反。在js中有意思的是它们的返回值： 例：var attr = true && 4 && “aaa”;那么运行的结果attr就不是简单的true或这false，而是”aaa” 。 例：var Yahoo = Yahoo || {};经常用来判断一个变量是否已定义，如果没有定义就给他一个初始值。 那么，可以这样优化代码： if(a >=5){alert(“你好”);} 可以写成： a >= 5 && alert(“你好”); 注：js中||和&&的特性帮我们精简了代码的同时，也带来了代码可读性的降低。需要我们自己来权衡了！
    *  对一个字符串使用replace方法的时候，用正则模式可以替换掉字符串里面的全部子字符串，用字符串模式则只做一次匹配,只替换第一个匹配， var aa = ”{}{}{}”; Var cc = aa.replace(”{”,”LEFTQUOTE”);只做一次匹配 console.log(cc); var bb = ”{}{}{}”; Cc = bb.replace(/{/g,”LEFTQUOTE”);可做全部的替换 console.log(cc);
    *  JavaScript不支持重载，在JavaScript中，脚本在执行时不会顾及函数定义时的参数，而是直接使用在作用域链中最后定义的那个函数。这意味着，相同名称的函数永远只存在一个实例。
    *  将函数的引用作为参数传递到setTimeout()和setInterval()里优于将函数名作为字符串参数传递（硬编码）。例如，setTimeout(”someFunc()”, 1000)执行效率慢于setTimeout(someFunc, 1000)。
    *  对于简单的任务，最好使用基本操作方式来实现，而不是使用函数调用实现。例如val1 < val2 ? val1 : val2;执行速度快于Math.min(val1, val2);，类似的，myArr.push(newEle);慢于myArr[myArr.length] = newEle;
    *  关于鼠标在页面中坐标显示的种种：http://www.javaeye.com/topic/775445
    *  关于连续赋值的两篇文字：http://www.javaeye.com/topic/785445 ，http://lifesinger.org/blog/2010/10/a-x-a/
* 【移动端】规范
    *  强制WEB App在iPhone中全屏模式运行
    ```html
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    ```
    *  移动设备上的CSS媒体查询应用：
    ```css
    img {
        margin:0 0 10px 10px; 
        float:right; 
    } 
    @media all and (max-width: 480px) {
        img { 
        margin:10px auto; 
        float:none; 
        display:block; 
        } 
    } 
    @media all and (max-width: 240px) {
        img { 
        display:none; 
        } 
    }
    ```
    释义：浏览器中的图片在屏幕大于480px时会向右浮动，当屏幕小于480px时图片display:block并居中，屏幕小于240px非常小时，直接让图片消失掉 (Opera/Safari3 only)
    *  GIF、PNG、TIFF最大尺寸上限是300万像素，也就是说，确保width * height ≤ 3 * 1024 * 1024。JPEG二次采样（颜色压缩）后的最大尺寸上限是3200万像素
    *  canvas元素的最大尺寸上限是3百万像素，canvas对象的默认宽高是150 x 300像素
    *  页面在载入图像的时候并不知道图像的尺寸，所以刚开始仅显示混杂在一起的问题，图片完全在载入后才会显示图片，这样在网速极慢的情况下就会造成页面的跳动，如果确定图片的大小尺寸的话，应该在img标签上设置宽高，这样的话可以在页面载入时会预先留好位置，避免发生类似问题
    *  对于input框，在定义高度后在ie下会出现各种很怪异的问题，所以我们一般不定义input框的高度，通过padding值来控制
    *  在一些切图的活动页面，如果出现图片裂缝问题，就在全局样式里加一个 img { vertical-align:middle;}，即可解决。
    *  关于 Canvas 和 SVG 探讨的一篇文章：http://www.sitepoint.com/blogs/2010/07/06/canvas-vs-svg-how-to-choose/
    *  样式的解析规则是从右到左，比如 div p {},浏览器解析是先匹配到 p，再匹配到 div。
    *  兼容iPhone/Android的屏幕旋转事件：
    ```javascript
    var supportsOrientationChange = “onorientationchange” in window, 
    orientationEvent = supportsOrientationChange ? “orientationchange” : “resize”; 
    window.addEventListener(orientationEvent, function() {
      switch(window.orientation){ 
        case 0: 
        //do sth; 
        break; 
        case 90: 
        //do sth; 
        break; 
      } 
    }, false);
    ```
    *  获取当前地理位置的方法：
    ```javascript
    /*
      showMap:回调函数
      latitude:坐标变量
     */
    navigator.geolocation.getCurrentPosition(showMap),
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude;
    ```
    *  Android 2.2 webkit新APIs：navigator.connection.type可以判断当前网络连接的类型；navigator.onLine检测设备是否联网；navigator.isApplicationInstalled检测是否安装某一个本地应用
    *  iPhone上使用Gestures API来实现缩放和旋转：
    ```javascript
    var width = 100, height = 200, rotation = ; 
    node.ongesturechange = function(e){ 
      var node = e.target; 
      // 缩放和旋转都是相对值， 
      // 所以要等手势结束时再更改我们的变量 
      node.style.width = (width * e.scale) + "px"; 
      node.style.height = (height * e.scale) + "px"; 
      node.style.webkitTransform = "rotate(" + ((rotation + e.rotation) % 360) + "deg)"; 
    } 
    node.ongestureend = function(e){ 
      // 更新这些变量，以备后用 
      width *= e.scale; 
      height *= e.scale; 
      rotation = (rotation + e.rotation) % 360; 
    }
    ```
    *  iPhone/Android 如何去掉超链接点击高亮的边框? dom.ontouchstart = function(){ return false; } 即可去除
    *  创建复杂的HTML标签或是多层的嵌套标签时，可以选择使用DocumentFragment机制，它可以提供一个缓冲的机制，将DOM节点先放到内存中，当节点都构造完成后，再将DocumentFragment对象添加到页面中，这时所有的节点都会一次渲染出来，能减少浏览器很多的负担，明显的提高页面渲染速度。
    *  <link rel=“apple-touch-icon” href=“apple-touch-icon.png”/>，第一行就是设置桌面快捷方式图标的，图标必须是57*57像素的文件，不需要自己做圆角和高亮效果，系统会自动帮你搞定这个，放在网页根目录会作用于下面的全部网页，当然也可以为每个页面设置单独的图标。
    
