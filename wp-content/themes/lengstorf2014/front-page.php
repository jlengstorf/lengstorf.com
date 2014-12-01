<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the wordpress construct of pages
 * and that other 'pages' on your wordpress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage RotorWash
 * @since RotorWash 1.0
 */

get_header();
get_template_part('common/main-column', 'post-top');

if( have_posts() ):
    while( have_posts() ):
        the_post();

        // Grabs the featured image
        $attachment_id = get_post_thumbnail_id();
        $has_image = !empty($attachment_id) ? TRUE : FALSE;

        if ($has_image) {
            $image_src = wp_get_attachment_image_src($attachment_id, 'thumbnail');
            $image_path = $image_src[0];
            $image_class = 'img-circle';
        } else {
            $image_path = ASSETS_DIR . '/images/jason-lengstorf.jpg';
            $image_class = NULL;
        }

?>
        <div class="col-md-10 col-md-push-2">
            <h1><?php the_title(); ?></h1>
        </div>
        <div id="featured-image"
             class="col-md-2 col-md-pull-10 hidden-sm hidden-xs">
            <img src="<?php echo $image_path; ?>"
                 alt="Jason Lengstorf"
                 class="<?php echo $image_class; ?>">
        </div>

        <article class="col-md-8 col-md-offset-2">
            <?php the_content(); ?> 
        </article>
<?php 

    endwhile;
endif;

// Load recent posts
$recent_posts = get_posts('posts_per_page=3');
foreach ($recent_posts as $post):
    setup_postdata($post);

    // Grabs the featured image
    $attachment_id = get_post_thumbnail_id();
    $has_image = !empty($attachment_id) ? TRUE : FALSE;

    if ($has_image) {
        $image_src = wp_get_attachment_image_src($attachment_id, 'thumbnail');
        $image_path = $image_src[0];
        $image_class = 'img-circle';
    } else {
        $image_path = ASSETS_DIR . '/images/jason-lengstorf.jpg';
        $image_class = NULL;
    }

?>
    <article class="post preview col-md-8 col-md-push-2">

        <h3>
            <a href="<?php the_permalink(); ?>" 
               rel="bookmark"><?php the_title(); ?></a>
        </h3>

        <?php the_excerpt(); ?> 

    </article>
    <div id="post-image" class="col-md-2 col-md-pull-8 hidden-sm hidden-xs">
        <img src="<?php echo $image_path; ?>"
             alt="<?php the_title(); ?>"
             class="<?php echo $image_class; ?>">
    </div>
<?php

    wp_reset_postdata();
endforeach;

?>
    <div id="blog-link" class="col-md-8 col-md-offset-2">
        <p class="text-right">
            <a href="/blog/">Read more blog posts &rarr;</a>
        </p>
    </div>
<?php

get_template_part('common/main-column', 'post-bottom');
get_footer();
