<?php
header("Content-Type: application/json");

include("../db.php");

// 🔐 Only GET allowed
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

// 📥 Params
$student_id = $_GET['student_id'] ?? null;
$class_id = $_GET['class_id'] ?? null;
$date = $_GET['date'] ?? null;

// ❌ Validation
if (!$student_id) {
    echo json_encode([
        "status" => false,
        "message" => "student_id is required"
    ]);
    exit;
}

// 🧠 Base Query
$query = "SELECT * FROM student_attendance WHERE std_id = ?";
$params = [$student_id];
$types = "i";

// 🎯 Optional Filters
if ($class_id) {
    $query .= " AND class_id = ?";
    $params[] = $class_id;
    $types .= "i";
}

if ($date) {
    $query .= " AND DATE(login_date) = ?";
    $params[] = $date;
    $types .= "s";
}

// 📅 Order latest first
$query .= " ORDER BY login_date DESC";

// 🔐 Prepare
$stmt = $conn->prepare($query);
$stmt->bind_param($types, ...$params);

$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = [
        "id" => $row['id'],
        "student_id" => $row['std_id'],
        "class_id" => $row['class_id'],
        "login_date" => $row['login_date'],
        "login_time" => $row['login_time'],
        "formatted_date" => $row['login_date1'],
        "details" => $row['login_details']
    ];
}

// 📤 Response
echo json_encode([
    "status" => true,
    "count" => count($data),
    "attendance" => $data
]);
