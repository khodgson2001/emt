<?php

/**
 * Endpoint for creating a new researcher
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to create a new researcher
 */

class NewResearcher extends Endpoint{

    protected function initialiseSQL(){
        $this->validateInsertParams();
        $sql = "INSERT INTO emt_investigators (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)";
        $this->setSQL($sql);
        $this->setParams(array(
            'first_name' => $_POST['first_name'],
            'last_name' => $_POST['last_name'],
            'email' => $_POST['email'],
            'password' => password_hash($_POST['password'], PASSWORD_DEFAULT) // hash the password that has been passed in - currently susceptible to a man in the middle attack as the password is being sent in plain text
        ));
    }

    public function __construct()
    {
        $this->validateToken();
        $this->validateInsertParams($this->endpointParams()); // make sure params are valid
        $dbConn = new Database();
        $this->initialiseSQL();
        $dbConn->executeSQL($this->sql, $this->params);
        

        $this->setContent( array(
            "length" => 0,
            "message" => "Sucess",
            "data" => null
        ));        
    }

    private function validateInsertParams(){
        if(!filter_has_var(INPUT_POST,'first_name') || $_POST['first_name'] == ""){
            throw new ClientErrorException("First name required", 400);
        }
        if(!filter_has_var(INPUT_POST,'last_name') || $_POST['last_name'] == ""){
            throw new ClientErrorException("Last name required", 400);
        }
        if(!filter_has_var(INPUT_POST,'email') || $_POST['email'] == ""){
            throw new ClientErrorException("Email required", 400);
        }
        if(!filter_has_var(INPUT_POST,'password') || $_POST['password'] == ""){
            throw new ClientErrorException("Password required", 400);
        }
    }


    protected function endpointParams() {
        return ['first_name', 'last_name', 'email', 'password'];
     }


}
