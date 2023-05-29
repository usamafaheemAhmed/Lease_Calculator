<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require './vendor/autoload.php';

if (isset($_POST['email'])) {
    
// Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);


    try {


        $name = $_POST['name'];
        $email = $_POST['email'];
        $equipmentAmount = $_POST['equipmentAmount'];
        $months = $_POST['months'];

        $interestRate = $_POST['interestRate'];
        $monthlyPayment = $_POST['monthlyPayment'];
        $taxWriteOff = $_POST['taxWriteOff'];





        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host = 'smtp.office365.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $mail->Username = 'sales@accessleasing.ca';                         // SMTP username
        $mail->Password = 'Rar07854';                               // SMTP password
        $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

//Recipients
        $mail->isHTML(false);
        $mail->setFrom('sales@accessleasing.ca', $name);
        $mail->addAddress($email);     // Add a recipient
//        $mail->addBCC('fahadg5015@gmail.com');     // Add a recipient

        $mail->Subject = 'New Client on Leasing Calculator';
        $mail->Body = "Here are the details of the client Name : \n.$name.\n and Email .$email.\n 
        Other Details are \nEquipment Amount: .$equipmentAmount.\n Months .$months. \nInterest Rate .$interestRate. \nMonthly Amount .$monthlyPayment. \nTax WriteOff .$taxWriteOff.";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

}