<?php

/**
 * Adds constants for accessing the assets directory by URI and filepath
 */
define('ASSETS_DIR',  get_stylesheet_directory_uri() . '/assets');
define('ASSETS_PATH', get_stylesheet_directory() . '/assets');

/**
 * THEME INITIALIZATION
 * --------------------
 * 
 * This function runs after the parent theme is setup.
 *
 * Use this function to hook anything that overwrites RotorWash. It's important 
 * that any actions that override or alter the parent theme are hooked to this 
 * action, because otherwise they won't work.
 *
 * Read more: 
 * - http://codex.wordpress.org/Plugin_API/Action_Reference/after_setup_theme
 * 
 * @return void
 */
function rwchild_setup_theme(  ) {
    /*
     * THEME SCRIPTS & STYLES
     *************************************************************************/
    add_action('wp_enqueue_scripts', 'rwchild_enqueue_assets');

    /**
     * INCLUDES CUSTOM FIELDS (PRODUCTION ONLY)
     *************************************************************************/
    require_once 'includes/custom-fields.php';

    /*
     * CUSTOM IMAGE SIZES
     * ------------------
     * Every image size used in the layout should have a custom image size 
     * associated with it. Set them here.
     *************************************************************************/
    //add_image_size( $name, $width = 0, $height = 0, $crop = false )
}
add_action('after_setup_theme', 'rwchild_setup_theme');

/**
 * Adds scripts and styles for the child theme
 * @return void
 */
function rwchild_enqueue_assets(  ) {
    /*
     * STYLESHEETS
     *************************************************************************/
    global $wp_styles;

    // Unhooks the RotorWash2 stylesheet
    wp_dequeue_style('rotorwash-main-styles');

    // Hooks up the child theme's stylesheet
    wp_enqueue_style(
        'theme-main-styles',
        ASSETS_DIR . '/css/main.css',
        array(),
        '1.0.0b' . filemtime(ASSETS_PATH . '/css/main.css')
    );

    // This is only necessary if an IE-specific stylesheet is required
    wp_register_style(
        'theme-ie-styles',
        ASSETS_DIR . '/css/ie.css',
        array(),
        '1.0.0b' . filemtime(ASSETS_PATH . '/css/ie.css')
    );

    // Adds a conditional tag
    $wp_styles->add_data('theme-ie-styles', 'conditional', 'lte IE 8');

    // Uncomment this to actually include the IE stylesheet
    wp_enqueue_style('theme-ie-styles');


    /*
     * SCRIPTS
     **************************************************************************/
    
    // If a theme JS file is built, include it
    if (is_readable(ASSETS_PATH . '/js/main.min.js')) {
        wp_enqueue_script('theme-js',
            ASSETS_DIR . '/js/main.min.js',
            array('jquery'),
            '1.0.0b' . filemtime(ASSETS_PATH . '/js/main.min.js'),
            TRUE
        );
    }
}

function additional_theme_styles()  
{ 
    wp_register_style( 'lte-ie8', ASSETS_DIR . '/assets/css/lte-ie8.css' );

    global $wp_styles;
    $wp_styles->add_data('lte-ie8', 'conditional', 'lte IE 8');

    // enqueing:
    wp_enqueue_style( 'screen'  );
    wp_enqueue_style( 'lte-ie8' );
}
