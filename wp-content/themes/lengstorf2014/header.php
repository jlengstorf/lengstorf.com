<?php

// Sets a title for the site's home link
$title = esc_attr(get_bloginfo('name')) . ' &mdash; '
       . esc_attr(get_bloginfo('description'));

// Sets up defaults for the nav
$nav_config = array(
    'theme_location'  => 'primary',
    'container'       => 'div',
    'container_class' => 'collapse navbar-collapse navbar-right main-nav',
    'menu_class'      => 'nav navbar-nav',
    'fallback_cb'     => 'wp_page_menu',
    'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
    'depth'           => 0,
    'echo'            => FALSE,
);

if (has_nav_menu('primary')) {
    $nav = wp_nav_menu($nav_config);
} else {
    $nav = '<ul class="nav navbar-nav"><li><a href="wp-admin/nav-menus.php">Create your menu.</a></li></ul>';
}

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title><?php wp_title('&rsaquo;'); ?></title>

<link rel="stylesheet" type="text/css" href="//cloud.typography.com/6102252/625342/css/fonts.css" />

<?php if (is_single()): ?>
<!-- Facebook Conversion Code for Blog Reads -->
<script>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', '6020292706002', {'value':'0.00','currency':'USD'}]);
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6020292706002&amp;cd[value]=0.00&amp;cd[currency]=USD&amp;noscript=1" /></noscript>
<?php endif; ?>

<?php wp_head(); ?>

</head>

<body>

    <header>
        <div class="container">
            <div class="row">
                <nav class="navbar navbar-default" role="navigation">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".main-nav">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" 
                           href="<?php echo home_url('/'); ?>" 
                           title="<?php echo $title; ?>" 
                           rel="home">Solving Hard Problems <em>with Jason Lengstorf</em></a>
                    </div>
                    <?php echo $nav; ?> 
                </nav>
            </div>
        </div>
    </header>

    <div id="rw-content-wrapper" class="<?=rw_get_wrapper_class()?>">
