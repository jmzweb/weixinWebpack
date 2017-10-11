<?php

	function getToken(){
		$timestamp = $_GET["timestamp"];
		$nonce = $_GET["nonce"];
		$token = "hellojssdk";
		$sigature = $_GET["signature"];
		$array = array($timestamp,$nonce,$token);
		sort($array);
		$tempstr = implode("", $array);
		$tempstr = sha1($tempstr);
		if($tempstr == $signature){
			echo $_GET["echostr"];
			exit;
		}
	}

	// curl
	// function http_curl(){
	// 	$ch = curl_init();
	// 	$url = "http://iwen.com";
	// 	curl_setopt($ch, CURLOPT_URL, $url);
	// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	// 	$output = curl_exec($ch);
	// 	curl_close($ch);
	// 	var_dump($output);
	// }
	// 
	function httpGet($url){
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		$res = curl_exec($curl);
		curl_close($curl);
		var_dump($res);
	}
	// 获取token
	function GetAccessToken(){
		$appid = "";
		$appsecret = "";
		$data = json_decode(get_php_file("access_token.php"));
		if($data -> expire_time<time()){
			$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf008db15f0cf1b7f&secret=f435e8527b4efb8e3feae0c8986f601d";
			$res = json_decode(httpGet($url));
			$access_token = $res -> access_token;
			if($access_token){
				$data->expire_time = time()+7000;
				$data->access_token = $access_token;
				set_php_file("access_token.php",json_decode($data));;
			}
		}else{
			$access_token = $data->access_token;
		}
		return $access_token;
	}

	function get_php_file($filename){
		return trim(substr(file_get_contents($filename), 15));
	}

	function set_php_file($filename，$content){
		$fp = fopen($filename, "w");
		fwrite($fp,"<?php exit()>".$content);
		fclose($fp);
	}
	var_dump(GetAccessToken());

	// 票据的获取
	function getJsApiTicket(){
		$data = json_decode(get_php_file(jsapi_ticket.php));
		if($data->expire_time<time()){
			$accessToken = GetAccessToken();
			$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=".$access_token;
			$res = json_decode(httpGet($url));
			$ticket = $res->ticket;
			if($ticket){
				$data->expire_time = time()+7000;
				$data->jsapi_ticket = $ticket;
				set_php_file("jsapi_ticket.php",json_encode($data));
			}
		}else{
			$ticket = $data->jsapi_ticket;
		}
		return $ticket;
	}
	//随机字符串处理
	function getRandCode($num = 16){
		$array = array(
				"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
				"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
				"0","1","2","3","4","5","6","7","8","9"
			);
		$tmpstr = "";
		$max = count($array);
		for($i=0;$i<=$num;$i-1){
			$key = rand(0,$max-1);
			$tmpstr .=$array($key);
		}
		return $tmpstr;
	}

	var_dump(getJsApiTicket());

	// 分享功能接口
	function shareWX(){
		// 
		$jsapi_ticket = getJsApiTicket();
	}




