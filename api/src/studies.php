<?php

/**
 * Endpoint for returning all studies
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to get all studies or a specific study based on the short_name or a search term
 */

class Studies extends Endpoint
{

    protected function initialiseSQL()
    {        
        $sql = "SELECT emt_study.id, emt_study.name, emt_study.short_name, emt_study.description, emt_study.emt_statuses_id, emt_study.lastEdit, emt_statuses.tag, emt_statuses.colour FROM emt_study
                JOIN emt_statuses ON emt_statuses_id = emt_statuses.id";
        $sqlParams = [];

        if (filter_has_var(INPUT_GET, 'short_name')) { // If the short_name parameter is set then add it to the SQL query
            if (isset($where)) {
                $where .= " AND emt_study.short_name = :short_name";
            } else {
                $where = " WHERE emt_study.short_name = :short_name";
            }
            $sqlParams['short_name'] = $_GET['short_name'];
        }
        if (filter_has_var(INPUT_GET, 'search')) { // If the search parameter is set then add it to the SQL query
            $search = htmlspecialchars($_GET['search']);
            if (isset($where)) {
                $where .= " AND (emt_study.name LIKE :search OR emt_study.description LIKE :search)";
            } else {
                $where = " WHERE (emt_study.name LIKE :search OR emt_study.description LIKE :search)";
            }
            $sqlParams['search'] = '%'.$search.'%';
        }

        if (isset($where)) {
            $sql .= $where;
        }  
        $this->setSql($sql);
        $this->setParams($sqlParams);
    }

    protected function endpointParams() {
        return ['short_name','search'];
     }
}
