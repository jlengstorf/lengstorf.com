<?php

/**
 * A loader to automatically initialize any included add-ons for the theme
 *
 * Add-ons must follow a naming convention to be automatically loaded:
 *  - plugin-name/plugin-name.php           (loaded)
 *  - plugin-name/index.php                 (loaded)
 *  - plugin-name/any-other-file-name.php   (NOT loaded)
 */

// Loads all directories in the includes directory
$dirs = glob(__DIR__.'/*', GLOB_ONLYDIR);

// Loops through each directory
foreach ($dirs as $dir) {
    $dirname = str_replace(__DIR__.'/', '', $dir);

    if (file_exists($dir . '/' . $dirname . '.php')) {
        require_once $dir . '/' . $dirname . '.php';
        // prebug($dir . '/' . $dirname . '.php');
    }

    if (file_exists($dir . '/index.php')) {
        require_once $dir . '/index.php';
        // prebug($dir . '/index.php');
    }
}
function prebug( $value ) {
    echo "<pre>", print_r($value, TRUE), "</pre>";
}
