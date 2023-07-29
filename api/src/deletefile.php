<?php
/**
 * Delete File Endpoint
 * 
 * This endpoint is used to delete a file from the database
 * and the file system
 * 
 * @author Kieran Hodgson
 * 
 * @param String $fileName - the name of the file to be deleted
 */


class DeleteFile extends Endpoint
{

    //overriding the consturctor as need to conduct a delete operation first
    public function __construct()
    {
        $this->validateToken(); // validate the token
        $this->validateInsertParams(); // validate the parameters used
        $fileName  =  $_POST['filename']; // get the file name from the post request
        $upload_path = 'fileuploads/'; // set upload folder path 

        if (empty($fileName)) { // check if the file name is empty
            $this->setContent(array(
                "message" => "Please select a file",
                "status" => false
            ));
        } else {
            if (file_exists($upload_path . $fileName)) { // check if the file exists in the upload folder
                $delete  = unlink($upload_path . $fileName); // delete the file from the upload folder
                if ($delete) { // if the file is deleted successfully
                    $this->initialiseSQL(); // initialise the sql query which will delete the filename from the database
                    $this->executeSQL(); // execute the sql query
                    $this->setContent(array( // set the content of the response
                        "message" => "File deleted successfully",
                        "status" => true
                    ));
                } else { // if the file is not deleted successfully
                    $this->setContent(array( // set the content of the response
                        "message" => "Sorry, your file could not be deleted",
                        "status" => false
                    ));
                }
            }
        }
    }

    //overriding the executeSQL function as need to delete the file from the database, so no response from db
    private function executeSQL()
    {
        $dbConn = new Database();
        $prepStmnt = $dbConn->executeSQL($this->getSQL(), $this->getParams());
    }

    //overriding the initialiseSQL function to delete the file from the database using the filename
    protected function initialiseSQL()
    {
        $sql = 'DELETE FROM emt_files WHERE fileName = :fileName';
        $this->setSQL($sql);
        $this->setParams(array(
            'fileName' => $_POST['filename'],
        ));
    }

    //overriding the validateInsertParams function to check if the filename is set
    private function validateInsertParams()
    {
        if (!filter_has_var(INPUT_POST, 'filename')) {
            throw new ClientErrorException("File Name required", 400);
        }
    }
}
