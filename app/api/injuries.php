<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All Statistics
function getAllInjuries($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM injuries";
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

# get agme Info
function getInjuriesInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM injuries WHERE injuryId  = '$injuryId'";
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

#register injuries
function registerInjuries($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO injuries (playerId, injuryType , injuryDate, recoveryTime) VALUES ('$playerId', '$injuryType', '$injuryDate', '$recoveryTime') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

#updategame
function updateInjuries($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE injuries SET playerId = '$playerId', injuryType  = '$injuryType', injuryDate = '$injuryDate', recoveryTime = '$recoveryTime' WHERE injuryId = '$injuryId' ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}
# delete game
function deleteInjuries($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM injuries WHERE  injuryId  = '$injuryId'";
    $result = $conn->query($query);
    try{
        if($result){
            $data = array("status" => true, "data" => "Successfully Deleted ✔");
        }else{
            // Check if the error is due to foreign key constraints
            $errorCode = $conn->errno;
                
            if ($errorCode == 1451) {
                // Error 1451 indicates a foreign key constraint violation
                $data = array("status" => false, "data" => "Cannot delete user. It is referenced in another table.");
            } else {
                // Other database error
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    }catch (Exception $e) {
        $data = array("status" => false, "data" => "Error: " . $e->getMessage());
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