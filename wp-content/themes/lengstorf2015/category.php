<?php
/**
 * The template for displaying Category Archive pages
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

get_header();

$category_format = 'On %s';
$category_title  = sprintf($category_format, single_cat_title('', FALSE));
$category_description = category_description();

?>
    <div class="main-content post-archive">
        <h1 class="main-content__archive-title"><?= $category_title; ?></h1>
<?php

if (!empty($category_description)):

?>
        <p class="main-content__archive-description">
            <?= $category_description ?> 
        </p>
<?php 

endif;

get_template_part('loop', 'category');

?>
    </div>
<?php

get_footer();
