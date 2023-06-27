<?php

/**
 * Endpoint for returning all statuses
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to get all statuses
 */
class Statuses extends Endpoint{
    
    protected function initialiseSQL(){
        $sql = "SELECT * FROM emt_statuses";
        $sqlParams = [];
        $this->setSQL($sql);
        $this->setParams($sqlParams);
    }

}