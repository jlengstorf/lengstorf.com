<?php
/**
 * The template for displaying Category Archive pages
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

get_header();

$tag_format = 'Posts Tagged with &ldquo;%s&rdquo;';
$tag_title  = sprintf($tag_format, single_tag_title('', FALSE));
$tag_description = category_description();

?>
    <div class="main-content post-archive">
        <h1 class="main-content__archive-title"><?= $tag_title ?></h1>
<?php

if (!empty($tag_description)):

?>
        <p class="main-content__archive-description">
            <?= $tag_description ?> 
        </p>
<?php 

endif;

get_template_part('loop', 'tag');

?>
    </div>
<?php

get_footer();
