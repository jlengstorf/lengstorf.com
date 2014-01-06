<?php
/**
 * The template for displaying the footer.
 *
 * @package WordPress
 * @subpackage RotorWash
 * @since RotorWash 1.0
 */

// Sets up defaults for the nav
$nav_config = array(
    'theme_location'  => 'footer',
    'container'       => NULL,
    'menu_class'      => 'col-md-6 list-inline text-center',
    'fallback_cb'     => 'wp_page_menu',
    'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
    'depth'           => 0,
    'echo'            => FALSE,
);

if (has_nav_menu('primary')) {
    $footer_nav = wp_nav_menu($nav_config);
} else {
    $footer_nav = '<ul class="nav navbar-nav"><li><a href="wp-admin/nav-menus.php">Create your menu.</a></li></ul>';
}

$title = esc_attr(get_bloginfo('name')) . ' &mdash; '
       . esc_attr(get_bloginfo('description'));

$site_credit = rw_footer_credit_link("Site by Copter Labs");

?>

</div>

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <ol id="footnotes">
        <?php foreach (Copter_Footnotes::$footnotes as $number => $footnote): ?>
                <li id="footnote-<?=$number?>" class="footnote">
                    <p>
                        <?=$footnote?> 
                        <a href="#note-<?=$number?>"
                           title="Keep reading from where you left off"
                           class="footnote-return">&#8617;</a>
                    </p>
                </li><!--/#footnote-<?=$number?>.footnote-->
        <?php endforeach; ?>
            </ol><!--/#footnotes-->
        </div>
    </div>
</div>

<footer id="site-credits" class="container">
    <div class="row">
        <p class="col-md-3 text-left">
            All content copyright &copy; 
            <a href="<?php echo home_url('/'); ?>" 
               title="<?php echo $title; ?>" 
               rel="home"><?php bloginfo('name', 'display'); ?></a>
        </p>
        <?php echo $footer_nav; ?> 
        <p class="col-md-3 text-right">
            <?php echo $site_credit; ?> 
        </p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
