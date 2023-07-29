<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;


/**
 * Default Endpoint Class
 * 
 * Contains everything needed in an endpoint with all common methods and parameters
 * 
 * @author Kieran Hodgson
 * 
 */

//abstract class allowing for the endpoint class not being instantiated by itself
abstract class Endpoint
{
    private $content;
    protected $sql;
    protected $params;
    protected $dbConn;


    /**
     * Endpoint constructor
     * 
     * @param Request $req - The request object
     * 
     * Ensures that the parameters used in the request are valid,
     * creates a database object, initialises the SQL and parameters
     * for the endpoint, executes the SQL and sets the content
     * 
     * @var Database $db - The database object
     * @var array $content - content from the query being made
     * 
     * @return void
     */
    public function __construct($req)
    {
        $this->validateToken();
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $dbConn = new Database();
        $this->initialiseSQL();
        $content = $dbConn->executeSQL($this->sql, $this->params);
        
        $this->setContent($content);
    }

    // ---- GETTERS & SETTERS -----

    /**
     * Sets the value of sql
     */
    protected function setSql($sql)
    {
        $this->sql = $sql;
    }

    public function getSql()
    {
        return $this->sql;
    }

    /**
     * Set the value of content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set the value of params
     */
    protected function setParams($params)
    {
        $this->params = $params;
    }

    protected function getParams()
    {
        return $this->params;
    }
    // ---- END GETTERS & SETTERS -----

    /**
     * Add collate nocase to sql
     * 
     * @param String $sql - sql query
     * 
     * @return String $sql
     */
    protected function sqlRmvCase($sql)
    {
        return $sql .= " COLLATE NOCASE";
    }

    /**
     * set sql and params for endpoint
     * 
     * @var string $sql - sql query
     * 
     * @return void
     */
    protected function initialiseSQL()
    {
        $sql = "";
        $this->setSql($sql);
        $this->setParams([]);
    }

    // check if the token is valid
    protected function validateToken(){

        $key = SECRET;

        $allHeaders = getallheaders(); // get all headers from the request
        $authorizationHeader = "";

        if(array_key_exists('Authorization', $allHeaders)){ // check if the authorization header exists
            $authorizationHeader = $allHeaders['Authorization']; // set the authorization header
        } elseif(array_key_exists('authorization', $allHeaders)){  // check if the authorization header exists (lowercase)
            $authorizationHeader = $allHeaders['authorization'];
        }

        if(substr($authorizationHeader, 0,7) !== "Bearer "){ // check if the authorization header is in the correct format, starts with Bearer
            throw new ClientErrorException("Bearer token required", 401);
        }

        $jwt = trim(substr($authorizationHeader, 7)); // get the jwt from the authorization header

        try{
            $decoded = JWT::decode($jwt, new Key($key, 'HS256')); // decode the jwt
        } catch(Exception $e){
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if($decoded->iss !== $_SERVER['HTTP_HOST']){ // check if the issuer is the same as the host
            throw new ClientErrorException("Invalid issuer token", 401);
        }
    }

    protected function endpointParams()
    {
        return [];
    }

    /**
     * Check the parameters used in request against an array of
     * valid parameters for the endpoint
     * 
     * @param array $params An array of valid param names (e.g. ['id'])
     * 
     * @return void
     * 
     * @throws ClientErrorException if any params are invalid
     */
    protected function validateParams($params)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                throw new ClientErrorException("Invalid parameter: " . $key, 400);
            }
        }

        foreach ($_POST as $key => $value) {
            if (!in_array($key, $params)) {
                throw new ClientErrorException("Invalid parameter: " . $key, 400);
            }
        }
    }


}
