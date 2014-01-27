<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage RotorWash
 * @since RotorWash 1.0
 */

get_header();
get_template_part('common/main-column', 'top');

$category_format = 'Posts About %s';
$category_title  = sprintf($category_format, single_cat_title('', FALSE));

?>
        <h1><?php echo $category_title; ?></h1>
<?php

$category_description = category_description();
if (!empty($category_description)) {
    echo $category_description;
}

get_template_part('loop', 'category');

get_template_part('common/main-column', 'bottom');
get_footer();
