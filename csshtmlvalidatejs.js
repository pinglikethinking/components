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