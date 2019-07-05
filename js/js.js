window.onload=function(){
    var uname=document.querySelector("#userName");
    var pwd=document.querySelector("#passWord");
    var btn=document.querySelector("#submit");
    var login=document.querySelector('.loginWrap');
    var loginSuccess=document.querySelector('#success');
    var outLogin=document.querySelector('#outLogin');

//封装设置cookie方法
    function setCookie(name,value) 
    { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() +24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    } 

//封装获取cookie方法    
    function getCookie(){
        var cookie=document.cookie;
        var cookieArr=cookie.split(';');
        var finalObj={};
        for(var i=0;i<cookieArr.length;i++){
            var tempArr=cookieArr[i].trim().split('=');
            finalObj[tempArr[0]]=tempArr[1];
        }
        return finalObj;
    }

//封装删除cookie方法
    function delCookie(name) 
    { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 10000); 
        var cval=getCookie()['username'];
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    } 

    if(getCookie()['username']!=null){
        login.style.display='none';
        loginSuccess.innerHTML=getCookie()['username']+'，开启一段旅行吧...';
        loginSuccess.className='loginSuccessShow';
        outLogin.className='outLoginShow';
    }

    btn.onclick=function(){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result=JSON.parse(xhr.responseText);
                if(result.infoCode==0){
                    login.style.display='none';
                    loginSuccess.innerHTML=uname.value+'，开启一段旅行吧...';
                    loginSuccess.className='loginSuccessShow';
                    outLogin.className='outLoginShow';
                    setCookie('username',uname.value);
                }else if(result.infoCode==1){
                    alert('用户不存在');
                }else if(result.infoCode==2||result.infoCode==3){
                    alert('数据系统错误')
                }
            }
        }
        var formData=new FormData();
        formData.append("username",uname.value);
        formData.append("password",pwd.value);
        xhr.open("POST","http://127.0.0.1/study/php/back.php",true);
        xhr.send(formData);    
    }

    outLogin.onclick=function(){
        delCookie("username");
        login.style.display='block';
        loginSuccess.className='loginSuccess';
        outLogin.className='outLogin';
        uname.value='';
        pwd.value='';
    }
}