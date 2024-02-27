<?php
include '../config/conn.php';
header('Content-Type: application/json');
// get All 
function getAllCoachingStaff($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM coaching_staff";
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
function getCoachingStaffInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM coaching_staff WHERE staffId = '$staffId'";
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
// regsister CoachingStaff
function registerCoachingStaff($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO coaching_staff (teamId, coachId, staffRole) VALUES ('$teamId', '$coachId', '$staffRole') ";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Registered ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

// regsister CoachingStaff
function updateCoachingStaff($conn){
    extract($_POST);
    $data = array();
    $query = "UPDATE coaching_staff SET teamId = '$teamId', coachId =  '$coachId', staffRole = '$staffRole' WHERE staffId = '$staffId'";
    $result = $conn->query($query);
    
    if($result){
        $data = array("status" => true, "data" => "Successfully Updated ✔");
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }
    echo json_encode($data);
}

//delete user
function deleteCoachingStaff($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM coaching_staff WHERE staffId = '$staffId'";
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