<?php
include '../config/conn.php';
header('Content-Type: application/json');
# get All Players
function getAllPlayers($conn){
    $data = array();
    $message = array();
    $query = "SELECT playerId, teamId, playerName, address, phone, birthDate, image,position, jerseyNumber  FROM players";
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

# get Player Info
function getPlayerInfo($conn){
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM players WHERE playerId = '$playerId'";
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

#regsiter Player

function registerPlayer($conn) {
    extract($_POST);
    $errorMessage = array();
    $data = array();

    #files
    $fileName = $_FILES['image']['name'];
    $fileType = $_FILES['image']['type'];
    $fileSize = $_FILES['image']['size'];
    $fileTempName = $_FILES['image']['tmp_name'];

    $newId = generatePlayerId($conn);
    $savedName = $newId . ".png";

    $allowedImages = ["image/png", "image/jpg", "image/jpeg"];

    if (in_array($fileType, $allowedImages)) {
        $maxSize = 5 * 1024 * 1024;
        if ($fileSize > $maxSize) {
            $errorMessage[] = "File size " . $fileSize / 1024 / 1024 . " MB exceeds allowed size " . $maxSize / 1024 / 1024 . " MB";
        }
    } else {
        $errorMessage[] = "This File Type is not allowed " . $fileType;
    }

    // Validate birthDate
    $today = new DateTime();
    $birthDateObj = DateTime::createFromFormat('Y-m-d', $birthDate);

    if (!$birthDateObj) {
        $errorMessage[] = "Invalid birthDate format. Use YYYY-MM-DD";
    } else {
        $age = $birthDateObj->diff($today)->y;
        if ($age < 15 || $age > 25) {
            $errorMessage[] = "Age must be between 15 and 25 years";
        }
    }

    if (count($errorMessage) <= 0) {
        $checkPhone = "SELECT * FROM players WHERE phone = '$phone'";
        $checkJerseyNumber = "SELECT * FROM players WHERE jerseyNumber = '$jerseyNumber'";
        $checkResultPhone = $conn->query($checkPhone);
        $checkResultJerseyNumber = $conn->query($checkJerseyNumber);

        if ($checkResultPhone->num_rows > 0) {
            $data = array("status" => false, "data" => "Phone Is Already Exists");
        } else if ($checkResultJerseyNumber->num_rows > 0) {
            $data = array("status" => false, "data" => "This Number is already taken by another player");
        }
        else {
            $query = "INSERT INTO players (playerId, playerName, teamId, address,  phone, image, birthDate, position, jerseyNumber) VALUES('$newId', '$playerName', '$teamId','$address', '$phone', '$savedName', '$birthDate', '$position', '$jerseyNumber')";

            $result = $conn->query($query);

            if ($result) {
                move_uploaded_file($fileTempName, "../uploads/players/" . $savedName);
                $data = array("status" => true, "data" => "Successfully Registered Player ✔");
            } else {
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    } else {
        $data = array("status" => false, "data" => $errorMessage);
    }
    echo json_encode($data);
}

#update Player
function updatePlayer($conn) {
    extract($_POST);
    $errorMessage = array();
    $data = array();

    #files
    $fileName = $_FILES['image']['name'];
    $fileType = $_FILES['image']['type'];
    $fileSize = $_FILES['image']['size'];
    $fileTempName = $_FILES['image']['tmp_name'];

    $newId = generatePlayerId($conn);
    $savedName = $playerId . ".png";

    $allowedImages = ["image/png", "image/jpg", "image/jpeg"];

    if(!empty($fileTempName)){
        if (in_array($fileType, $allowedImages)) {
            $maxSize = 5 * 1024 * 1024;
            if ($fileSize > $maxSize) {
                $errorMessage[] = "File size " . $fileSize / 1024 / 1024 . " MB exceeds allowed size " . $maxSize / 1024 / 1024 . " MB";
            }
        } else {
            $errorMessage[] = "This File Type is not allowed " . $fileType;
        }

            // Validate birthDate
        $today = new DateTime();
        $birthDateObj = DateTime::createFromFormat('Y-m-d', $birthDate);

        if (!$birthDateObj) {
            $errorMessage[] = "Invalid birthDate format. Use YYYY-MM-DD";
        } else {
            $age = $birthDateObj->diff($today)->y;
            if ($age < 15 || $age > 25) {
                $errorMessage[] = "Age must be between 15 and 25 years";
            }
    }

    if (count($errorMessage) <= 0) {
        // Continue with the update logic
        $checkPhone = "SELECT * FROM players WHERE phone = '$phone' AND playerId != '$playerId'";
        $checkJerseyNumber = "SELECT * FROM players WHERE jerseyNumber = '$jerseyNumber' AND playerId != '$playerId'";
        $checkResultPhone = $conn->query($checkPhone);
        $checkResultJerseyNumber = $conn->query($checkJerseyNumber);

        if ($checkResultPhone->num_rows > 0) {
            $data = array("status" => false, "data" => "Phone Is Already Exists");
        }else if ($checkResultJerseyNumber->num_rows > 0) {
            $data = array("status" => false, "data" => "This Number is already taken by another player");
        } else {
            // Proceed with the update logic
            $query = "UPDATE players SET playerName = '$playerName', teamId = '$teamId', address = '$address', phone = '$phone', image = '$savedName', birthDate = '$birthDate', position = '$position', jerseyNumber = '$jerseyNumber' WHERE playerId = '$playerId'";

            $result = $conn->query($query);

            if ($result) {
                move_uploaded_file($fileTempName, "../uploads/players/".$savedName);
                $data = array("status" => true, "data" => "Player updated successfully ✔✔");
            } else {
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    } else {
        $data = array("status" => false, "data" => $errorMessage);
        }
    }else{
                // Continue with the update logic
        $checkPhone = "SELECT * FROM players WHERE phone = '$phone' AND playerId != '$playerId'";
        $checkJerseyNumber = "SELECT * FROM players WHERE jerseyNumber = '$jerseyNumber' AND playerId != '$playerId'";
        $checkResultPhone = $conn->query($checkPhone);
        $checkResultJerseyNumber = $conn->query($checkJerseyNumber);

        if ($checkResultPhone->num_rows > 0) {
            $data = array("status" => false, "data" => "Phone Is Already Exists");
        }else if ($checkResultJerseyNumber->num_rows > 0) {
            $data = array("status" => false, "data" => "This Number is already taken by another player");
        } else {
            // Proceed with the update logic
            $query = "UPDATE players SET playerName = '$playerName', teamId = '$teamId', address = '$address', phone = '$phone', birthDate = '$birthDate', position = '$position', jerseyNumber = '$jerseyNumber' WHERE playerId = '$playerId'";

            $result = $conn->query($query);

            if ($result) {
                move_uploaded_file($fileTempName, "../uploads/players/".$savedName);
                $data = array("status" => true, "data" => "Player updated successfully ✔");
            } else {
                $data = array("status" => false, "data" => $conn->error);
            }
        }
    }

    
    echo json_encode($data);
}

# delete player
function deletePLayer($conn){
    extract($_POST);
    $query = "DELETE FROM players WHERE playerId = '$playerId'";
    $result = $conn->query($query);
    $data = array();

    if($result) {
        unlink('../uploads/players/'. $playerId.".png");
        $data = array("status" => true, "data" => "Successfully Deleted ✔😃");
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
    echo json_encode($data);
}


#function generate Player Id
function generatePlayerId($conn){
    $newId = '';
    $query = "SELECT * FROM players ORDER BY playerId DESC LIMIT 1";
    $result = $conn->query($query);

    if($result){
        $num_rows = $result->num_rows;
        if($num_rows > 0){
            $row = $result->fetch_assoc();
            $newId = ++$row['playerId'];
        }else{
            $newId = 'PRL001';
        }

        return $newId;
    }
}

if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data" => "Action Is Required!"));
}

?>