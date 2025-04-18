<?php
require_once 'newVerifyToken.php'; // Auth middleware
require_once 'db.php'; // DB connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = $userIdFromToken; // Set in verifyToken.php

$sql = "SELECT a.id, a.title, a.price, a.description, c.name as category, s.name as subcategory
        FROM accounts a
        JOIN categories c ON a.category_id = c.id
        JOIN subcategories s ON a.subcategory_id = s.id
        WHERE a.user_id = ? ORDER BY a.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$accounts = [];

while ($row = $result->fetch_assoc()) {
    $accounts[] = $row;
}

echo json_encode(["accounts" => $accounts]);

$stmt->close();
$conn->close();
?>
