<?php
/**
 * Functions and definitions for lengstorf.com
 *
 * Extends RotorWash where necessary to implement site-specific features.
 *
 * @package     WordPress
 * @subpackage  lengstorf.com
 * @since       1.0
 * @see         http://github.com/copterlabs/rotorwash.git
 */

/**
 * Initializes the theme
 * 
 * @return void
 * @since  1.0
 */
function jl_init(  )
{
    add_action('wp_enqueue_scripts', 'jl_enqueue_scripts');
}
add_action('after_setup_theme', 'jl_init');

/**
 * Enqueues scripts for the theme
 *
 * @return void
 * @since  1.0
 */
function jl_enqueue_scripts(  )
{
    // Removes unused scripts from RotorWash
    wp_deregister_script('jquery');
    wp_deregister_script('html5shiv');
    wp_dequeue_script('hoverIntent');
    wp_dequeue_script('dropdown');

    // Registers theme-specific scripts
    wp_register_script(
        'jquery',
        '//code.jquery.com/jquery-1.6.4.min.js',
        NULL,
        FALSE,
        FALSE
    );

    $scripts = 'https://s3-us-west-2.amazonaws.com/lengstorf.com/js/';
    wp_register_script(
        'colorbox',
        $scripts . 'colorbox/jquery.colorbox.js.gz',
        array('jquery'),
        '1.3.20.1',
        TRUE
    );
    wp_register_script(
        'instagram',
        $scripts . 'jquery.read-instagram-1.0.0.min.js.gz',
        array('jquery'),
        '1.0.0',
        TRUE
    );

    wp_enqueue_script(
        'init',
        $scripts . 'init.min.js.gz',
        array('jquery', 'colorbox', 'instagram'),
        '1.1',
        TRUE
    );

    wp_enqueue_style(
        'colorbox',
        $scripts . 'colorbox/colorbox.css.gz'
    );
}
