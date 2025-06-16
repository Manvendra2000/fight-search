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

// File to cache access_token
$cache_file = __DIR__ . '/access_token.json';
$client_id = 'Sft7hM0w3WQWPCTLIJDaX6jVQkc5PGNh';
$client_secret = 'h5TY1H6EsASRvMDo';
$grant_type = 'client_credentials';

function getAccessToken($client_id, $client_secret, $grant_type) {
    $ch = curl_init("https://test.api.amadeus.com/v1/security/oauth2/token");

    $postfields = http_build_query([
        'grant_type'    => $grant_type,
        'client_id'     => $client_id,
        'client_secret' => $client_secret
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
    $resp = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(['error' => curl_error($ch)]);
        exit;
    }
    curl_close($ch);
    return json_decode($resp, true);
}

function isValid($item) {
    return $item &&
           isset($item['access_token']) &&
           (time() < $item['expires_at']);
}

$access_token = '';
if (file_exists($cache_file)) {
    $item = json_decode(file_get_contents($cache_file), true);
    if (isValid($item)) {
        $access_token = $item['access_token'];
    }
}

if (!$access_token) {
    $item = getAccessToken($client_id, $client_secret, $grant_type);
    $item['expires_at'] = time() + $item['expires_in'] - 60; // expire 1-minute before expiration
    file_put_contents($cache_file, json_encode($item));

    $access_token = $item['access_token'];
}

// Now we can proceed with the API request
$url = "https://test.api.amadeus.com/v2/shopping/flight-offers?departureDate=$startDate&returnDate=$endDate&adults=$adults&max=5&originLocationCode=$origin&destinationLocationCode=$destination";

$headers = [
    "Authorization: Bearer $access_token",
    "Content-Type: application/json"
 ];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}

curl_close($ch);

header("Content-Type: application/json");

 echo $response;

?>