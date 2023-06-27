<?php

use FirebaseJWT\JWT;

/**
 * Class to authenticate a user using post request, extended from the Endpoint class
 * Makes use of FirebaseJWT to generate a JWT for the user if the username and password
 * are valid
 * 
 * @author Kieran Hodgson
 */
class Authenticate extends Endpoint
{
    /**
     * Constructor class
     * 
     * @var Database $db  - database connection
     * @var Array $queryResult - returned from querying $db
     * @var Array $data - contains the JWT for the account
     * 
     * Class validates params passed in via authorisation header through validateAuthParameters method,
     * creates a new connection to the specified database,
     * queries the db using getSQL method from Endpoint class
     * and applies parameters from getParams from Endpoint class
     * username and password is then validated where they are both present
     * in the database, if not a ClientErrorException is thrown with correct status code.
     * A JWT is then created and returned to the user.
     */
    public function __construct()
    {
        $dbConnection = new Database(); // Create new database connection
        $this->validateAuthParameters(); // Validate the parameters passed in via the authorisation header to ensure they are present
        $this->initialiseSQL(); // Initialise the SQL query and parameters
        $stmt = $dbConnection->getDbConnection()->prepare($this->getSQL()); // Prepare the SQL query
        $stmt->execute($this->getParams()); // Execute the SQL query
        $queryResult = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the results of the query and store in $queryResult
        
        $this->validateUsername($queryResult); // Validate the username
        $this->validatePassword($queryResult); // Validate the password
        //above throws exception if invalid

        $data['token'] = $this->createJWT($queryResult); // Create a JWT for the user
        $this->setContent(array( // Set the content of the response
            "message" => "success",
            "data" => $data
        ));
    }


    /**
     * Creates a JWT for the user
     * 
     * @param Array $queryResult - returned from querying $db
     * 
     * @var String $secretKey - secret key used to encode JWT, defined in index.php
     * @var Int $time - current time
     * @var Array $tokenPayload - contains the payload for the JWT
     * @var String $jwt - JWT for the user, encoded using HS256
     * 
     * Creates a JWT for the user, using the email from the database
     * as the subject of the JWT. The JWT is encoded using HS256 and the secret key
     * defined in index.php
     * 
     * @return String $jwt - JWT for the user
     * 
     */
    private function createJWT($queryResult)
    {
        $secretKey = SECRET;
        $time = time();
        $tokenPayload = [
            'iat' => $time,
            'exp' => strtotime('+1 day', $time),
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $queryResult['email'],
        ];
        $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
        return $jwt;
    }

    /**
     * Validates the parameters passed in via the authorisation header
     * 
     * Validates the parameters passed in via the authorisation header
     * if username or password is not present, a ClientErrorException is thrown
     * with a 401 status code
     * 
     * @return void
     * 
     * @throws ClientErrorException - if username or password is not present
     * 
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * initialiseSQL Function
     * 
     * @var String $sql - SQL query to be executed
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * @return void
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT id, email, password FROM emt_investigators WHERE email = :email";
        $this->setSQL($sql);
        $this->setParams(array(
            'email' => $_SERVER['PHP_AUTH_USER']
        ));
    }

    /**
     * Validates the username
     * 
     * @param Array $data - returned from querying $db
     * 
     * 
     * Validates the username, if username is not present, a ClientErrorException is thrown
     * with a 401 status code
     * 
     * @return void
     * 
     * @throws ClientErrorException - if username is not present
     */
    private function validateUsername($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * Validates the password
     * 
     * @param Array $data - returned from querying $db
     * 
     * Validates the password, if password is not present, a ClientErrorException is thrown
     * with a 401 status code
     *      
     * @return void
     * 
     * @throws ClientErrorException - if password is not present
     */
    private function validatePassword($data)
    {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data['password'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }
}
