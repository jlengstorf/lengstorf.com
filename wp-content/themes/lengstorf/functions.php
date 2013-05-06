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
    wp_register_script(
        'colorbox',
        CHILD_TEMPLATE_URL . '/assets/scripts/colorbox/jquery.colorbox.js',
        array('jquery'),
        '1.3.20.1',
        TRUE
    );
    wp_register_script(
        'instagram',
        CHILD_TEMPLATE_URL . '/assets/scripts/jquery.read-instagram.js',
        array('jquery'),
        '1.0.0',
        TRUE
    );

    wp_enqueue_script(
        'init',
        CHILD_TEMPLATE_URL . '/assets/scripts/init-ck.js',
        array('jquery', 'colorbox', 'instagram'),
        '1.0',
        TRUE
    );

    wp_enqueue_style(
        'colorbox',
        CHILD_TEMPLATE_URL . '/assets/scripts/colorbox/colorbox.css'
    );
}
