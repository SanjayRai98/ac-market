<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "acmarket");
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}

$sql = "
SELECT 
    c.id as category_id, c.name as category_name,
    s.id as subcategory_id, s.name as subcategory_name,
    a.id as account_id, a.title, a.price, a.stock
FROM categories c
LEFT JOIN subcategories s ON s.category_id = c.id
LEFT JOIN accounts a ON a.subcategory_id = s.id
ORDER BY c.name, s.name, a.title
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $catId = $row['category_id'];
    $subId = $row['subcategory_id'];
    $accId = $row['account_id'];

    if (!isset($data[$catId])) {
        $data[$catId] = [
            "id" => $catId,
            "name" => $row["category_name"],
            "subcategories" => []
        ];
    }

    if ($subId && !isset($data[$catId]["subcategories"][$subId])) {
        $data[$catId]["subcategories"][$subId] = [
            "id" => $subId,
            "name" => $row["subcategory_name"],
            "accounts" => []
        ];
    }

    if ($accId) {
        $data[$catId]["subcategories"][$subId]["accounts"][] = [
            "id" => $accId,
            "title" => $row["title"],
            "price" => $row["price"],
            "stock" => $row["stock"]
        ];
    }
}

echo json_encode(array_values($data));
$conn->close();
