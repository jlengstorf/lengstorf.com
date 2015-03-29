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

    // Grabs the featured image URL
    $img_id = get_post_thumbnail_id();
    $img_arr = wp_get_attachment_image_src($img_id, 'full');
    $img_src = $img_arr[0];
    $img_alt = get_the_title();

?>

    <article class="main-content">
        <h1 class="main-content__headline--page"
            data-image="<?= $img_src ?>">
            <?php the_title(); ?> 
        </h1>
        <div class="main-content__content">
            <img src="<?= $img_src ?>"
                 alt="<?= $img_alt ?>"
                 class="alignleft">

<?php

the_content();

if (get_field('discussion_link')):

?>
            <h2>What to Do Next</h2>
            <p>
                Text-based call to action will go here. Make sure it's good.
            </p>
            <h3>Add Your Thoughts</h3>
            <p id="discussion">
                What did I get right in this post? What did I get wrong?
                Join the <a href="<?php the_field('discussion_link'); ?>">discussion about this post</a> and share your thoughts!
            </p>
<?php

endif;

?>
        </div>
    </article>
<?php 

endwhile;

get_footer();
