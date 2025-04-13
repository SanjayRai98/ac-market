<?php
include 'db.php';

$sql = "SELECT * FROM accounts";
$result = $conn->query($sql);

$accounts = [];

while ($row = $result->fetch_assoc()) {
  $accounts[] = $row;
}

echo json_encode($accounts);
?>
