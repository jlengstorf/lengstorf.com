<?php

if (have_posts()):
    while (have_posts()):
        the_post();

        // Grabs the featured image URL
        $img_id = get_post_thumbnail_id();
        $img_arr = wp_get_attachment_image_src($img_id, 'blog-meta');
        $img_src = $img_arr[0];
        $img_alt = get_the_title();

?>
        <article class="blog-preview">
            <h2 class="main-content__headline"
                data-image="<?= $img_src ?>">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h2>
            <div class="main-content__meta">
                <a href="<?php the_permalink(); ?>">
                    <img src="<?= $img_src ?>"
                         alt="<?= $img_alt ?>"
                         class="alignleft featured-image">
                </a>
                <div class="main-content__excerpt"><?php the_excerpt(); ?></div>
                <ul class="main-content__categories"><li><?php the_category('</li><li>'); ?></li></ul>
                <?php the_tags('<ul class="main-content__tags"><li>', '</li><li>', '</li></ul>'); ?> 
                <a href="<?php the_permalink(); ?>" class="blog-preview__read-more">Read this post</a>
            </div>
        </article>
<?php

    endwhile;
endif;

// Displays pagination nav when applicable
if ($wp_query->max_num_pages>1) {
    Hoverboard::pagination('center', 2);
}
