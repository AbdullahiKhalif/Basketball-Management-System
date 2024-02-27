<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All Statistics
function getAllStats($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM stats";
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
function getstatsInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM stats WHERE statsId = '$statsId'";
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

#register stats
function registerStats($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO stats (playerId, gameId, pointsScored, rebounds, assists, steals, blocks) VALUES ('$playerId', '$gameId', '$pointsScored', '$rebounds', '$assists', '$steals', '$blocks') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

#updategame
function updateStats($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE stats SET playerId = '$playerId', gameId = '$gameId', pointsScored = '$pointsScored', rebounds = '$rebounds', assists = '$assists', steals = '$steals', blocks = '$blocks' WHERE statsId = '$statsId' ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}
# delete game
function deleteStats($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM stats WHERE statsId = '$statsId'";
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