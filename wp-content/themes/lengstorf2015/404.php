<?php
/**
 * The Template for displaying all single posts
 *
 * @package     WordPress
 * @subpackage  Hoverboard
 * @since       0.1.0
 */

get_header();

$subject_line = 'Broken Link on ' . get_bloginfo('name');
$referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'N/A';
$body = 'Broken Link: ' 
      . "http://" . $_SERVER['HTTP_HOST']  . $_SERVER['REQUEST_URI'] 
      . '%0D%0A' // Line break
      . 'Referrer: ' . $referrer
      . '%0D%0A%0D%0A' // Line break
      . 'Additional Notes (optional): ';

?>

    <article class="main-content">
        <h1 class="main-content__headline--page">
            Looks Like You've Found a Dead Link
        </h1>
        <div class="main-content__content">
            <p>
                The link you&rsquo;ve requested has changed, moved, or no longer 
                exists. If you&rsquo;re feeling helpful, please 
                <a href="mailto:<?php bloginfo('admin_email'); ?>?subject=<?php echo $subject_line; ?>&body=<?php echo $body; ?>">send a 
                    heads up</a>.
            </p>
            <p>
                <a href="<?php echo home_url('/'); ?>">Back to the home page.</a>
            </p>
        </div>
    </article>
<?php 

get_footer();
