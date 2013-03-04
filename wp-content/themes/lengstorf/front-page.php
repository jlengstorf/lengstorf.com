<?php

get_header();

$img_dir   = get_bloginfo('stylesheet_directory') . '/assets/images';
$art_array = array(
    array(
        'src' => 'bunnicorn',
        'alt' => 'Look! A bunnicorn!',
    ),
    array(
        'src' => 'lindawendy',
        'alt' => 'My mom and her pal Linda.',
    ),
    array(
        'src' => 'narwhal',
        'alt' => 'A narwhal who yearned for adventure.',
    ),
    array(
        'src' => 'tortuga',
        'alt' => 'Somehow turtles just seem grumpy.',
    ),
    array(
        'src' => 'tyrone',
        'alt' => 'His manner was a little... tyrannical.',
    ),
);

$artwork = array_slice($art_array, mt_rand(0, count($art_array)-1), 1);

if (have_posts()):
    while (have_posts()):
        the_post();

?> 

        <article class="home-blurb">
            <?php the_content(); ?> 
            <a href="http://www.reddit.com/r/portland"
               id="portland-or" rel="external">
               <img src="<?php echo $img_dir; ?>/portland-or.png" 
                    alt="Portland, OR" />
            </a><!--/#portland-or-->
        </article><!--/.home-blurb-->

        <ul id="my-stuff">
            <li class="copter-link">
                <h3>I run <span title="Copter Labs">this</span></h3>
                <p>
                    <a href="http://www.copterlabs.com?ref=jlcom">
                        <img src="<?php echo $img_dir; ?>/copter-labs.png" 
                             alt="Copter Labs" />
                    </a>
                </p>
            </li><!--/.copter-link-->
            <li class="random-art">
                <h3>I made this</h3>
                <a href="http://dribbble.com/jlengstorf"
                   rel="external">
                    <img src="<?php echo $img_dir . '/art-' . $artwork[0]['src'] . '.jpg'; ?>" 
                         alt="<?php echo $artwork[0]['alt']; ?>" />
                </a>
            </li><!--/.random-art-->
            <li class="book-links">
                <h3>I wrote these</h3>
                <ul>
                    <li>
                        <a href="http://www.amazon.com/gp/product/1430224738/ref=as_li_ss_tl?ie=UTF8&tag=copterlabs-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1430224738"
                           class="book-pfab" rel="external">
                            <img src="<?php echo $img_dir; ?>/book-pfab.jpg" 
                                 alt="PHP for Absolute Beginners" />
                        </a>
                    </li>
                    <li>
                        <a href="http://www.amazon.com/gp/product/1430228474/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1430228474&linkCode=as2&tag=copterlabs-20"
                           class="book-ppaj" rel="external">
                            <img src="<?php echo $img_dir; ?>/book-ppaj.jpg" 
                                 alt="Pro PHP and jQuery" />
                        </a>
                    </li>
                    <li>
                        <a href="http://www.amazon.com/gp/product/1430246200/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1430246200&linkCode=as2&tag=copterlabs-20"
                           class="book-rtwa" rel="external">
                            <img src="<?php echo $img_dir; ?>/book-rtwa.jpg" 
                                 alt="Realtime Web Apps: HTML5 WebSocket, Pusher, and the Web&#146;s Next Big Thing" />
                        </a>
                    </li>
                </ul>
            </li><!--/.book-links-->
        </ul><!--/#my-stuff-->

<?php

        endwhile;
    endif;

get_footer();
