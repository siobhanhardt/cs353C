<?php
    session_start();
    if(isset($_POST["username"]) && isset($_POST['passwd'])){
        $username = $_POST["username"];
        $passwd = $_POST["passwd"];
        if(strlen(trim($username))>0 && strlen(trim($passwd)) && !isset($_SESSION['username'])){
            $_SESSION['username'] = $username;
            echo "<h1>dear".$username"";
        }
    }
?>
