<?php
 
/**
 * Endpoint for handling client errors (400 responses)
 * 
 * @author Kieran Hodgson
 */
class ClientError extends Endpoint
{
    /**
     * Override the constructor because there is no
     * need to query the database for this endpoint.
     * 
     * @param String $message - A message explaining the error
     * @param Int $code - the relevant http status code
     */
    public function __construct($message = "", $code = 400) {
        // Set the relevant response code
        http_response_code($code);
        // Set the content of the response
        $this->setContent( array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}