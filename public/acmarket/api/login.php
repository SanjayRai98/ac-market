<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

// Verify password
if (!password_verify($password, $user['password'])) {
  http_response_code(401);
  echo json_encode(["message" => "Invalid password."]);
  exit;
}

// JWT Payload
/*$payload = [
  "iss" => "http://localhost",             // Issuer
  "iat" => time(),                         // Issued at
  "exp" => time() + (60 * 60 * 24),        // Expires in 1 day
  "user_id" => $user['id'],
  "email" => $user['email'],
  "role" => $user['role']
];*/

// JWT Payload
$payload = [
  "iss" => "http://localhost",             // Issuer
  "iat" => time(),                         // Issued at
  "exp" => time() + (60),        // Expires in 1 minute
  "name" => $user['username'],
  "user_id" => $user['id'],
  "email" => $user['email'],
  "role" => $user['role']
];

// Secret key — use .env in production!
$secretKey = "your_secret_key_here";

// Generate token
$jwt = JWT::encode($payload, $secretKey, 'HS256');

// Respond with token
echo json_encode(["token" => $jwt]);
?>
