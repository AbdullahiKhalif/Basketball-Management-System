<?php
include '../config/conn.php';
header('Content-Type: application/json');
// get All 
function getAllTeams($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM teams";
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

// get Team Info
function getTeamInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM teams WHERE teamId = '$teamId'";
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
// regsister Team
function registerTeam($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO teams (teamName, coachId, foundedYear, city) VALUES ('$teamName', '$coachId', '$foundedYear', '$city') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

// regsister Team
function updateTeam($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE teams SET teamName = '$teamName', coachId =  '$coachId', foundedYear = '$foundedYear', city = '$city' WHERE teamId = '$teamId'";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

//delete user
function deleteTeam($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM teams WHERE teamId = '$teamId'";
    $result = $conn->query($query);
    if($result){
        $data = array("status" => true, "data" => "Successfully Deleted ✔");
    }else{
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