{
    let view = {

        el : '#wrap',
        template :`
                <div class="loginWrap">
                    <div class="login">
                        <h2>欢迎登录</h2>
                            <div class="group">
                                <input type="text" id="userName" placeholder="用户名">
                            </div>
                            <div class="group">
                                <input type="password" id="passWord" placeholder="密码">
                            </div>
                            <div class="group">
                                <input type="button" id="submit" value="登录">
                            </div>
                            <div class="group">
                                <span><a href="#">忘记密码？</a></span><span><a href="#">注册一个新账号</a></span>
                            </div>
                        </div>
                    </div>
                <div id="success" class="loginSuccess">
                    XXX，开启一段旅行吧...
                </div>
                <input type="button" id="outLogin" class="outLogin" value="注销登录">
            `,
        render(data){
            document.querySelector(this.el).innerHTML= this.template;
            if(controller.getCookie()['username']!=null){
                let loginSuccess=document.querySelector(this.el).querySelector('#success');
                let outLogin=document.querySelector(this.el).querySelector('#outLogin');
                let login=document.querySelector(this.el).querySelector(".loginWrap");
                login.style.display='none';
                loginSuccess.innerHTML=controller.getCookie()['username']+'，开启一段旅行吧...';
                loginSuccess.className='loginSuccessShow';
                outLogin.className='outLoginShow';
            }
        },
    };
    
    let model = {

        data:{
            username:'',
            password:'',
        },

        sendData(data={}){
            console.log(data);
            return new Promise((resolve, reject) => {
                let xhr=new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4&&xhr.status==200){
                        let result=JSON.parse(xhr.responseText);
                        if(result.infoCode==0){
                            controller.setCookie('username', data.username);
                            resolve("infoCode=0");
                        }else if(result.infoCode==1){
                            alert('用户不存在');
                        }else if(result.infoCode==2||result.infoCode==3){
                            alert('数据系统错误');
                        }
                    }
                }
                //post请求发送数据formData给后台，添加用户名及密码进formData
                var formData=new FormData();
                formData.append("username",data.username);
                formData.append("password",data.password);
                xhr.open("POST","http://127.0.0.1/study/php/back.php",true);
                xhr.send(formData); 
            })
        }

    };

    let controller = {


        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render(this.model.data);
            this.login(view,model);
        },

        login(view,model){
            this.view=view;
            this.model=model;
            let login=document.querySelector(this.view.el).querySelector(".loginWrap");
            let uname=document.querySelector(this.view.el).querySelector("#userName");
            let pwd=document.querySelector(this.view.el).querySelector("#passWord");
            let loginSuccess=document.querySelector(this.view.el).querySelector('#success');
            let outLogin=document.querySelector(this.view.el).querySelector('#outLogin');

            document.querySelector(this.view.el).querySelector("#submit").onclick=function(){
                    let userdata={'username':uname.value,'password':pwd.value};
                    model.sendData(userdata).then((res)=>{
                    login.style.display = 'none';
                    loginSuccess.innerHTML = uname.value + '，开启一段旅行吧...';
                    loginSuccess.className = 'loginSuccessShow';
                    outLogin.className = 'outLoginShow';
                   })

            }

            outLogin.onclick=function(){
                controller.delCookie("username");
                login.style.display='block';
                loginSuccess.className='loginSuccess';
                outLogin.className='outLogin';
                uname.value='';
                pwd.value='';
            }
        },

        setCookie(name,value){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() +24*60*60*1000); 
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
        },

        getCookie(){
            var cookie=document.cookie;
            var cookieArr=cookie.split(';');
            var finalObj={};
            for(var i=0;i<cookieArr.length;i++){
                var tempArr=cookieArr[i].trim().split('=');
                finalObj[tempArr[0]]=tempArr[1];
            }
            return finalObj;
        },

        delCookie(name){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() - 10000); 
            var cval=controller.getCookie()['username'];
            if(cval!=null) 
                document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
        },
    }

    controller.init(view,model);

}