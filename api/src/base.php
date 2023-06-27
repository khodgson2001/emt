<?php
 /**
  * Base endpoint
  * 
  * @author Kieran Hodgson
  */


 class Base extends Endpoint
 {


    public function __construct()
    {
        $this->setContent(array(
            "Base Endpoint" => "This is the API for the EMT App",
            "name" => "Kieran Hodgson",
        ));

    
    }

 }