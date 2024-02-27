<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All games
function getAllGame($conn){
    $data = array();
    $message = array();
    $query = "SELECT * FROM games";
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
function getGameInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM games WHERE gameId = '$gameId'";
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

#register game
function registerGame($conn) {
    extract($_POST);
    $data = array();

    if ($homeTeamId === $awayTeamId) {
        $data = array("status" => false, "data" => "Home Team and Away Team must be different.");
    } else {
        $query = "INSERT INTO games (homeTeamId, awayTeamId, gameDate, result, scoreHomeTeam, scoreAwayTeam) VALUES ('$homeTeamId', '$awayTeamId', '$gameDate', '$result', '$scoreHomeTeam', '$scoreAwayTeam')";

        $result = $conn->query($query);

        if ($result) {
            $data = array("status" => true, "data" => "Successfully Registered Game. ✔");
        } else {
            // Check if the error is due to foreign key constraints
            $errorCode = $conn->errno;

            if ($errorCode == 1451) {
                // Error 1451 indicates a foreign key constraint violation
                $data = array("status" => false, "data" => "Cannot register game. One or both teams do not exist.");
            } else {
                // Other database error
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    }

    echo json_encode($data);
}

#updategame
function updateGame($conn) {
    extract($_POST);
    $data = array();

    if ($homeTeamId === $awayTeamId) {
        $data = array("status" => false, "data" => "Home Team and Away Team must be different.");
    } else {
        $query = "UPDATE games SET homeTeamId = '$homeTeamId', awayTeamId = '$awayTeamId', gameDate = '$gameDate', result = '$result', scoreHomeTeam = '$scoreHomeTeam', scoreAwayTeam =  '$scoreAwayTeam' WHERE gameId = '$gameId'";

        $result = $conn->query($query);

        if ($result) {
            $data = array("status" => true, "data" => "Successfully Updated Game. ✔");
        } else {
            // Check if the error is due to foreign key constraints
            $errorCode = $conn->errno;

            if ($errorCode == 1451) {
                // Error 1451 indicates a foreign key constraint violation
                $data = array("status" => false, "data" => "Cannot register game. One or both teams do not exist.");
            } else {
                // Other database error
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    }

    echo json_encode($data);
}
# delete game
function deleteGame($conn) {
    extract($_POST);
    $data = array();
    $query = "DELETE FROM games WHERE gameId = '$gameId'";
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