<?php
header("Access-Control-Allow-Origin: *");

$origin = $_GET['origin'] ?? '';
$destination = $_GET['destination'] ?? '';
$startDate = $_GET['startDate'] ?? '';
$endDate = $_GET['endDate'] ?? '';
$adults = $_GET['adults'] ?? '1';

if (!$origin || !$destination || !$startDate || !$endDate) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$access_token = "p4vZzBdE5er4C4XWHaiWMG72FDCq";

$url = "https://test.api.amadeus.com/v2/shopping/flight-offers?departureDate=$startDate&returnDate=$endDate&adults=$adults&max=5&originLocationCode=$origin&destinationLocationCode=$destination";

$headers = [
    "Authorization: Bearer $access_token",
    "Content-Type: application/json"
];

// Perform API request
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
header("Content-Type: application/json");

 echo $response;

?>