<?php

/**
 * Update Study Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to update a study
 */

class UpdateStudy extends Endpoint{

    protected function initialiseSQL(){
        $this->validateInsertParams();
        $sql = "UPDATE emt_study SET lastEdit = NOW()";
        $sqlParams = [];
        // if any of these fields are set, add them to the query. This could be done better with a loop and applied to other endpoints for updating
        if(filter_has_var(INPUT_POST, 'name')) {
            $sql .= ", name = :name";
            $sqlParams['name'] = $_POST['name'];
        }
        if(filter_has_var(INPUT_POST, 'description')) {
            $sql .= ", description = :description";
            $sqlParams['description'] = $_POST['description'];
        }
        if(filter_has_var(INPUT_POST, 'principleInvestigator')) {
            $sql .= ", principleInvestigator = :principleInvestigator";
            $sqlParams['principleInvestigator'] = $_POST['principleInvestigator'];
        }
        if(filter_has_var(INPUT_POST, 'researchLead')) {
            $sql .= ", researchLead = :researchLead";
            $sqlParams['researchLead'] = $_POST['researchLead'];
        }
        if(filter_has_var(INPUT_POST, 'chiefInvestigator')) {
            $sql .= ", chiefInvestigator = :chiefInvestigator";
            $sqlParams['chiefInvestigator'] = $_POST['chiefInvestigator'];
        }
        if(filter_has_var(INPUT_POST, 'emt_statuses_id')) {
            $sql .= ", emt_statuses_id = :emt_statuses_id";
            $sqlParams['emt_statuses_id'] = $_POST['emt_statuses_id'];
        }
        if(filter_has_var(INPUT_POST, 'short_name')) {
            $sqlParams['short_name'] = $_POST['short_name'];
        }


       $sql .= " WHERE short_name = :short_name";

        $this->setSQL($sql);
        $this->setParams($sqlParams);

        $this->setContent( array(
            "length" => 0,
            "message" => "Sucess",
            "data" => null
        ));
    }

    public function __construct() {
        $this->validateToken();

        $dbConn = new Database();

        $this->initialiseSQL();
        $prepStmnt = $dbConn->executeSQL($this->getSQL(), $this->getParams());
        $this->setContent(
            array(
                "length" => 0,
                "message" => "Sucess",
                "data" => null
            )
        );    }


    private function validateInsertParams(){
        if(!filter_has_var(INPUT_POST,'short_name')){
            throw new ClientErrorException("Short Name required", 400);
        }
        if(!filter_has_var(INPUT_POST,'name')){
            throw new ClientErrorException("Name required", 400);
        }
        if(!filter_has_var(INPUT_POST,'description')){
            throw new ClientErrorException("Description required", 400);
        }
    }


    protected function endpointParams() {
        return ['name','short_name','description','principleInvestigator','researchLead','chiefInvestigator','emt_statuses_id'];
     }

}