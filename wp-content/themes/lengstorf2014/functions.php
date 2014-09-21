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

    register_nav_menu('footer', 'Footer Menu');

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

function rw_continue_reading_link(  ) {
    return ' <a href="'. get_permalink() . '" class="more-link">Continue reading &rarr;</a>';
}

function rw_excerpt_more( $more ) {
    global $post;
    return ' &hellip; ' . rw_continue_reading_link();
}
add_filter('excerpt_more', 'rw_excerpt_more');

function responsive_embed($html, $url, $attr) {
    return $html!='' ? '<div class="embed-container">'.$html.'</div>' : '';
}
add_filter('embed_oembed_html', 'responsive_embed', 10, 3);

function shortcode_lead( $atts, $content ) {
    $clean = strip_tags($content, '<strong><em><a><span>');
    return '<p class="lead">' . $clean . '</p>';
}
add_shortcode('lead', 'shortcode_lead');

function shortcode_pullquote( $atts, $content ) {
    $clean = strip_tags($content, '<strong><em><a>');
    $cleaner = copter_remove_crappy_markup($content);
    if (!is_feed()) {
        return '<blockquote class="pullquote hidden-sm hidden-xs"><p>' . $cleaner . '</p></blockquote>';
    } else {
        return '';
    }
}
add_shortcode('pullquote', 'shortcode_pullquote');


/**
 * Removes mismatched </p> and <p> tags from the beginning and end of a snippet.
 * 
 * @author Jason Lengstorf <jason@copterlabs.com>
 */
function copter_remove_crappy_markup( $string )
{
    $patterns = array(
        '#^\s*</p>#',
        '#<p>\s*$#'
    );
 
    return preg_replace($patterns, '', $string);
}


/**
 * Adds footnote handling
 */

/*
 * Updated footnote handling (works with WP-Markdown/Markdown footnote syntax)
 */
function extract_markdown_footnotes( $content ) {
    // if (!is_single()) {
    //     return $content;
    // }

    // Grabs the <li> elements out of the footnotes
    $pattern = '#<div class="footnotes">\s*?<hr />\s*?<ol>\s*?(?P<footnotes>.*?)\s*?</ol>\s*?</div>#s';
    preg_match($pattern, $content, $matches);

    if (array_key_exists('footnotes', $matches)) {
        Copter_Footnotes::$md_footnotes = $matches['footnotes'];
    }

    // Removes the footnotes div
    $pattern = '#<div class="footnotes">(.*?)</div>#s';
    $content = preg_replace($pattern, '', $content);
    return $content;
}
add_filter('the_content', 'extract_markdown_footnotes');

function copter_shortcode_footnote( $atts, $content=NULL )
{
    $count = ++Copter_Footnotes::$count;
    Copter_Footnotes::$footnotes[$count] = $content;

    return '<sup><a href="#footnote-' . $count . '" '
            . 'id="note-' . $count . '" ' 
            . 'class="footnote">' 
            . $count . '</a></sup>';
}
add_shortcode('footnote', 'copter_shortcode_footnote');

class Copter_Footnotes
{
    public static $count = 0;
    public static $footnotes = array();
    public static $md_footnotes = NULL;
}
