<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
$phone = isset($data['phone']) ? filter_var($data['phone'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
$commune = isset($data['commune']) ? filter_var($data['commune'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
$service = isset($data['service']) ? filter_var($data['service'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
$message = isset($data['message']) ? filter_var($data['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Faltan campos obligatorios (nombre y teléfono).'
    ]);
    exit();
}

// Log lead for DigitalOcean storage backup
$logLine = sprintf(
    "[%s] Nombre: %s | Teléfono: %s | Comuna: %s | Servicio: %s | Mensaje: %s\n",
    date('Y-m-d H:i:s'),
    $name,
    $phone,
    $commune,
    $service,
    $message
);

@file_put_contents(__DIR__ . '/leads_log.txt', $logLine, FILE_APPEND);

// Email notification setup (Configurable via server)
$to = "contacto@grupofugas.cl, ventas@homefugas.cl";
$subject = "NUEVO LEAD HOME FUGAS - " . strtoupper($commune);
$body = "Ha recibido una nueva solicitud de cotización desde homefugas.cl (Región de Valparaíso):\n\n"
      . "Nombre: $name\n"
      . "Teléfono: $phone\n"
      . "Comuna: $commune\n"
      . "Servicio: $service\n"
      . "Mensaje: $message\n\n"
      . "Fecha: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: no-reply@homefugas.cl\r\n"
         . "Reply-To: no-reply@homefugas.cl\r\n"
         . "X-Mailer: PHP/" . phpversion();

@mail($to, $subject, $body, $headers);

echo json_encode([
    'status' => 'success',
    'message' => 'Lead procesado correctamente.'
]);
