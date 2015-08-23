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
