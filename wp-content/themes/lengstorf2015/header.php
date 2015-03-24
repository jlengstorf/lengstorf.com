<?php
/**
 * The default header template
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

// Sets a title for the site's home link
$title = esc_attr(get_bloginfo('name')) . ' &mdash; '
       . esc_attr(get_bloginfo('description'));

/* 
 * To override defaults, pass wp_nav_menu config options to this method as an array
 * For config options, see http://codex.wordpress.org/Function_Reference/wp_nav_menu
 */
$config = array('menu_class' => 'nav navbar-nav navbar-right');
$nav = Hoverboard::get_nav_menu($config);

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#fcf8f3">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="theme-color" content="#fcf8f3">

<title><?php wp_title('&rsaquo;'); ?></title>

<?php wp_head(); ?> 

<?php if (is_user_logged_in()): ?>
<style type="text/css">
.site-header {
    top: 32px;
}
@media screen and ( max-width: 782px ) {
    .site-header { top: 46px; }
}
</style>
<?php endif; ?>

</head>

<body class="<?= Hoverboard::get_wrapper_class() ?>">

    <header class="site-header">
        <a href="<?= home_url('/') ?>"
           class="site-header__brand"
           title="Work from Anywhere — Jason Lengstorf"
           rel="home">Jason Lengstorf</a>
        <nav class="site-header__navigation" role="navigation">
            <ul class="site-header__main-nav">
                <li><a href="/about/" class="site-header__nav-item">Start Here</a></li>
                <li><a href="/blog/" class="site-header__nav-item">Blog</a></li>
                <li>
                    <a href="#" class="site-header__nav-item subnav-toggle"
                       aria-haspopup="true">More</a>
                </li>
            </ul>
            <ul class="site-header__secondary-nav" 
                aria-hidden="true" aria-label="submenu">
                <li><a href="/category/digital-nomadism/" class="site-header__secondary-nav-item">Digital Nomadism 101</a></li>
                <li><a href="/category/remote-productivity/" class="site-header__secondary-nav-item">Remote Productivity Tips</a></li>
                <li><a href="/category/happiness-practice/" class="site-header__secondary-nav-item">Happiness Practice</a></li>
                <li><a href="/blog/" class="site-header__secondary-nav-item">Blog</a></li>
                <li><a href="/about/" class="site-header__secondary-nav-item">About Jason</a></li>
                <li><a href="/speaking/" class="site-header__secondary-nav-item">Speaking</a></li>
                <li><a href="/contact/" class="site-header__secondary-nav-item">Contact</a></li>
                <li class="search-form">
                    <form role="form" method="GET" action="/"
                          class="menu-search">
                        <label for="search" 
                               class="menu-search__label">Search the Site</label>
                        <input type="search" class="menu-search__input" id="search" name="s">
                        <button class="menu-search__submit" type="submit">Search</button>
                        <input type="hidden" name="post_type" value="post">
                    </form>
                </li>
                <li class="social-media facebook">
                    <a href="https://facebook.com/jlengstorf" 
                       class="site-header__secondary-nav-item">
                        <span class="sr-only">Facebook</span>
                    </a>
                </li>
                <li class="social-media twitter">
                    <a href="https://twitter.com/jlengstorf" 
                       class="site-header__secondary-nav-item">
                        <span class="sr-only">Twitter</span>
                    </a>
                </li>
                <li class="social-media instagram">
                    <a href="https://instagram.com/jlengstorf" 
                       class="site-header__secondary-nav-item">
                        <span class="sr-only">Instagram</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
