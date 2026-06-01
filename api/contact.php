<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$name    = htmlspecialchars(trim($input['name'] ?? ''));
$email   = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone   = htmlspecialchars(trim($input['phone'] ?? ''));
$message = htmlspecialchars(trim($input['message'] ?? ''));

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos requeridos incompletos']);
    exit();
}

// Configuración del correo destino
$to      = 'contacto@fullprotection.com'; // <- Cambiar por el email real
$subject = "Nuevo contacto desde la web: $name";

$body  = "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "Teléfono: $phone\n\n";
$body .= "Mensaje:\n$message\n";

$headers  = "From: noreply@fullprotection.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el correo']);
}
