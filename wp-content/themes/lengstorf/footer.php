<?php
/**
 * The template for displaying the footer.
 *
 * @package    WordPress
 * @subpackage lengstorf.com
 * @since      1.0
 */

$tagline = esc_attr(get_bloginfo('name', 'display')) 
         . ' &mdash; ' 
         . esc_attr(get_bloginfo('description'));

$opts = get_option('rw_theme_settings');
$href = !empty($opts['fb_page_url']) ? $opts['fb_page_url'] : get_site_url();

?>

        <section id="social-stuff">

            <h3 id="twitter-icon" class="sprite-me">Jason on Twitter</h3>

            <ul id="twitter">
                <li>
                    I checked in at Barista on #Yelp http://t.co/GASeNEai
                </li>
                <li>
                    Breaking the "don't sit on the same side of the booth" 
                    rule so we can see the game. (@ Henry's 12th Street 
                    Tavern) http://t.co/2lDOH4Ob
                </li>
                <li>
                    I love Saturdays because BISCUITS. (@ Compote) on #Yelp 
                    http://t.co/dHRVOQCM
                </li>
            </ul><!--/#twitter-->

            <h3 id="instagram-icon" class="sprite-me">Jason on Instagram</h3>
            <ul id="instagram">
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://placekitten.com/75/75"
                             alt="Temporary Image" />
                    </a>
                </li>
            </ul><!--/#instagram-->

        </section><!--/.social-stuff-->

    </section>

    <footer id="site-credits">
        <div class="footer-left">
            All content copyright &copy; 
            <a href="<?php echo home_url('/'); ?>" 
               title="<?php echo $tagline; ?>" 
               class="copyright"
               rel="home"><?php bloginfo('name', 'display'); ?></a>

            <div class="fb-like" 
                 data-href="<?=$href?>" 
                 data-send="false" 
                 data-layout="button_count" 
                 data-width="90" 
                 data-show-faces="false"></div>
        </div><!--/.footer-left-->

        <div class="footer-right">
            Links: 
            <a href="http://www.copterlabs.com/"
               rel="me">Hire Me</a>
            | <a href="http://www.linkedin.com/in/jlengstorf"
               rel="me">LinkedIn</a>
            | <a href="https://www.facebook.com/jasonlengstorf"
               rel="me">Facebook</a>
            | <a href="http://twitter.com/jlengstorf"
               rel="me">Twitter</a>
            | <a href="http://open.spotify.com/user/jlengstorf"
               rel="me">Spotify</a>
            | <a href="https://github.com/jlengstorf"
               rel="me">GitHub</a>
            | <a href="http://jlengstorf.yelp.com/"
               rel="me">Yelp</a>
        </div><!--/.footer-right-->
    </footer>

<?php wp_footer(); ?> 
</body>
</html>
