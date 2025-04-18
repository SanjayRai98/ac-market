<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
//header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


// DB connection
$host = 'localhost';
$db   = 'acmarket';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Get all categories
    $categoriesStmt = $pdo->query("SELECT id, name FROM categories");
    $categories = $categoriesStmt->fetchAll();

    $result = [];

    foreach ($categories as $category) {
        $categoryId = $category['id'];

        // Get subcategories for this category
        $subStmt = $pdo->prepare("SELECT id, name FROM subcategories WHERE category_id = ?");
        $subStmt->execute([$categoryId]);
        $subcategories = $subStmt->fetchAll();

        $subList = [];

        foreach ($subcategories as $sub) {
            $subId = $sub['id'];

            // Get accounts for this subcategory
            $accStmt = $pdo->prepare("SELECT account_id, title, description, price, stock FROM accounts WHERE subcategory_id = ?");
            $accStmt->execute([$subId]);
            $accounts = $accStmt->fetchAll();

            $subList[] = [
                'subcategory_id' => $subId,
                'subcategory_name' => $sub['name'],
                'accounts' => $accounts
            ];
        }

        $result[] = [
            'category_id' => $categoryId,
            'category_name' => $category['name'],
            'subcategories' => $subList
        ];
    }

    echo json_encode($result);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
