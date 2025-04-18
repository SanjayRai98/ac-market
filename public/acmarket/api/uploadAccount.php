<?php
require_once 'newVerifyToken.php'; // Ensures user is authenticated
require_once 'db.php'; // Your DB connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['title'], $data['price'], $data['description'], $data['category_id'], $data['subcategory_id']) ||
    empty($data['title']) || empty($data['price']) || empty($data['description'])
) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required."]);
    exit;
}

$user_id = $userIdFromToken; // Comes from verifyToken.php
$title = $data['title'];
$price = $data['price'];
$description = $data['description'];
$category_id = $data['category_id'];
$subcategory_id = $data['subcategory_id'];

$sql = "INSERT INTO accounts (id, user_id, category_id, subcategory_id, title, price, description) 
        VALUES (UUID(), ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssd", $user_id, $category_id, $subcategory_id, $title, $price, $description);

if ($stmt->execute()) {
    echo json_encode(["message" => "Account uploaded successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to upload account."]);
}

$stmt->close();
$conn->close();
?>
