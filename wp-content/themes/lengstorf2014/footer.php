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

<?php if (is_single() || is_page()): ?>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-3">
            <ol id="footnotes">
<?php

if (!empty(Copter_Footnotes::$md_footnotes)):
    echo Copter_Footnotes::$md_footnotes;
else:
    foreach (Copter_Footnotes::$footnotes as $number => $footnote):

?>
                <li id="footnote-<?=$number?>" class="footnote">
                    <p>
                        <?=$footnote?> 
                        <a href="#note-<?=$number?>"
                           title="Keep reading from where you left off"
                           class="footnote-return">&#8617;</a>
                    </p>
                </li><!--/#footnote-<?=$number?>.footnote-->
<?php

    endforeach;
endif;

?>
            </ol><!--/#footnotes-->
        </div>
    </div>
</div>
<?php endif; ?>

<footer id="site-credits" class="container">
    <div class="row">
        <p class="col-md-3 text-left">
            All content copyright &copy; 
            <a href="<?php echo home_url('/'); ?>" 
               title="<?php echo $title; ?>" 
               rel="home">Jason Lengstorf</a>
        </p>
        <?php echo $footer_nav; ?> 
        <p class="col-md-3 text-right">
            <?php echo $site_credit; ?> 
        </p>
    </div>
</footer>

<?php wp_footer(); ?> 
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=220587498083499&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</body>
</html>
