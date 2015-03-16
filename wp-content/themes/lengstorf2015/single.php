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

    // Adds image attributes for the featured image
    $img_attr = array(
        'class' => 'alignleft featured-image',
        'alt' => get_the_title()
    );

?>

    <div class="main-content">
        <div class="main-content__breadcrumbs">
            <?= $breadcrumbs ?> 
        </div>
        <h1 class="main-content__headline">
            <?php the_title(); ?> 
        </h1>
        <div class="main-content__meta">
            <?php the_post_thumbnail('small', $img_attr); ?> 
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

if (get_field('discussion_link')):

?>
            <p id="discussion">
                <strong>Let&rsquo;s talk.</strong>
                Join the <a href="<?php the_field('discussion_link'); ?>">discussion about this post</a>.
            </p>
<?php

endif;

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
        </div>
    </div>
<?php 

endwhile;

get_footer();
