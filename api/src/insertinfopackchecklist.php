<?php

/**
 * Insert Info Pack Checklist Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to insert the info pack checklist for a study
 */

class InsertInfoPackChecklist extends Endpoint{

    protected function initialiseSQL(){
        //$this->validateInsertParams();
        //transaction to get the id of the study and then insert the answers
        $sql = "START TRANSACTION;
        SELECT id INTO @studyID FROM emt_study WHERE short_name = :studyID;
        
        INSERT INTO emt_completedForms (emt_study_id, emt_forms_id) VALUES (@studyID, 2);

        set @lastId := LAST_INSERT_ID();
        INSERT INTO emt_answers(emt_questions_id, emt_completedForms_id, answers) VALUES
        (26, @lastId, :rndEmailTo), 
        (27, @lastId, :acceptEmailComments),
        (28, @lastId, :acceptEmailDate),
        (29, @lastId, :hostRegFormDate),
        (30, @lastId, :pharmacyDate),
        (31, @lastId, :radiologyDate),
        (33, @lastId, :pathologyDate),
        (35, @lastId, :cardiologyDate),
        (36, @lastId, :costingDate),
        (37, @lastId, :fundingDate),
        (38, @lastId, :ccrDate),
        (39, @lastId, :caldicottDate),
        (40, @lastId, :gcpDate),
        (41, @lastId, :delegationDate),
        (42, @lastId, :pirDate),
        (43, @lastId, :step2Comments),
        (44, @lastId, :contractCostDate),
        (45, @lastId, :contractReviewDate),
        (46, @lastId, :contractReadyDate),
        (47, @lastId, :contractAgreedDate),
        (48, @lastId, :emailFinanceDate),
        (49, @lastId, :emailPharmacyDate),
        (50, @lastId, :emailPathologyDate),
        (51, @lastId, :emailLungFunctionDate),
        (52, @lastId, :emailRadiologyDate),
        (53, @lastId, :updateLPMSDate);
        
        COMMIT;";
        $this->setSQL($sql);
        //set the parameters for the sql query
        $this->setParams(array(
            'rndEmailTo' => $_POST['rndEmailTo'],
            'acceptEmailComments' => $_POST['acceptEmailComments'],
            'acceptEmailDate' => $_POST['acceptEmailDate'],
            'hostRegFormDate' => $_POST['hostRegFormDate'],
            'pharmacyDate' => $_POST['pharmacyDate'],
            'radiologyDate' => $_POST['radiologyDate'],
            'pathologyDate' => $_POST['pathologyDate'],
            'cardiologyDate' => $_POST['cardiologyDate'],
            'costingDate' => $_POST['costingDate'],
            'fundingDate' => $_POST['fundingDate'],
            'ccrDate' => $_POST['ccrDate'],
            'caldicottDate' => $_POST['caldicottDate'],
            'gcpDate' => $_POST['gcpDate'],
            'delegationDate' => $_POST['delegationDate'],
            'pirDate' => $_POST['pirDate'],
            'step2Comments' => $_POST['step2Comments'],
            'contractCostDate' => $_POST['contractCostDate'],
            'contractReviewDate' => $_POST['contractReviewDate'],
            'contractReadyDate' => $_POST['contractReadyDate'],
            'contractAgreedDate' => $_POST['contractAgreedDate'],
            'emailFinanceDate' => $_POST['emailFinanceDate'],
            'emailPharmacyDate' => $_POST['emailPharmacyDate'],
            'emailPathologyDate' => $_POST['emailPathologyDate'],
            'emailLungFunctionDate' => $_POST['emailLungFunctionDate'],
            'emailRadiologyDate' => $_POST['emailRadiologyDate'],
            'updateLPMSDate' => $_POST['updateLPMSDate'],
            'studyID' => $_POST['studyID']
        ));

        


    }

    public function __construct()
    {
        $this->validateToken();
        //$this->validateInsertParams($this->endpointParams()); // make sure params are valid
        $dbConn = new Database();
        $this->initialiseSQL();
        $response = $dbConn->executeSQL($this->sql, $this->params);        
        $this->setContent( array(
            "length" => 0,
            "message" => "Sucess",
            "data" => $response
        ));
    }

    private function validateInsertParams(){
        if(!filter_has_var(INPUT_POST,'name') || $_POST['name'] == ""){
            throw new ClientErrorException("Name required", 400);
        }
    }


    protected function endpointParams() {
        return ['name','short_name','description','principleInvestigator','researchLead','chiefInvestigator','emt_statuses_id'];
     }


}


?>
