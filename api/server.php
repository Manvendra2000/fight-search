<?php
header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$q = $_GET['q'] ?? '';
if (!$q) {
    respond(['error' => "Missing 'q' parameter"], 400);
}

$url = "https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=" . urlencode($q) . "&nearByAirport=true";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    respond(['error' => "cURL error"], 500);
}

$json = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    respond(['error' => "Invalid JSON response"], 502);
}

respond([
    "success" => true,
    "data" => $json
]);

?>