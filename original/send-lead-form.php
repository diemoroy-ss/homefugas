<?php
/**
 * Contact Form Handler
 * Processes form submissions and sends emails via SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Define constant to allow config access
define('ALLOW_CONFIG_ACCESS', true);

// Load configuration
require_once __DIR__ . '/config.php';

// Load PHPMailer classes
require_once __DIR__ . '/libs/phpmailer/Exception.php';
require_once __DIR__ . '/libs/phpmailer/PHPMailer.php';
require_once __DIR__ . '/libs/phpmailer/SMTP.php';

// Set JSON response header
header('Content-Type: application/json; charset=utf-8');

/**
 * Send JSON error response
 */
function sendErrorResponse($message, $httpCode = 500) {
    http_response_code($httpCode);
    echo json_encode(array('status' => 'error', 'message' => $message));
    exit;
}

/**
 * Send JSON success response
 */
function sendSuccessResponse($message = 'Message sent successfully.') {
    echo json_encode(array('status' => 'success', 'message' => $message));
    exit;
}

/**
 * Validate form data
 */
function validateFormData($name, $phone, $email) {
    $errors = array();

    // Validate name
    if ($name === '' || strlen($name) < NAME_MIN_LENGTH || strlen($name) > NAME_MAX_LENGTH) {
        $errors[] = 'El nombre debe tener entre ' . NAME_MIN_LENGTH . ' y ' . NAME_MAX_LENGTH . ' caracteres.';
    }

    // Validate phone
    if (!preg_match(PHONE_PATTERN, $phone)) {
        $errors[] = 'El teléfono debe seguir el formato +569XXXXXXXX.';
    }

    // Validate email (optional field)
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'El formato del correo electrónico no es válido.';
    }

    if ($email !== '' && strlen($email) > EMAIL_MAX_LENGTH) {
        $errors[] = 'El correo electrónico no puede exceder ' . EMAIL_MAX_LENGTH . ' caracteres.';
    }

    return $errors;
}

/**
 * Build email message body
 */
function buildEmailMessage($name, $phone, $email) {
    $message  = "Has recibido un nuevo mensaje desde la landing page:\n\n";
    $message .= "Nombre: " . $name . "\n";
    $message .= "Teléfono: " . $phone . "\n";
    $message .= "Correo: " . ($email !== '' ? $email : 'No especificado') . "\n";
    $message .= "Fecha: " . date('d-m-Y H:i:s') . "\n";
    
    return $message;
}

/**
 * Configure and return PHPMailer instance
 */
function configurePHPMailer() {
    $mail = new PHPMailer(true);
    
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = SMTP_AUTH;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';
    
    return $mail;
}

/**
 * Send email using PHPMailer
 */
function sendEmail($name, $phone, $email) {
    try {
        $mail = configurePHPMailer();
        
        // Email headers
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress(EMAIL_TO);
        
        // Add reply-to if email is provided
        if ($email !== '') {
            $mail->addReplyTo($email);
        } else {
            $mail->addReplyTo(EMAIL_REPLY_TO_DEFAULT);
        }
        
        // Email content
        $mail->Subject = EMAIL_SUBJECT;
        $mail->Body    = buildEmailMessage($name, $phone, $email);
        
        // Send email
        if (!$mail->send()) {
            throw new PHPMailerException('Failed to send email: ' . $mail->ErrorInfo);
        }
        
        return true;
    } catch (PHPMailerException $e) {
        throw new PHPMailerException('Mailer Error: ' . $e->getMessage());
    }
}

// Main execution
try {
    // Check request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Method not allowed', 405);
    }
    
    // Get and sanitize form data
    $name  = isset($_POST['name'])  ? trim($_POST['name'])  : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    
    // Validate form data
    $errors = validateFormData($name, $phone, $email);
    if (!empty($errors)) {
        sendErrorResponse(implode(' ', $errors), 400);
    }
    
    // Send email
    sendEmail($name, $phone, $email);
    
    // Success response
    sendSuccessResponse();
    
} catch (PHPMailerException $e) {
    sendErrorResponse('Error al enviar el correo: ' . $e->getMessage(), 500);
} catch (\Exception $e) {
    sendErrorResponse('Ocurrió un error al procesar tu solicitud.', 500);
}
