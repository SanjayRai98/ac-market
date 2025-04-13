<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verifyToken() {
  $secretKey = "your_secret_key_here";

  $headers = getallheaders();
  $authHeader = $headers['Authorization'] ?? '';

  if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    return false;
  }

  $token = trim(str_replace('Bearer', '', $authHeader));

  try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    return $decoded; // 🟢 valid token, return user info
  } catch (Exception $e) {
    return false; // 🔴 invalid/expired token
  }
}
