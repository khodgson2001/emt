<?php

/**
 * Database class
 * 
 * This class is used to connect to the database and execute SQL queries
 * 
 * @author Kieran Hodgson
 * 
 * @var $dbConnection - database connection
 * @var $dbConn - database connection
 */
class Database
{
    private $dbConnection;
    private $dbConn;

    //connect to database on creation, catch any errors and throw them in a response
    public function __construct()
    {
        try {
            $dbConn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                DB_USERNAME,
                DB_PASSWORD
            );
            $dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbConnection = $dbConn;
        } catch (Exception $e) {
            throw new Exception("Connection error " . $e->getMessage(), 0, $e);
        }
    }

    //return database connection
    public function getDbConnection()
    {
        return $this->dbConnection;
    }

    //execute sql query and return all results
    public function executeSQL($sql, $params = [])
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        try{
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(Exception $e){
            throw new Exception("Error executing query " . $e->getMessage(), 0, $e);
        }

    }
}
