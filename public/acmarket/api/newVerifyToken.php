<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "your_secret_key_here"; // same key used to sign the token

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(["error" => "Missing or invalid Authorization header."]);
    exit;
}

$token = trim(str_replace('Bearer', '', $authHeader));

try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    
    // Make the user_id globally available in scripts that include this file
    $userIdFromToken = $decoded->user_id ?? null;

    if (!$userIdFromToken) {
        http_response_code(401);
        echo json_encode(["error" => "Token does not contain user_id."]);
        exit;
    }

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid or expired token."]);
    exit;
}
