<?php
/**
 * Researchers Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to get the researchers
 * either all of them or a specific one
 */
class Researchers extends Endpoint
{

    protected function initialiseSQL()
    {        
        $sql = "SELECT emt_investigators.id, emt_investigators.first_name, emt_investigators.last_name, emt_investigators.email FROM emt_investigators";
        $sqlParams = [];

        if (filter_has_var(INPUT_GET, 'id')) {; // if the id parameter is set, get the researcher with that id
            if (isset($where)) {
                $where .= " AND emt_investigators.id = :id";
            } else {
                $where = " WHERE emt_investigators.id = :id";
            }
            $sqlParams['id'] = $_GET['id'];
        }
        if (filter_has_var(INPUT_GET, 'search')) { // if the search parameter is set, get the researchers with a first or last name that matches the search
            $search = htmlspecialchars($_GET['search']);
            if (isset($where)) {
                $where .= " AND (emt_investigators.first_name LIKE :search OR emt_investigators.last_name LIKE :search)";
            } else {
                $where = " WHERE (emt_investigators.first_name LIKE :search OR emt_investigators.last_name LIKE :search)";
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
        return ['id','search'];
     }
}
