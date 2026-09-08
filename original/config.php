<?php
/**
 * Configuration file for the contact form
 * This file contains sensitive information and should not be accessible from the web
 */

// Prevent direct access (multiple methods for security)
if (!defined('ALLOW_CONFIG_ACCESS')) {
    // Method 1: Check if accessed directly via web
    if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
        http_response_code(403);
        header('Content-Type: text/plain');
        exit('Direct access to this file is not allowed.');
    }
    
    // Method 2: Check if accessed via HTTP/HTTPS
    if (isset($_SERVER['HTTP_HOST']) || isset($_SERVER['REQUEST_URI'])) {
        http_response_code(403);
        header('Content-Type: text/plain');
        exit('Direct access to this file is not allowed.');
    }
}

// SMTP Configuration
define('SMTP_HOST', 'mail.homefugas.cl');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls'); // 'tls' or 'ssl'
define('SMTP_USERNAME', 'no-responder@homefugas.cl');
define('SMTP_PASSWORD', 'c&t9w*l33GVT-zm;');
define('SMTP_AUTH', true);

// Email Configuration
define('EMAIL_FROM', 'no-responder@homefugas.cl');
define('EMAIL_FROM_NAME', 'Landing Page - Formulario Web');
define('EMAIL_TO', 'contacto@homefugas.cl');
define('EMAIL_REPLY_TO_DEFAULT', 'noreply@homefugas.cl');

// Form Validation Rules
define('NAME_MIN_LENGTH', 5);
define('NAME_MAX_LENGTH', 40);
define('PHONE_PATTERN', '/^\+56\d{9}$/');
define('EMAIL_MAX_LENGTH', 100);

// Email Content
define('EMAIL_SUBJECT', 'Nuevo contacto desde la landing page');

