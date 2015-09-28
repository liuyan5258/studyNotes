##innerHtml、innerText、textContent、html别傻傻分不清楚啦  
* innerText和textContent推荐使用textContent
    *  textContent会获取所有元素的内容，包括 script 和 style元素，然而IE里面的innerText不会
    *  innerText会受样式的影响，他不返回隐藏元素，而textContent返回
    *  由于innerText会受样式的影响，所以它会触发重排（reflow）,但textContent不会
*  当需要往一个元素里面写文本的时候，innerHtml和textContent推荐使用textContent
    *  因为textContent文本不会解析html，所以他很可能在性能上表现更好，同时还能避免XSS攻击
*  当需要往一个元素里面写html内容的时候，innerHtml和html推荐使用html
