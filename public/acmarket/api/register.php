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

$name = $data->name;
$email = $data->email;
$password = $data->password;

// Check if user already exists
$checkSql = "SELECT * FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
  http_response_code(409);
  echo json_encode(["message" => "User already exists."]);
  exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


// Insert user
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
  echo json_encode(["message" => "User registered successfully."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Registration failed."]);
}
?>
