##桌面优先的网站
在创建纯粹的桌面网站或纯粹的移动网站之外，我们还有其他的建站方式，其中之一就是桌面优先，并在移动设备上优雅降级。
##移动优先网站
另一种方式是移动优先，并在桌面设备上优雅降级。
```css
@media only screen and (min-width:320px) {
    /* style */
}
@media only screen and (min-width:640px) {
	/* style */
}
@media only screen and (min-width:800px) {
	/* style */
}
@media only screen and (min-width:1024px) {
	/* style */
}
```
##一站方式
只创建一个网站，并兼容移动和桌面设备，而不是只专注其中一个。
##避免文本字体大小重置
针对iphone手机在竖屏切换的横屏模式，该页面的字体会突然变大。显而易见，改页面的字体大小被重置了，这并不是开发者期望的结果。  

解决方式：  
```css
html{
    -webkit-text-size-adjust: none;
}
```
但这样设置会导致非移动设备下的浏览器访问时页面缩放功能被禁用。为了防止这种易用性问题，可以把none改为100%.  
```css
html{
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;  //ms是windows Mobile的前缀
    text-size-adjust: 100%;  //是为了应对未来的变化
}
```
##优化浏览器视口宽度设置
有些移动设备，他们在横屏和竖屏下的视口宽度是不一样的，我们需要把视口宽度设置为匹配设备宽度。
```html
<meta name="viewport" content="width=device-width">
```
##修复移动版Safari的re-flow scale问题
问题：当你从竖屏模式切换到横屏模式的时候，浏览器上的文本字体会突然变大。  
如果只有如下的代码：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
```
解决方法，加一段js：
```javascript
<script>
    var metas = document.getElementsByTagName('meta');
	var i;
	if(navigator.userAgent.match(/iPhone/i)) {
		for(i=0;len=metas.length;i<len;i++){
			if(metas[i].name == "viewport") {
				metas[i].content = "width=device-width,minimum-scale=1.0,maximum-scale=1.0";
			}
		}
		document.addEventListener("gesturestart",gestureStart,false);
	}
	function gestureStart() {
		if(i=0;len=metas.length;i<len;i++) {
			if(metas[i].name == "viewport") {
				metas[i].content = "width=device-width,minimum-scale=0.25,maximum-scale=1.6";
			}
		}
	}
</script>
```
这段代码解决了切换到横屏字体变大的问题，同时又可以像以前一样使用页面的缩放功能。
理解这段代码：这需要你知道设备所支持的最小缩小的比例，和最大放大的比例，不过上面的代码只支持iphone。
```javascript
!function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, !0);
  }
  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, !0);
  }
}(document);
```
这是John-David dalton做的修改，似乎是更好的版本，请戳原地址：https://gist.github.com/jdalton/903131
##在浏览器中启动手机原生应用（地图、电话、短信等）
使用设备：基于浏览器的所有设备  
具体能够启动哪些应用：这取决于该移动设备上哪些原生应用是否允许从浏览器启动。
```html
<a href="http://maps.google.com/maps?q=cupertino">directions</a>
```
在palm os的浏览器中访问该页面，并点击directions链接，会启动你手机上的原生的GoogleMap应用。
```html
<a href="http://maps.google.com/maps?daddr=San+Francisco,+CA&saddr=cupertino">derections</a>
```
并不只是打开，还可以直接定位初始位置SanFrancisco和终点位置cupertino。  
想了解更多移动版的Safari的URL scheme，请戳：http://developer.apple.com/library/safari/#featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html
##iPhone下的全屏模式启动
试用设备：ios设备  

为了让一个应用看起来更像一个原生应用，iphone为web应用开发者提供了很多独有的特性，你可以全屏模式下
启动web应用，可以添加一个启动界面，或者添加一个加载进度条之类的，或者为你的web应用定义一个预加载的页面。  

如何做到全屏模式启动：
```html
<meta name="apple-mobile-web-app-capable" content="yes">
```
这段代码的意思是当web应用从界面图标启动时，以全屏模式启动，隐藏浏览器上部的工具栏、地址栏和底部的加载状态栏。
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```
这段代码的状态是在浏览器的顶部显示一个状态栏。
```html
<link rel="apple-touch-startup-image" href="img/l/splash.png">
```
这段代码的作用是，在程序启动、加载的时候，显示一个预加载的界面，告诉用户该程序正在加载。
问题：ipad和iphone因为屏幕大小的差异，因此需要不同大小的预加载界面，因此，如果你希望你的web应用可以动态地选择对应的预加载界面，
你可以使用如下js代码：
```javascript
var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
document.write('<link rel="apple-touch-startup-image" href="/img/'+ filename + 'splash.png" />');
```
##防止ios在聚焦时自动缩放
适用设备：ios设备  

当你在ios设备的浏览器上碰触一个表单元素触发onfocus事件时，这个元素会在屏幕上自动放大。这样的自动缩放
对做了优化的应用来说是不好的，我们可以通过修改视口meta标签的onfocus和onblur属性的值来禁用这个自动缩放的特性。
```javascript
<script>
var $viewportMeta = $('meta[name="viewport"]');
$('input,select,textarea').bind('focus blur',function(event){
    $viewportMeta.attr('content','width=device-width,initial-scale=1,maximum-scale='+(event.type == 'blur'?10:1));
});
</script>
```
##禁用或限制部分webkit特性
适用设备：使用基于webkit引擎浏览器的设备（Android、ios）  

在移动设备上，经常会遇到许多与具体设备相关的问题，通过使用一些比较少用的css技巧，我们可以很容易地解决这些问题，下面就介绍到了几种。  

“-webkit-touch-callout”属性，当你在移动设备上点击一个链接时，设备会弹出一个对话框，询问你是要在当前页面打开连接还是想要复制链接的地址。  

如果你想禁用这个特性，你可以在这个链接上或父级上添加css样式：
```css
a {
    -webkit-touch-callout:none;
}
```
更多的webkit css拓展请戳：http://www.css88.com/book/css/webkit/behavior/touch-callout.htm  
为狭窄的屏幕添加省略号功能：
```css
.ellipsis {
    text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
```
#移动设备的交互方式
##利用触控来移动页面元素
适用设备：跨浏览器  

具体代码看 移动web开发实战demo/demo_01  
问题：移动版safari不允许event对象的touches和changedTouches属性被拷贝给其他对象，我们可以用e.originalEvent来解决。  
更多关于移动版safari的移动事件处理指南，请戳：https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html  
##检测和处理横竖屏切换事件
适用设备：跨浏览器  
通过监听window.onorientationchange事件，当竖屏切换事件触发时，orientationchange会被触发，同时我们得到event.orientation作为参数传递该方法并输出。  
也可以通过media query来控制横屏和竖屏时的样式：
```css
<style type="text/css">  
    @media all and (orientation : landscape) {  
        body {   
            background-color: #ff0000;   
        }  
    }  

    @media all and (orientation : portrait){  
        body {  
            background-color: #00ff00;  
        }  
    }  
</style> 
```
具体代码看 移动web开发实战demo/demo_02  
