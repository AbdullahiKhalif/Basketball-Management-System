<?php
include '../config/conn.php';
header('Content-Type: application/json');
function getPlayerStatement($conn){
    extract($_POST);

    $query = "CALL playerStatsSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getTeamStatement($conn){
    extract($_POST);

    $query = "CALL teamStatsSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getScheduleStatement($conn){
    extract($_POST);

    $query = "CALL scheduleReportSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getPlayerContractStatement($conn){
    extract($_POST);

    $query = "CALL playerContractsSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getInjuriesStatement($conn){
    extract($_POST);

    $query = "CALL injuriesPlayersSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getTeamStandingSp($conn){
    extract($_POST);

    $query = "CALL getTeamStandingSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getCoachingStaffSp($conn){
    extract($_POST);

    $query = "CALL getCoachingStaffSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
function getResultStatement($conn){
    extract($_POST);

    $query = "CALL gemeResultSp()";
    $result = $conn->query($query);
    $data = array();
    $message = array();
        while($row = $result->fetch_assoc()){
            $data [] = $row;
        }
    if($result){
        $message = array("status" => true, "data" => $data);
    }else{
        $message = array("status" => false, "data" => $conn->erro);
    }
    echo json_encode($message);
};
if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data" => "Action Is Required!"));
}
?>