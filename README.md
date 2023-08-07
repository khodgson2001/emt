# EMT - Final Year Project
This is a continuation of the final project for my Northumbria University Web Dev course.

The application is a digitisation of a forms system used by a local healthcare provider who conducts clinical vaccination trials. The app comes in two parts, **the front-end application**, and **the API**. 

## Front-End Application 
The application is built using React.js, as such node.js needs to be installed for you to run this. 

You'll also need to create a .env file in the root of the app folder. The .env file contians all secrets for the front-end, and should be formatted as follows:
### .env File
```
REACT_APP_API_LINK=[LINK GOES HERE]
```

## API
The API is built using PHP.

You'll need to create a secrets.php file, this will go in the root of the API folder.

### secrets.php File
```
<?php

define('SECRET', ''); //secret key for JWT

define('DB_HOST', ''); //database host
define('DB_NAME', ''); //database name
define('DB_USERNAME', ''); //database username
define('DB_PASSWORD', ''); //database password


define('MAILGUN_URL', ''); // mailgun server link
define('MAILGUN_KEY', ''); // api key for mailgun

?>
```
