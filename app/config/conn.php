<?php
$conn = new mysqli("localhost","root","", "basketball");
if($conn->connect_error){
    echo $conn->error;
}
?>