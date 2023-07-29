<?php
/**
 * Validate Token Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to validate a token specifically for the app
 * if the token is valid then a success message is sent, if not then the validate token method in endpoint
 * throws an error
 */
class ValidateToken extends Endpoint{

    public function __construct()
    {
        $this->validateToken();
        
        $this->setContent(array(
            "message" => "success"
        )
        );
        
    }

}