<?php
include '../config/conn.php';
header('Content-Type: application/json');
// get All 
function getAllAction($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM actions";
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

// get action Info
function getActionInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM actions WHERE id = '$id'";
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
// regsister action
function registerAction($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO actions (actionName, action, linkId) VALUES ('$actionName', '$acutal_action', '$linkId') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

// regsister action
function updateAction($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE actions SET actionName = '$actionName', action =  '$acutal_action', linkId = '$linkId' WHERE id = '$id'";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

//delete user
function deleteAction($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM actions WHERE id = '$id'";
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