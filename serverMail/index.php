<?php

include 'vars.php';

// if(isset($_POST['folder'])){ $folder = $_POST['folder']; }

// CORS off ----------------------------------------------------------------------------------------
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
			header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
			header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}
// CORS off ----------------------------------------------------------------------------------------

if( !$_POST['bzMailer'] ){

	$_POST = json_decode( file_get_contents('php://input'), true );

	if( $_POST['pass'] === $pass ){

		$from = $_POST['from'];
		$to = $_POST['to'];
		$theme = $_POST['theme'];
		$msg = $_POST['msg'];
	
		$headers = 'MIME-Version: 1.0' . "\r\n";
		// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers .= 'From: bzDrive<'.$from.'>' . "\r\n";
	
		mail( $to, $theme, $msg, $headers );
	
		return;
	}

}
else{
	$to = $_POST['to'];
	$theme = $_POST['theme'];
	$msg = $_POST['msg'];

	$headers = 'MIME-Version: 1.0' . "\r\n";
	// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$headers .= 'From: bzDrive<admin@bzdrive.com>' . "\r\n";

	mail( $to, $theme, $msg, $headers );

	$to = "";
	$theme = "";
	$msg = "";
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="domain" content="bzDrive.com">
    <meta name="description" content="Web site created using create-react-app" />
    <meta name="author" content="Bohdan Zhydyk">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
	
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="shortcut icon" href="https://files.bzdrive.com/img/Drive/logo/logoDrive.gif" type="image/gif">
    <!-- <link rel="stylesheet" href="style.css"> -->

    <title>bzMail</title>
</head>
<body>

<style>

	body{
		background-color:#222 !important;
		color:#eee !important;
		font-size:1vw !important;
		margin:0 !important;
		padding:0 !important;
		background-image:url("img/logo/dark_wood.png");
		font-family:"Roboto", sans-serif;
	}
	p {text-indent:2vw;}
	a {text-decoration:none; color:#fff;}

	.flex	{display:flex; justify-content:center; align-items:center;}
	.column {flex-direction:column;}
	.end {justify-content:flex-end;}

	main {padding:1vw 0;}
	.logo {width:3vw; margin:0 0.5vw;}
	.name {font-size:250%; font-weight:bold;}
	.txtOrg {color:#f60;}
	.txtWht {color:#fff;}

	form {width:70%;}
	.inputWrapper {
		width:100%; padding:0.25vw; border:1px solid #999; border-radius:0.5vw;
		background-color:#0005;
	}
	.inputWrapper:hover {border-color:#191;}
	.inputName {margin:0 1vw; padding:0 1vw; color:#999;}
	input {
		font-size:1vw; width:94%; min-height:2vw; padding:0.25vw 3%; letter-spacing:0.2vw;
		color:#fff; background-color:#0000; border:none; border-radius:0.25vw;
	}
	textarea {
		font-size:1vw; width:94%; min-height:10vw; padding:0.25vw 3%; letter-spacing:0.2vw;
		color:#fff; background-color:#0000; border:none; border-radius:0.25vw;
	}

	.btn {
		width:100%;
		min-height:3vw;
		margin:2vw 0;
		padding:calc(0.25vw + 1px);
		font-size:130%;
		color:#fff;
		background-color:#171;
		border-radius:0.5vw;
	}
	.btn:hover{font-size:150%; background-color:#191;}

	footer {width:80%;}
	.separate1 {margin:0 1vw;}
	.separate2 {margin:0 0.25vw;}

</style>



<main class="flex">

	<img class="logo" src="https://files.bzdrive.com/img/Drive/logo/logoDrive.gif" alt="logo">

	<div class="name">
		<span class="txtOrg">bz</span><span class="txtWht">Drive</span><span class="txtOrg">.com</span>
		<span class="txtWht"> / mailer</span>
	</div>

</main>

<header class="flex">
	
	<form class="flex column" action="" method="post">

		<fieldset class="inputWrapper">
      <legend class="inputName">to</legend>
      <input type="text" name="to" placeholder="your e-mail address..." value="<?php echo($to) ?>" />
    </fieldset>

		<fieldset class="inputWrapper">
      <legend class="inputName">theme</legend>
      <input type="text" name="theme" placeholder="theme..." value="<?php echo($theme) ?>" />
    </fieldset>

		<fieldset class="inputWrapper">
      <legend class="inputName">message</legend>
      <textarea type="text" name="msg" placeholder="your message..." value="<?php echo($msg) ?>" /></textarea>
    </fieldset>

		<input type="hidden" name="bzMailer" value="mailer">

		<input class="btn flex" type="submit" value="send message">

	</form>

</header>

<footer class="flex end">

	<span>Web site created by:</span>

	<span class="separate2">&copy;</span><span class="txtOrg">B</span><span class="txtWht">ohdan</span>
	<span class="separate2"></span><span class="txtOrg">Z</span><span class="txtWht">hydyk</span>

	<a class="separate1" href="https://bzdrive.com/" target="_blank">
		<span class="txtOrg">bz</span><span class="txtWht">Drive</span><span class="txtOrg">.com</span>
	</a>

</footer>

</body>
</html>