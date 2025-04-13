<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
  http_response_code(400);
  echo json_encode(["message" => "Email and password are required."]);
  exit;
}

$email = $data->email;
$password = $data->password;

// Check user in DB
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
  http_response_code(404);
  echo json_encode(["message" => "User not found."]);
  exit;
}

$user = $result->fetch_assoc();



// Respond with token
echo json_encode(["token" => $email, "user"=> $user]);
?>
