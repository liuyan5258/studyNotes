##label语句  
label语句可以在代码中添加标签，以便在将来使用。它由break或continue引用，经常与for语句等循环语句配合使用。  
```javascript
var num = 0;

outermost:
for(var i = 0;i < 10;i++){
  for(var j = 0;j < 10;j++){
    if(i == 5 && j == 5){
      break outermost;  //break语句会立即退出循环，执行循环后面的语句
    }
    num ++;
  }
}

alert(num);  //55
```
```javascript
var num = 0;

outermost:
for(var i = 0;i < 10;i++){
  for(var j = 0;j < 10;j++){
    if(i == 5 && j == 5){
      continue outermost;  //break语句也会立即退出循环，但退出循环后会从循环的顶部开始继续执行
    }
    num ++;
  }
}

alert(num);  //55
```
资料链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label  

##with语句
with语句可以将代码的作用域设置到一个特定的对象中。例如：  
```javascript
with(location){
  var qs = search.substring(1);
  var hostname = hostname;
  var url = href;
}
```
注意：由于大量使用with语句会导致性能下降，同时也会给调试代码造成困难，因此不推荐使用with语句。  

