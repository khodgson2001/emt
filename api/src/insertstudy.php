<?php

/**
 * Insert Study Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to insert a new study into the database
 */

class InsertStudy extends Endpoint{

    protected function initialiseSQL(){
        $this->validateInsertParams();
        // transaction to insert the study, completed form and answers
        $sql = "START TRANSACTION;
        INSERT INTO emt_study 
        (name, short_name, description, principleInvestigator, researchLead, chiefInvestigator, emt_statuses_id)
        VALUES (:name, :short_name, :description, :principleInvestigator, :researchLead, :chiefInvestigator, :emt_statuses_id);
        
        INSERT INTO emt_completedForms (emt_study_id, emt_forms_id) VALUES (LAST_INSERT_ID(), 1);

        set @lastId := LAST_INSERT_ID();

        INSERT INTO emt_answers(emt_questions_id, emt_completedForms_id, answers) VALUES
        (1, @lastId, :name), 
        (2, @lastId, :short_name), 
        (3, @lastId, :iras), 
        (4, @lastId, :portfolioAdopted), 
        (5, @lastId, :portfolioId), 
        (6, @lastId, :fundingCat),
        (7, @lastId, :siteInvited),
        (8, @lastId, :siteSelected),
        (9, @lastId, :chiefInvestigator),
        (10, @lastId, :principleInvestigator),
        (11, @lastId, :researchLead),
        (12, @lastId, :siteLocation),
        (13, @lastId, :recruitmentTarget),
        (14, @lastId, :startDate),
        (15, @lastId, :endDate),
        (16, @lastId, :hra),
        (17, @lastId, :indemnity),
        (18, @lastId, :caldicott),
        (19, @lastId, :gcp),
        (20, @lastId, :agreedSS),
        (21, @lastId, :financeAvailable),
        (22, @lastId, :siv),
        (23, @lastId, :coe),
        (24, @lastId, :coyob);
        
        COMMIT;";
        $this->setSQL($sql);
        $this->setParams(array(
            'name' => $_POST['name'],
            'short_name' => $_POST['short_name'],
            'description' => $_POST['description'],
            'principleInvestigator' => $_POST['principleInvestigator'],
            'researchLead' => $_POST['researchLead'],
            'chiefInvestigator' => $_POST['chiefInvestigator'],
            'emt_statuses_id' => $_POST['emt_statuses_id'],
            'iras' => $_POST['iras'],
            'portfolioAdopted' => $_POST['portfolioAdopted'],
            'portfolioId' => $_POST['portfolioId'],
            'fundingCat' => $_POST['fundingCat'],
            'siteInvited' => $_POST['siteInvited'],
            'siteSelected' => $_POST['siteSelected'],
            'siteLocation' => $_POST['siteLocation'],
            'recruitmentTarget' => $_POST['recruitmentTarget'],
            'startDate' => $_POST['startDate'],
            'endDate' => $_POST['endDate'],
            'hra' => $_POST['hra'],
            'indemnity' => $_POST['indemnity'],
            'caldicott' => $_POST['caldicott'],
            'gcp' => $_POST['gcp'],
            'agreedSS' => $_POST['agreedSS'],
            'financeAvailable' => $_POST['financeAvailable'],
            'siv' => $_POST['siv'],
            'coe' => $_POST['coe'],
            'coyob' => $_POST['coyob']
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

    // validate the params for the insert - this is an example where all fields must be set
    private function validateInsertParams(){
        if(!filter_has_var(INPUT_POST,'name') || $_POST['name'] == ""){
            throw new ClientErrorException("Name required", 400);
        }
        if(!filter_has_var(INPUT_POST,'short_name') || $_POST['short_name'] == ""){
            throw new ClientErrorException("Short name required", 400);
        }
/*         if(!filter_has_var(INPUT_POST,'description') || $_POST['description'] == ""){ // description is not set here
            throw new ClientErrorException("Description required", 400);
        } */
        if(!filter_has_var(INPUT_POST,'principleInvestigator') || $_POST['principleInvestigator'] == ""){
            throw new ClientErrorException("Principle investigator required", 400);
        }
        if(!filter_has_var(INPUT_POST,'researchLead') || $_POST['researchLead'] == ""){
            throw new ClientErrorException("Research lead required", 400);
        }
        if(!filter_has_var(INPUT_POST,'chiefInvestigator') || $_POST['chiefInvestigator'] == ""){
            throw new ClientErrorException("Chief investigator required", 400);
        }
        if(!filter_has_var(INPUT_POST,'emt_statuses_id') || $_POST['emt_statuses_id'] == ""){
            throw new ClientErrorException("EMT status required", 400);
        }
        if(!filter_has_var(INPUT_POST,'iras') || $_POST['iras'] == ""){
            throw new ClientErrorException("IRAS required", 400);
        }
        if(!filter_has_var(INPUT_POST,'portfolioAdopted') || $_POST['portfolioAdopted'] == ""){
            throw new ClientErrorException("Portfolio adopted required", 400);
        }
        if(!filter_has_var(INPUT_POST,'portfolioId') || $_POST['portfolioId'] == ""){
            throw new ClientErrorException("Portfolio ID required", 400);
        }
        if(!filter_has_var(INPUT_POST,'fundingCat') || $_POST['fundingCat'] == ""){
            throw new ClientErrorException("Funding category required", 400);
        }
        if(!filter_has_var(INPUT_POST,'siteInvited') || $_POST['siteInvited'] == ""){
            throw new ClientErrorException("Site invited required", 400);
        }
        if(!filter_has_var(INPUT_POST,'siteSelected') || $_POST['siteSelected'] == ""){
            throw new ClientErrorException("Site selected required", 400);
        }
        if(!filter_has_var(INPUT_POST,'siteLocation') || $_POST['siteLocation'] == ""){
            throw new ClientErrorException("Site location required", 400);
        }
        if(!filter_has_var(INPUT_POST,'recruitmentTarget') || $_POST['recruitmentTarget'] == ""){
            throw new ClientErrorException("Recruitment target required", 400);
        }
        if(!filter_has_var(INPUT_POST,'startDate') || $_POST['startDate'] == ""){
            throw new ClientErrorException("Start date required", 400);
        }
        if(!filter_has_var(INPUT_POST,'endDate') || $_POST['endDate'] == ""){
            throw new ClientErrorException("End date required", 400);
        }
        if(!filter_has_var(INPUT_POST,'hra') || $_POST['hra'] == ""){
            throw new ClientErrorException("HRA required", 400);
        }
        if(!filter_has_var(INPUT_POST,'indemnity') || $_POST['indemnity'] == ""){
            throw new ClientErrorException("Indemnity required", 400);
        }
        if(!filter_has_var(INPUT_POST,'caldicott') || $_POST['caldicott'] == ""){
            throw new ClientErrorException("Caldicott required", 400);
        }
        if(!filter_has_var(INPUT_POST,'gcp') || $_POST['gcp'] == ""){
            throw new ClientErrorException("GCP required", 400);
        }
/*         if(!filter_has_var(INPUT_POST,'agreedSS') || $_POST['agreedSS'] == ""){
            throw new ClientErrorException("Agreed SS required", 400);
        } */
        if(!filter_has_var(INPUT_POST,'financeAvailable') || $_POST['financeAvailable'] == ""){
            throw new ClientErrorException("Finance available required", 400);
        }
        if(!filter_has_var(INPUT_POST,'siv') || $_POST['siv'] == ""){
            throw new ClientErrorException("SIV required", 400);
        }
        if(!filter_has_var(INPUT_POST,'coe') || $_POST['coe'] == ""){
            throw new ClientErrorException("COE required", 400);
        }
        if(!filter_has_var(INPUT_POST,'coyob') || $_POST['coyob'] == ""){
            throw new ClientErrorException("COYOB required", 400);
        }
    }


    protected function endpointParams() {
        return ['name','short_name','description','principleInvestigator','researchLead','chiefInvestigator','emt_statuses_id'];
     }


}