<?php

/**
 * Get Files Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to get the files for a study - can either be all files or files for a specific study
 */

class GetFiles extends Endpoint{

    protected function initialiseSQL(){

        $sql = 'SELECT emt_files.fileName, emt_study.short_name 
        FROM emt_files 
        JOIN emt_study ON emt_files.emt_study_id = emt_study.id';
        $sqlParams = [];

        if(filter_has_var(INPUT_GET, 'short_name')) {
            if(isset($where)) {
                $where .= " AND emt_study.short_name = :short_name";
            } else {
                $where = " WHERE emt_study.short_name = :short_name";
            }

            $sqlParams['short_name'] = $_GET['short_name'];
        }

        if(isset($where)) {
            $sql .= $where;
        }

        $this->setSql($sql);
        $this->setParams($sqlParams);
    }

    protected function endpointParams(){
        return ['short_name'];
    }

}