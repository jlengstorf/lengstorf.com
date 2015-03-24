<?php

global $related_post_id;
global $related_post_cats;

$args = array(
    'posts_per_page' => 2,
);

if (isset($related_post_id)) {
    $args['post__not_in'] = (array) $related_post_id;
}

if (is_array($related_post_cats)) {
    $args['category__in'] = (array) $related_post_cats;
}

$posts = get_posts($args);

?>
    <div class="related-posts">
        <h2 class="related-posts__headline">What to Read Next</h2>
<?php 

foreach ($posts as $post):
    setup_postdata($post);

    // Grabs the featured image URL
    $img_id = get_post_thumbnail_id();
    $img_arr = wp_get_attachment_image_src($img_id, 'blog-meta');
    $img_src = $img_arr[0];
    $img_alt = get_the_title();

    $url = get_permalink();
    $src = sanitize_title(get_the_title($related_post_id));
    $gat = $url . '?utm_source=' . $src . '&amp;utm_medium=%s&amp;utm_campaign=related-posts';

?>
        <article class="blog-preview--related">
            <h3 class="main-content__headline--related"
                data-image="<?= $img_src ?>">
                <a href="<?php printf($gat, 'headline'); ?>"><?php the_title(); ?></a>
            </h3>
            <div class="main-content__meta">
                <a href="<?php printf($gat, 'image'); ?>">
                    <img src="<?= $img_src ?>"
                         alt="<?= $img_alt ?>"
                         class="alignleft featured-image">
                </a>
                <div class="main-content__excerpt"><?php the_excerpt(); ?></div>
                <ul class="main-content__categories"><li><?php the_category('</li><li>'); ?></li></ul>
                <?php the_tags('<ul class="main-content__tags"><li>', '</li><li>', '</li></ul>'); ?> 
                <a href="<?php printf($gat, 'read-more'); ?>" class="blog-preview__read-more">Read this post</a>
            </div>
        </article>
<?php

    wp_reset_postdata();
endforeach;

?>
    </div>