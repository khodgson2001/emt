<?php
/**
 * Delete Study form Endpoint
 * 
 * This endpoint is used to delete a study form from the database
 * 
 * @author Kieran Hodgson
 * 
 */

class DeleteStudyForm extends Endpoint
{
    protected function initialiseSQL()
    {
        $this->validateToken();
        $this->validateDeleteParams();
        $sql = "
        START TRANSACTION;
        SET @study_id = (SELECT id FROM emt_study WHERE short_name = :short_name);
        DELETE FROM emt_completedForms WHERE emt_study_id = @study_id AND emt_forms_id = :formID;
        COMMIT;"; // use a transaction to get the id of the study and then delete it
        /**
         * originally setup differently - the transaction would get the id and then delete
         * any answers and completed forms associated with the study
         * but then I realised that the foreign key constraints would do that for me
         * so I simplified it
         */
        $this->setSQL($sql);
        $this->setParams(array(
            'short_name' => $_POST['short_name'],
            'formID' => $_POST['formID']
        ));


        $this->setContent(array(
            "length" => 0,
            "message" => "Deleted",
            "data" => null
        ));
    }

    protected function validateDeleteParams()
    {
		if (!filter_has_var(INPUT_POST, 'short_name')) {
			throw new ClientErrorException("Please select a study", 400);
		}
        if (!filter_has_var(INPUT_POST, 'formID')) {
            throw new ClientErrorException("Please select a form", 400);
        }
    }

    protected function endpointParams()
    {
        return ['short_name', 'formID'];
    }
}
