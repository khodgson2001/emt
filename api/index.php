<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include('config/exceptionHandler.php');
set_exception_handler('exceptionHandler');

include('config/autoloader.php');
spl_autoload_register('autoloader');

include 'secrets.php'; //include secrets file





$req = new Request();
//switch case for endpoints
try {
    switch ($req->getPath()) {
        case '/':
            $req->validateRequestMethod(array("GET")); //validates request method is GET
            $endpoint = new Base($req);
            break;
        case '/studies':
        case '/studies/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Studies($req);
            break;
        case '/study/insert':
        case '/study/insert/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new InsertStudy($req);
            break;
        case '/study/delete':
        case '/study/delete/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new DeleteStudy($req);
            break;
        case '/study/forms/delete':
        case '/study/forms/delete/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new DeleteStudyForm($req);
            break;
        case '/study/update':
        case '/study/update/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new UpdateStudy($req);
            break;
        case '/statuses':
        case '/statuses/':
        case '/status':
        case '/status/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Statuses($req);
            break;
        case '/researchers':
        case '/researchers/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Researchers($req);
            break;
        case '/uploadFile':
        case '/uploadFile/':
        case '/files/upload':
        case '/files/upload/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new UploadFile($req);
            break;
        case '/files':
        case '/files/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new GetFiles($req);
            break;
        case '/files/delete':
        case '/files/delete/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new DeleteFile($req);
            break;
        case '/answers':
        case '/answers/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new GetAnswers($req);
            break;
        case '/sendemail':
        case '/sendemail/':
            $req->validateREquestMethod(array('POST'));
            $endpoint = new SendEmail();
            break;
        case '/infopack':
        case '/infopack/':
            $req->validateRequestMethod(array('POST'));
            $endpoint = new InsertInfoPackChecklist($req);
            break;
        case '/researchers/insert':
        case '/researchers/insert/':
            $req->validateRequestMethod(array('POST'));
            $endpoint = new NewResearcher($req);
            break;
        case '/iras':
        case '/iras/':
            $req->validateRequestMethod(array('POST'));
            $endpoint = new InsertIRASReview($req);
            break;
        case '/auth/':
        case '/auth':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new Authenticate($req);
            break;
        case '/auth/validate':
        case '/auth/validate/':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new ValidateToken($req);
            break;
        default:
            throw new ClientErrorException("Invalid endpoint", 404);
            break;
    }
} catch (ClientErrorException $e) { //catch client errors
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
}

$response = $endpoint->getContent(); //get response from endpoint
echo json_encode($response); //encode response as json
