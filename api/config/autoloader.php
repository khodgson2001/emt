<?php
/**
 * Autoloader
 * 
 * This file is used to autoload classes, files should be in the src folder and named the same as the class
 */
function autoloader($className) {
    $filename = "src\\" . strtolower($className) . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        exit("File not found: " . $className . " (" . $filename . ")");
    }
    
}

spl_autoload_register("autoloader");


