##innerHtml、innerText、textContent、html别傻傻分不清楚啦  
* innerText和textContent推荐使用textContent
    *  textContent会获取所有元素的内容，包括 script 和 style元素，然而IE里面的innerText不会
    *  innerText会受样式的影响，他不返回隐藏元素，而textContent返回
    *  由于innerText会受样式的影响，所以它会触发重排（reflow）,但textContent不会
*  当需要往一个元素里面写文本的时候，innerHtml和textContent推荐使用textContent
    *  因为textContent文本不会解析html，所以他很可能在性能上表现更好，同时还能避免XSS攻击
*  当需要往一个元素里面写html内容的时候，innerHtml和html推荐使用html

##获取数据  
* data["00340F0R"]和data.00340F0R前者更好些
* html5 element.dataset API
   *  这是html5的新功能，用来取代jquery中的$.data()
   *  如果你的页面只需要简单的操作data-*自定义属性,可以用它
*  使用方法  

```html
    <div id="myDiv" data-name="myDiv" data-id="myId" data-my-custom-key="This is the value"></div>
```
```javascript
    //获取数据
    // Get the element
    var element = document.getElementById("myDiv");

    // Get the id
    var id = element.dataset.id;
    
    // Retrieves "data-my-custom-key"
    var customKey = element.dataset.myCustomKey;
    
    // 可以赋值
    element.dataset.myCustomKey = "Some other value";
    
    //给不存在的data-属性赋值，会自动创建
    element.dataset.mootoolsFtw = "true";
```  
###相关链接  
* https://jsperf.com/jquery-html-vs-innerhtml-the-better-way/3
* https://jsperf.com/jquery-html-vs-text-vs-innerhtml-vs-innertext-textconte/2
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
