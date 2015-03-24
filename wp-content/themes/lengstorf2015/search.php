<?php
/**
 * The template for displaying search results
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

get_header();

if (have_posts()) {
    $template = 'Showing search results for &ldquo;%s&rdquo;.';
} else {
    $template = 'No search results for &ldquo;%s&rdquo;. Please try again.';
}

?>
    <div class="main-content post-archive">
        <h1 class="main-content__archive-title">
            <?php printf($template, get_search_query()); ?> 
        </h1>
<?php

get_template_part('loop', 'search');

?>
    </div>
<?php

get_footer();
