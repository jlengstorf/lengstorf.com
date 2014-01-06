<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage RotorWash
 * @since RotorWash 1.0
 */

get_header();
get_template_part('common/main-column', 'post-top');

while (have_posts()):
    the_post();

    $tw_config = array(
        'via' => 'jlengstorf',
        'hashtag' => strip_tags(get_the_tag_list('', ',', '')),
        'text' => get_the_title(),
    );
    $gplus_config = array( 'width' => 60 );

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
        <div id="post-meta" 
             class="col-md-2 col-md-pull-10 hidden-sm hidden-xs">
            <img src="<?php echo $image_path; ?>"
                 alt="<?php the_title(); ?>"
                 class="<?php echo $image_class; ?>">
            <p>Posted in <?php the_category(' '); ?></p>
            <?php the_tags('<ul class="list-unstyled"><li>', '</li><li>', '</li></ul>'); ?> 
        </div>
        <article class="post col-md-8 col-md-offset-2">
            <?php the_content(); ?>

<?php if (get_field('discussion_link')): ?>
            <p id="discussion">
                <strong>Have something to add to the conversation?</strong>
                Join the <a href="<?php the_field('discussion_link'); ?>">discussion about this post</a> on Facebook.
            </p>
<?php endif; ?>
        </article>

        <ul class="col-md-2 list-inline">
            <?php echo rw2_social_facebook_btn(get_permalink()); ?>
            <?php echo rw2_social_gplus_btn(get_permalink(), $gplus_config); ?>
            <?php echo rw2_social_twitter_btn(get_permalink(), $tw_config); ?>
        </ul>

        <div id="author-bio" class="col-md-8 col-md-offset-2">
            <img src="<?php echo ASSETS_DIR; ?>/images/jason-lengstorf.jpg"
                 alt="Jason Lengstorf">
            <p>
                <strong>Jason Lengstorf</strong> spends the majority of his time solving hard problems at Copter Labs, and otherwise occupies himself with travel, Learning For Fun&trade; (current obsession: cocktails), and the pursuit of new adventures. He lives in Portland, OR.
            </p>
            <p class="author-meta">
                Connect: 
                <a href="http://facebook.com/jasonlengstorf">Facebook</a> | 
                <a href="http://twitter.com/jlengstorf">Twitter</a> | 
                <a href="https://plus.google.com/+jasonlengstorf">Google+</a>
            </p>
        </div>
<?php 

endwhile;

get_template_part('common/main-column', 'post-bottom');
get_footer();
