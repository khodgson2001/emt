<?php
/**
 * Exception Handler
 * 
 * This file is used to handle exceptions thrown by the API
 */
function exceptionHandler($e){
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $output['location']['file'] = $e->getFile();
    $output['location']['line'] = $e->getLine();
    echo json_encode($output);
}