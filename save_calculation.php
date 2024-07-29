<?php
include 'db.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$expression = $data['expression'];
$result = $data['result'];

// Insert into database
$sql = "INSERT INTO calculations (expression, result) VALUES ('$expression', '$result')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}

$conn->close();
?>
