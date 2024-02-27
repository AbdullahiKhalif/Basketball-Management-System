<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All schedule
function getAllSchedules($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM schedule";
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

# get schedule Info
function getScheduleInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM schedule WHERE scheduleId = '$scheduleId'";
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

#register schedule
function registerSchedule($conn){
    extract($_POST);
    $data = array();
    

    if($homeTeamId == $awayTeamId){
        $data = array("status" => false, "data" => "Home Team and Away Team must be different.");
    }else{
        $query = "INSERT INTO schedule (homeTeamId, awayTeamId, scheduledDate, location) VALUES ('$homeTeamId','$awayTeamId','$scheduledDate','$location')";
        $result = $conn->query($query);
        if($result){
            $data = array("status" => true, "data" => "Successfully Registered ✔");
        }else{
            $data = array("status" => false, "data" => $conn->error);
        }
    }

    echo json_encode($data);
}

#register schedule
function updateSchedule($conn){
    extract($_POST);
    $data = array();
   

    if($homeTeamId === $awayTeamId){
        $data = array("status" => false, "data" => "Home Team and Away Team must be different.");
    }else{
        $query = "UPDATE schedule SET homeTeamId = '$homeTeamId', awayTeamId = '$awayTeamId', scheduledDate = '$scheduledDate', location = '$location' WHERE scheduleId = '$scheduleId'";
        $result = $conn->query($query);
        if($result){
            $data = array("status" => true, "data" => "Successfully Updated ✔");
        }else{
            $data = array("status" => false, "data" => $conn->error);
        }
    }

    echo json_encode($data);
}

//delete schedule
function deleteSchedule($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM schedule WHERE scheduleId = '$scheduleId'";
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