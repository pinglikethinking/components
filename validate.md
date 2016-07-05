---
title: 原生封装验证代码JS
tags:
- 原生封装验证代码JS
---
# 封装，原生，验证信息的JS
**前言：** 工作业务采用knockoutjs的data-bind绑定数据，用别人的框架验证提交时就出问题了，好嘛，我来解决这个问题。一般类似别人框架冲突遇到的问题，最好还是自己原生解决需求。
***

#### 方案一
参考JQ的对象，我采用switch语句进行匹配验证，JS代码如下：
```javascript
function validate(type,inputWrap,myId){
    var value=document.getElementById(myId).value,
        dateRegex = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    switch (type){
        case 'beginTime':{
            if (!isNotNull(value)) {
                callback(inputWrap,'不能为空');
            } else if (!dateRegex.test(value)) {
                callback(inputWrap,'日期格式不对');
            }
        }
        break;
        case 'endTime':{
            if (!isNotNull(value)) {
                callback(inputWrap,'不能为空');
            } else if (!dateRegex.test(value)) {
                callback(inputWrap,'日期格式不对');
            }           
        }
        break;
        case 'money': {
            if (!isNotNull(value)) {
                callback(inputWrap,'不能为空');
            } else if (value > 100 || value < 0.5) {
                callback(inputWrap,'钱的金额过大或过小');
            }
            
        }
        break;
    }
}
function isNotNull(value){
    if(value!==null&&value!==undefined&&value!==''){
        return true;
    }else{
        return false;
    }
}
function callback(referId,errors){
    var lab=document.createElement('label'),
        referNode=document.getElementById(referId);
    lab.innerText=errors;
    lab.style.color='red';
    referNode.appendChild(lab);
}
```

后期根据需求增加验证信息就可以了，那么前端是如何绑定的呢？
HTML如下：
```html
<body>
    <div id="_inputWrap">
        <input type="text" id="pre" onblur='validate("money","_inputWrap","pre")'>
    </div>
    <script type="text/javascript" src="validate.js"></script>
</body>
```

ok,可以实时验证了。另外由于验证提示信息是由JS操作DOM创建的，页面就会reflow一遍，影响性能，最好先在HTML页面内创建好节点，只要hidden就好了，反正放在后面只占据一点空间（这就涉及到visibility:hidden/visible;display:none/block;一个隐藏后占据空间，一个不会，但都存在于DOM，节点并未消失，想了解更多参考我的博客displayVisiblility）.不过调用简单，没那么多配合，如果HTML JS CSS分开工作的话
所以又实现了一种方案

##### 方案二
参加另外一个项目的时候做的，因为整个登录注册页面我自己做包括样式内容等，所以这样写的提高性能，不用考虑沟通成本的问题哈哈
JS如下：
```javascript
/*
验证格式
 */
function validate(type){
    var _value=document.getElementById(type).value,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    switch (type){
        case 'phone':{
            if(!isNotNull(_value)){
                callback(type+'Erro','电话号码不能为空');
            }else if(_value.length!==11){
                callback(type+'Erro','号码格式不正确');
            }
        }
        break;
        case 'email':{
            if(!isNotNull(_value)){
                callback(type+'Erro','email不能为空');
            }else if(!emailRegex.test(_value)){
                callback(type+'Erro','邮件格式不正确');
            }
        }
        break;
        case 'phone_username':{
            if(!isNotNull(_value)){
                callback(type+'Erro','用户名不能为空');
            }else if(_value.length>10||_value.length<0){
                callback(type+'Erro','用户名不能多于10位');
            }
        }
        break;
        case 'email_username':{
            if(!isNotNull(_value)){
                callback(type+'Erro','用户名不能为空');
            }else if(_value.length>10||_value.length<0){
                callback(type+'Erro','用户名不能多于10位');
            }
        }
        break;
        case 'phone_pwd':{
            if(!isNotNull(_value)){
                callback(type+'Erro','不能为空');
            }else if(_value.length<6){
                callback(type+'Erro','密码过于简单');
            }else if(_value.length>8){
                callback(type+'Erro','密码不能多于8位');
            }
        }
        break;
        case 'email_pwd':{
            if(!isNotNull(_value)){
                callback(type+'Erro','不能为空');
            }else if(_value.length<6){
                callback(type+'Erro','密码过于简单');
            }else if(_value.length>8){
                callback(type+'Erro','密码不能多于8位');
            }
        }
        break;
    }
}
/*
验证是否为空
 */
function isNotNull(_value){
    if(_value!==null&&_value!==undefined&&_value!==''){
        return true;
    }else{
        return false;
    }
}
/*
显示错误
 */
function callback(_info,msg){
    var html=document.getElementById(_info);
    html.innerHTML=msg;
    html.className='erro isvisible';
}
/*
隐藏错误
 */
function isnotvisibe(type){
    var element=document.getElementById(type);
    element.className='erro';
}
```

HTML页面是这样的：
```html
<div class="phone inputWrapper">
    <img src="./images/username.png">
    <input type="text" name="phone" placeholder="手机号" id="phone" onblur='validate("phone")' onclick='isnotvisibe("phoneErro")'>
    <label class="erro" id="phoneErro"></label>
</div>
<style type="text/css">
  .inputWrapper .erro{
    color: red;
    visibility: hidden;
}
.inputWrapper .isvisible{
    visibility: visible;
}  
</style>
```