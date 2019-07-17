<?php
    //获取前台Post请求发送的数据并存储在两个变量中
    $uname=$_POST['username'];
    $pwd=$_POST['password'];
    //设置一个成功变量空数组用于存储一会儿验证是否成功的信息码
    $success=array();
    //连接数据库并进行验证用户名密码是否存在，根据验证结果添加不同的infoCode信息码
    $con=mysqli_connect('localhost','root','','mic');
    if($con){
        mysqli_query($con,'set name utf8');
        mysqli_query($con,'set character_set_client utf8');
        mysqli_query($con,'set character_set_results utf8');
        $sql='SELECT * FROM userinfo WHERE 1';
        $result=$con->query($sql);
        if($result->num_rows>0){
            $info=[];
            for($i=0;$row=$result->fetch_assoc();$i++){
                $info[$i]=$row;
            }
            for($j=0;$j<count($info);$j++){
                if($uname==$info[$j]['username']){
                    $success['registration_infoCode']=1;        
                }else{
                    $success['registration_infoCode']=0;
                    $sql_Insert='INSERT INTO userinfo (username,password) VALUES ("'.$uname.'","'.$pwd.'")';
                    $result_Insert=$con->query($sql_Insert);
                    break;
                }
            }
        }else{
            $success['registration_infoCode']=2;
        }
    }else{
        $success['registration_infoCode']=3;
    }
    //返回添加了信息码的success变量
    echo json_encode($success);
?>