<?php

/**
 * Upload File Endpoint
 * 
 * @author Kieran Hodgson
 * 
 * @description This endpoint is used to upload a file
 * 
 * built with support of W3Schools https://www.w3schools.com/php/php_file_upload.asp
 */

class UploadFile extends Endpoint
{

	public function __construct()
	{
		$this->validateToken();
		$data = json_decode(file_get_contents("php://input"), true); // collect input parameters and convert into readable format
		echo ($data);
		if (!$_FILES['sendimage'] || empty($_FILES['sendimage'])) { // initially setup for sending images (hence the name sendimage), but can be used for any file type
			throw new ClientErrorException("Please select a file", 400);
		} 
		else {
			$this->validateInsertParams();
			$fileName  =  $_FILES['sendimage']['name'];
			$tempPath  =  $_FILES['sendimage']['tmp_name'];
			$fileSize  =  $_FILES['sendimage']['size'];

			$upload_path = 'fileuploads/'; // set upload folder path 

			$fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION)); // get file extension

			// valid image extensions
			$valid_extensions = array('pdf');

			// allow valid image file formats
			if (in_array($fileExt, $valid_extensions)) {
				//check file not exist our upload folder path
				if (!file_exists($upload_path . $fileName)) {
					// check file size '50MB'
					if ($fileSize < 50000000) {
						move_uploaded_file($tempPath, $upload_path . $fileName); // move file from system temporary path to our upload folder path 
						$this->initialiseSQL();
						$this->executeSQL();
						$this->setContent(array(
							"message" => "File uploaded successfully",
							"status" => true
						));
					} else {
						throw new ClientErrorException("Please select a file smaller than 50mb", 400);
					}
				} else {
					throw new ClientErrorException("This file already exists", 400);
				}
			} else {
				throw new ClientErrorException("Please select a PDF file", 400);
			}
		}
	}

	private function executeSQL()
	{
		$dbConn = new Database();
		$prepStmnt = $dbConn->executeSQL($this->getSQL(), $this->getParams());
	}

	protected function initialiseSQL()
	{
		$sql = 'INSERT INTO emt_files (fileName, emt_study_id) VALUES (:fileName, (SELECT id FROM emt_study WHERE short_name = :shortName))';
		$this->setSQL($sql);
		$this->setParams(array(
			'fileName' => $_FILES['sendimage']['name'],
			'shortName' => $_POST['short_name']
		));
	}

	private function validateInsertParams()
	{
		if (!filter_has_var(INPUT_POST, 'short_name')) {
			throw new ClientErrorException("Please select a study", 400);
		}
	}
}
