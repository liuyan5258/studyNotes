
```javascript
 var isQqbrowser = navigator.userAgent.match(/MQQBrowser/ig),
    isUcbrowser = navigator.userAgent.match(/UCBrowser/ig),
    
    isAndroid = navigator.userAgent.match(/android/ig),
    isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig),
    isSafari = navigator.userAgent.match(/safari/ig),
    isWinPhone = navigator.userAgent.match(/Windows Phone/g),
    
    isWeixin = navigator.userAgent.match(/micromessenger/gi),
    isWeibo = navigator.userAgent.match(/weibo/gi),
    isYixin = navigator.userAgent.match(/yixin/gi),
    isQQ = navigator.userAgent.match(/qq/gi) and not navigator.userAgent.match(/qqbrowser/gi),
    isQzone = navigator.userAgent.match(/qzone/gi),
    isNewsapp =  navigator.userAgent.match(/NewsApp/ig),
    
    isAdUc = navigator.userAgent.match(/android.*UCBrowser/i);
    
    
```

## 相关链接  

*  [js/jQuery判断浏览器名称、内核版本、浏览器壳](http://qianduanblog.com/post/js-jquery-browser-version-name-shells.html)
*  [jquery.ua.js docs](http://festatic.aliapp.com/js/jquery.ua/)
