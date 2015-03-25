<?php
/**
 * The Template for displaying all single posts
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

get_header();

while (have_posts()):
    the_post();

    if (function_exists('yoast_breadcrumb')) {
        $breadcrumbs = yoast_breadcrumb('<p id="breadcrumbs">','</p>', FALSE);
    } else {
        $breadcrumbs = NULL;
    }

    // Grabs the featured image URL
    $img_id = get_post_thumbnail_id();
    $img_arr = wp_get_attachment_image_src($img_id, 'blog-meta');
    $img_src = $img_arr[0];
    $img_alt = get_the_title();

    // For related posts
    $related_post_id   = get_the_ID();
    $related_post_cats = wp_get_post_categories(get_the_ID(), array('number'=>1));

?>

    <article class="main-content">
        <div class="main-content__breadcrumbs">
            <?= $breadcrumbs ?> 
        </div>
        <h1 class="main-content__headline--single"
            data-image="<?= $img_src ?>">
            <?php the_title(); ?> 
        </h1>
        <div class="main-content__meta">
            <img src="<?= $img_src ?>"
                 alt="<?= $img_alt ?>"
                 class="alignleft featured-image">
            <div class="main-content__excerpt"><?php the_excerpt(); ?></div>
            <ul class="main-content__categories"><li><?php the_category('</li><li>'); ?></li></ul>
            <?php the_tags('<ul class="main-content__tags"><li>', '</li><li>', '</li></ul>'); ?> 
            <div class="main-content__sharing">
                <a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>"
                   class="main-content__sharing-link facebook">
                    <span class="sr-only">Share on Facebook</span>
                </a>
                <a href="http://twitter.com/share?text=<?php the_title(); ?>&amp;url=<?php the_permalink(); ?>&amp;via=jlengstorf&amp;hashtags=<?= $tw_config['hashtag'] ?>"
                   class="main-content__sharing-link twitter">
                    <span class="sr-only">Share on Twitter</span>
                </a>
                <a href="https://plus.google.com/share?url=<?php the_permalink(); ?>"
                   class="main-content__sharing-link googleplus">
                    <span class="sr-only">Share on Google Plus</span>
                </a>
            </div>
        </div>
        <div class="main-content__content">

<?php

the_content();

if (get_field('show_post_cta')!==false) {
    echo do_shortcode('[endofpost]');
}

?>
        </div>
        <div class="main-content__meta--bottom">
            <div class="main-content__sharing">
                <a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>"
                   class="main-content__sharing-link facebook">
                    <span class="sr-only">Share on Facebook</span>
                </a>
                <a href="http://twitter.com/share?text=<?php the_title(); ?>&amp;url=<?php the_permalink(); ?>&amp;via=jlengstorf&amp;hashtags=<?= $tw_config['hashtag'] ?>"
                   class="main-content__sharing-link twitter">
                    <span class="sr-only">Share on Twitter</span>
                </a>
                <a href="https://plus.google.com/share?url=<?php the_permalink(); ?>"
                   class="main-content__sharing-link googleplus">
                    <span class="sr-only">Share on Google Plus</span>
                </a>
            </div>
<?php

if (get_field('discussion_link')):

?>
            <div class="main-content__discussion">
                <a href="<?php the_field('discussion_link'); ?>"
                   title="Comments on <?php the_title(); ?>">
                    Discuss This Post
                </a>
            </div>
<?php

endif;

?>
        </div>
<?php get_template_part('layouts/related-posts'); ?>
    </article>
<?php

endwhile;

get_footer();
