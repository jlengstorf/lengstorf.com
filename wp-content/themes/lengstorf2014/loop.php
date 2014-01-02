<?php
/**
 * The loop that displays posts.
 *
 * The loop displays the posts and the post content.  See
 * http://codex.wordpress.org/The_Loop to understand it and
 * http://codex.wordpress.org/Template_Tags to understand
 * the tags used in it.
 *
 * This can be overridden in child themes with loop.php or
 * loop-template.php, where 'template' is the loop context
 * requested by a template. For example, loop-index.php would
 * be used if it exists and we ask for the loop with:
 * <code>get_template_part( 'loop', 'index' );</code>
 *
 * @package WordPress
 * @subpackage RotorWash
 * @since RotorWash 1.0
 */

/* If there are no posts to display, such as an empty archive page */
if (!have_posts()):

?>
    <article class="post">
        <h2>No Posts Here</h2>
        <p>
            Sorry, but there are no posts here. 
            <a href="<?php echo home_url('/'); ?>">Back to the home page.</a>
        </p>
    </article>
<?php

else:
    while (have_posts()):
        the_post();

        $link_title = sprintf(
            esc_attr('Permalink to %s'), 
            the_title_attribute('echo=0')
        );

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

        <h2>
            <a href="<?php the_permalink(); ?>" 
               title="<?php echo $link_title; ?>" 
               rel="bookmark"><?php the_title(); ?></a>
        </h2>

        <?php the_excerpt(); ?> 

    </article>
    <div id="post-image" class="col-md-2 col-md-pull-8 hidden-sm hidden-xs">
        <a href="<?php the_permalink(); ?>">
            <img src="<?php echo $image_path; ?>"
                 alt="<?php the_title(); ?>"
                 class="<?php echo $image_class; ?>">
        </a>
    </div>
<?php

    endwhile;
endif;

// Displays pagination nav when applicable
if ($wp_query->max_num_pages>1):
?>
    <div class="col-md-8 col-md-offset-2 text-center">
        <?php rw_pagination(); ?> 
    </div>
<?php
endif;
