<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All Statistics
function getAllTeamStandings ($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM team_standings";
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
function getTeamStandingsInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM team_standings WHERE standingId  = '$standingId '";
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

#register team_standings
function registerTeamStandings($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO team_standings (teamId, seasonYear , wins, losses, ties) VALUES ('$teamId', '$seasonYear', '$wins', '$losses', '$ties') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

#updategame
function updateTeamStandings($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE team_standings SET teamId = '$teamId', seasonYear  = '$seasonYear ', wins = '$wins', losses = '$losses', ties = '$ties' WHERE standingId = '$standingId' ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}
# delete game
function deleteTeamStandings($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM team_standings WHERE  standingId  = '$standingId'";
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