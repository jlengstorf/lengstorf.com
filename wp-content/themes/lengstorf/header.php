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

header("Cache-Control: max-age=2592000, public");
header("Expires: Mon, 01 Jan 2024 00:00:00 GMT");

$theme_dir = get_bloginfo('stylesheet_directory');
$stylesheet_url = get_bloginfo('stylesheet_url') . '?' 
                . filemtime(get_stylesheet_directory() . '/style.css');

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="<?php bloginfo('charset'); ?>" />
<meta http-equiv="Cache-Control" 

<!-- Mobile stuffs -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title><?php wp_title('&rsaquo;', TRUE, 'right'); ?></title>

<link rel="stylesheet" type="text/css" 
      href="https://s3-us-west-2.amazonaws.com/lengstorf.com/css/style.css.gz" />

<link rel="shortcut icon" 
      href="https://s3-us-west-2.amazonaws.com/lengstorf.com/img/favicon.ico" />

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

