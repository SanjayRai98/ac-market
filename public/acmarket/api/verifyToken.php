<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "your_secret_key_here"; // Same key used in login.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get token from Authorization header
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
  http_response_code(401);
  echo json_encode(["message" => "Authorization header missing or malformed."]);
  exit;
}

$token = trim(str_replace('Bearer', '', $authHeader));

try {
  $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

  // ✅ Token valid — you can use $decoded->user_id, $decoded->email, etc.
  // Optionally return the decoded payload:
  // echo json_encode(["valid" => true, "user" => $decoded]);

  // To include in another PHP file:
  return $decoded;

} catch (Exception $e) {
  http_response_code(401);
  echo json_encode(["message" => "Token invalid or expired.", "error" => $e->getMessage()]);
  exit;
}
