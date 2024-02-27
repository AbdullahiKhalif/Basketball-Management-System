<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All Statistics
function getAllPlayerContracts($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM player_contracts ";
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
function getPlayerContractInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM player_contracts  WHERE contractId  = '$contractId '";
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

#register player_contracts 
function registerPlayerContract($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO player_contracts  (playerId, startDate , endDate, salary) VALUES ('$playerId', '$startDate', '$endDate', '$salary') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

#updategame
function updatePlayerContract($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE player_contracts  SET playerId = '$playerId', startDate  = '$startDate ', endDate = '$endDate', salary = '$salary' WHERE contractId = '$contractId' ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}
# delete game
function deletePlayerContract($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM player_contracts  WHERE  contractId  = '$contractId'";
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