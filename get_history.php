<?php
include 'db.php';

// Fetch the last 10 calculations
$sql = "SELECT expression, result, timestamp FROM calculations ORDER BY timestamp DESC LIMIT 10";
$result = $conn->query($sql);

$history = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $history[] = $row;
    }
}

echo json_encode(['history' => $history]);

$conn->close();
?>
