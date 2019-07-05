<?php
    $uname=$_POST['username'];
    $pwd=$_POST['password'];
    $success=array();
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
                if($uname==$info[$j]['username']&$pwd==$info[$j]['password']){
                    $success['infoCode']=0;
                    // setcookie('username',$uname,time()+3600*24);
                    break;
                }else{
                    $success['infoCode']=1;
                }
            }
        }else{
            $success['infoCode']=2;
        }
    }else{
        $success['infoCode']=3;
    }
    echo json_encode($success);
?>