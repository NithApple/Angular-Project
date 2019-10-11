<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
include("config.php");


// if images not error
if($_FILES['file']['error'] == 0){


  $upload_dir = 'uploads';
  $image_type = ['image/jpeg','image/png', 'image/jpg','image/png'];

  // check file type extension
  if(in_array($_FILES['file']['type'], $image_type)){

    if(move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir. '/'. $_FILES['file']['name'])){

      $resp = array(
        "code" => "200",
        "message" => "upload successfully!"
      );
      echo json_encode($resp);
    }else{
      $resp = array(
        "code" => "503",
        "message" => "upload failed!"
      );
      echo json_encode($resp);
    }

  }else{
    $resp = array(
      "code" => 500, // server error
      "message" => "file not allowed"
    );
    echo json_encode($resp);
  }


}

// if(isset($_POST['but_upload'])){
 
//   $name = $_FILES['file']['name'];
//   $target_dir = "uploads/";
//   $target_file = $target_dir . basename($_FILES["file"]["name"]);

//   // Select file type
//   $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

//   // Valid file extensions
//   $extensions_arr = array("jpg","jpeg","png","gif");

//   // Check extension
//   if( in_array($imageFileType,$extensions_arr) ){
 
//      // Insert record
//      $query = "insert into images(name) values('".$name."')";
//      mysqli_query($con,$query);
  
//      // Upload file
//      move_uploaded_file($_FILES['file']['tmp_name'],$target_dir.$name);

//   }
 
// }
 ?>