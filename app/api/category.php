<?php
include '../config/conn.php';
header('Content-Type: application/json');
// get All 
function getAllCategory($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM category";
    $result = $conn->query($query);

    if($result){
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($message);
}

// get category Info
function getCategoryInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM category WHERE id = '$id'";
    $result = $conn->query($query);

    if($result){
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($message);
}
// regsister category
function registerCategory($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO category (categoryName, categoryIcon, categoryRole) VALUES ('$categoryName', '$categoryIcon', '$categoryRole') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

// regsister category
function updateCategory($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE category SET categoryName = '$categoryName', categoryIcon =  '$categoryIcon', categoryRole = '$categoryRole' WHERE id = '$id'";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

//delete user
function deleteCategory($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM category WHERE id = '$id'";
    $result = $conn->query($query);
        if($result){
            $data = array("status" => true, "data" => "Successfully Deleted ✔");
        }else{
                // Other database error
                $data = array("status" => false, "data" => $conn->error);
        }

    echo json_encode($data);
}

if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data" => "Action Is Required!"));
}
?>