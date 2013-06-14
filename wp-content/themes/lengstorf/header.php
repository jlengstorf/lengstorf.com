<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and the header
 *
 * @package    WordPress
 * @subpackage lengstorf.com
 * @since      1.0
 */

$theme_dir = get_bloginfo('stylesheet_directory');
$stylesheet_url = get_bloginfo('stylesheet_url') . '?' 
                . filemtime(get_stylesheet_directory() . '/style.css');

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="<?php bloginfo('charset'); ?>" />

<!-- Mobile stuffs -->
<meta name="viewport" 
      content="width=device-width; initial-scale=1.0; minimum-scale=1; maximum-scale=1.0; user-scalable=0;" />

<title><?php wp_title('&rsaquo;', TRUE, 'right'); ?></title>

<link type="text/css" rel="stylesheet" 
      href="http://fast.fonts.com/cssapi/c265c53b-e4e5-4941-9e4e-931e0009df73.css" />
<link rel="stylesheet" type="text/css" 
      href="https://s3-us-west-2.amazonaws.com/lengstorf.com/css/style.css" />

<?php wp_head(); ?> 
</head>

<body <?php body_class(); ?>>

    <header>

        <a href="<?php echo home_url('/'); ?>"
           id="floating-head" rel="home" 
           title="<?php bloginfo('name'); ?> &mdash; <?php bloginfo('description'); ?>">
            <img src="https://s3-us-west-2.amazonaws.com/lengstorf.com/img/floating-head.png" 
                 alt="Jason Lengstorf" />
        </a><!--/#floating-head-->

        <a href="<?php echo home_url('/'); ?>"
           id="site-title" rel="home">
            <?php bloginfo('name'); ?> 
        </a><!--/#site-title-->

        <p id="site-tagline">
            <?php bloginfo('description'); ?> 
        </p><!--/#site-tagline-->

        <?php rw_social_links(); ?> 

    </header>

    <section id="content-wrapper">

