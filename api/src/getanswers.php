<?php

/**
 * Get Answers Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to get the answers for a study
 */

class GetAnswers extends Endpoint{

    protected function initialiseSQL()
    {
        $sql = "SELECT emt_answers.emt_questions_id, emt_answers.answers FROM emt_answers 
        JOIN emt_completedForms on emt_completedForms.id = emt_answers.emt_completedForms_id
        JOIN emt_study ON emt_study.id = emt_completedForms.emt_study_id
        WHERE emt_study.short_name = :short_name";
        $sqlParams = [];
        $sqlParams['short_name'] = $_GET['short_name'];
        $this->setParams($sqlParams);
        $this->setSql($sql);
    }

    protected function endpointParams()
    {
        return ['short_name'];
    }


}