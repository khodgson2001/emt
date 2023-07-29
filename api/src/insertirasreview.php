<?php

/**
 * Insert IRAS Review Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to insert the IRAS Review form into the database
 */

class InsertIRASReview extends Endpoint{

    protected function initialiseSQL(){
        //$this->validateInsertParams();
        // transaction to get the id of the study and then insert the answers
        $sql = "START TRANSACTION;
        SELECT id INTO @studyID FROM emt_study WHERE short_name = :studyID;
        
        INSERT INTO emt_completedForms (emt_study_id, emt_forms_id) VALUES (@studyID, 3);

        set @lastId := LAST_INSERT_ID();
        INSERT INTO emt_answers(emt_questions_id, emt_completedForms_id, answers) VALUES
        (54, @lastId, :ctInvestigationalMedicine),
        (55, @lastId, :ctMedicalDevice),
        (56, @lastId, :trialMedProduct),
        (57, @lastId, :otherTrialNovel),
        (58, @lastId, :otherBasicScience),
        (59, @lastId, :section2Comments),
        (60, @lastId, :cagRecDate),
        (61, @lastId, :cagRecComments),
        (62, @lastId, :ciNeedsClinicalDate),
        (63, @lastId, :ciNeedsClinicalComments),
        (64, @lastId, :sponsorNamedAdminDate),
        (65, @lastId, :sponsorNamedAdminComments),
        (66, @lastId, :summaryStudyLayDate),
        (67, @lastId, :summaryStudyLayComments),
        (68, @lastId, :sampleGroupDate),
        (69, @lastId, :sampleGroupComments),
        (70, @lastId, :idApproachDate),
        (71, @lastId, :idApproachComments),
        (72, @lastId, :caldicottDate),
        (73, @lastId, :caldicottComments),
        (74, @lastId, :durationStoredDate),
        (75, @lastId, :durationStoredComments),
        (76, @lastId, :termArchiveDate),
        (77, @lastId, :termArchiveComments),
        (78, @lastId, :sponsorNHSDate),
        (79, @lastId, :sponsorAcademicDate),
        (80, @lastId, :sponsorPharmaDate),
        (81, @lastId, :sponsorMedDate),
        (82, @lastId, :sponsorComments),
        (83, @lastId, :indemnityNHSDate),
        (84, @lastId, :indemnityOtherDate),
        (85, @lastId, :indemnityComments),
        (86, @lastId, :evidenceNHCTDate),
        (87, @lastId, :requestHRAAddedDate),
        (88, @lastId, :approveHRAAddedDate),
        (89, @lastId, :hraComments);

        COMMIT;";
        $this->setSQL($sql);
        // set the parameters for the sql query
        $this->setParams(array(
            'studyID' => $_POST['studyID'],
            'ctInvestigationalMedicine' => $_POST['ctInvestigationalMedicine'],
            'ctMedicalDevice' => $_POST['ctMedicalDevice'],
            'trialMedProduct' => $_POST['trialMedProduct'],
            'otherTrialNovel' => $_POST['otherTrialNovel'],
            'otherBasicScience' => $_POST['otherBasicScience'],
            'section2Comments' => $_POST['section2Comments'],
            'cagRecDate' => $_POST['cagRecDate'],
            'cagRecComments' => $_POST['cagRecComments'],
            'ciNeedsClinicalDate' => $_POST['ciNeedsClinicalDate'],
            'ciNeedsClinicalComments' => $_POST['ciNeedsClinicalComments'],
            'sponsorNamedAdminDate' => $_POST['sponsorNamedAdminDate'],
            'sponsorNamedAdminComments' => $_POST['sponsorNamedAdminComments'],
            'summaryStudyLayDate' => $_POST['summaryStudyLayDate'],
            'summaryStudyLayComments' => $_POST['summaryStudyLayComments'],
            'sampleGroupDate' => $_POST['sampleGroupDate'],
            'sampleGroupComments' => $_POST['sampleGroupComments'],
            'idApproachDate' => $_POST['idApproachDate'],
            'idApproachComments' => $_POST['idApproachComments'],
            'caldicottDate' => $_POST['caldicottDate'],
            'caldicottComments' => $_POST['caldicottComments'],
            'durationStoredDate' => $_POST['durationStoredDate'],
            'durationStoredComments' => $_POST['durationStoredComments'],
            'termArchiveDate' => $_POST['termArchiveDate'],
            'termArchiveComments' => $_POST['termArchiveComments'],
            'sponsorNHSDate' => $_POST['sponsorNHSDate'],
            'sponsorAcademicDate' => $_POST['sponsorAcademicDate'],
            'sponsorPharmaDate' => $_POST['sponsorPharmaDate'],
            'sponsorMedDate' => $_POST['sponsorMedDate'],
            'sponsorComments' => $_POST['sponsorComments'],
            'indemnityNHSDate' => $_POST['indemnityNHSDate'],
            'indemnityOtherDate' => $_POST['indemnityOtherDate'],
            'indemnityComments' => $_POST['indemnityComments'],
            'evidenceNHCTDate' => $_POST['evidenceNHCTDate'],
            'requestHRAAddedDate' => $_POST['requestHRAAddedDate'],
            'approveHRAAddedDate' => $_POST['approveHRAAddedDate'],
            'hraComments' => $_POST['hraComments']
        ));

    }

    public function __construct()
    {
        $this->validateToken();
        $this->validateInsertParams();
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

        if(!filter_has_var(INPUT_POST,'short_name') || $_POST['short_name'] == ""){
            throw new ClientErrorException("Short name required", 400);
        }
    }


    protected function endpointParams() {
        return ['name','short_name','principleInvestigator','researchLead','chiefInvestigator','emt_statuses_id'];
     }


}


?>
