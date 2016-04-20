<?php 
header("Access-Control-Allow-Origin: *");
$uploadDir = "uploads/";
$allowedImgTypes = array('jpeg', 'png', 'gif', 'jpg');
$allowedImgSize = 2048;
$get = $_GET;
$post = $_POST;
$files = $_FILES;
$response = array();
$currentUrl = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);

if(isset($post['action']) && $post['action'] == 'saveImage') {
	foreach($files['images']['name'] as $key => $name) {
		$type = pathinfo($name,PATHINFO_EXTENSION);		
		$size = $files['images']['size'][$key];
		$tmpName = $files['images']['tmp_name'][$key];
		$target = $uploadDir.$key.".".$type;
		
		if(in_array($type, $allowedImgTypes)) {
			if($size <= 2048) {
				if (move_uploaded_file($tmpName, $target)) {
					$response = array('status' => 'success', 'imageUrl' => $currentUrl.'/'.$target);
				} else {
					$response = array('status' => 'error', 'message' => 'Error in uploading file');
				}
			} else {
				$response = array('status' => 'error', 'message' => 'The file size is too large to upload');
			}
		} else {
			$response = array('status' => 'error', 'message' => 'Invalid file type');
		}
	}
	echo json_encode($response);
}
?>