

    <div class="footer-about">
        <div class="footer-about__image">
            <img src="<?= home_url('/wp-content/themes/lengstorf2015/assets/images/jason-lengstorf_footer-sm.jpg') ?>" 
                 alt="Jason Lengstorf — Author, Speaker, Digital Nomad">
        </div>
        <div class="footer-about__bio">
            <h2 class="footer-about__headline">
                I&rsquo;m Jason Lengstorf: an author, speaker, and digital nomad.
            </h2>
            <div class="footer-about__copy">
                <p>
                    I&rsquo;m also an Overkill Cult survivor.
                    In 2013 I was working 70&ndash;90 hours a week &mdash; it got 
                    so bad that patches of my beard started falling out. I needed to make some changes to my lifestyle before it killed me.
                </p>
                <p>
                    In 2014 I sold everything I owned and started traveling the 
                    world. I thought it would be hard, but it&rsquo;s been 
                    surprisingly easy to work remotely from places like Barcelona, 
                    London, and Chiang Mai.
                </p>
                <p>
                    What I'm doing is exciting, but I'm not special. <em>Anyone 
                    can do this.</em> If you've ever dreamed of working remotely and 
                    exploring the world, I want to help you make your dream a 
                    reality.
                </p>
            </div>
            <div class="footer-about__links">
                <a href="/remote-work-course/">Start Earning from Anywhere</a>
            </div>
        </div>
    </div>

<?php if (!empty(Copter_Footnotes::$md_footnotes) || !empty(Copter_Footnotes::$footnotes)): ?>
<div class="post-footnotes">
    <ol class="post-footnotes__list">
<?php

if (!empty(Copter_Footnotes::$md_footnotes)):
    echo Copter_Footnotes::$md_footnotes;
else:
    foreach (Copter_Footnotes::$footnotes as $number => $footnote):

?>
        <li id="footnote-<?=$number?>" class="post-footnotes__footnote">
            <p>
                <?=$footnote?> 
                <a href="#note-<?=$number?>"
                   title="Keep reading from where you left off"
                   class="post-footnotes__footnote-return">&#8617;</a>
            </p>
        </li>
<?php

    endforeach;
endif;

?>
    </ol>
</div>
<?php endif; ?>

    <footer class="footer">
        <ul class="footer__navigation">
            <li class="footer__site-nav">
                <a href="/about/">About</a>
                <a href="/blog/">Blog</a>
                <a href="/speaking/">Speaking</a>
                <a href="/contact/">Contact</a>
                <a href="/disclaimer/">Disclaimer</a>
            </li>
            <li class="footer__copyright">
                All content copyright &copy; 
                <a href="<?php echo home_url('/'); ?>" 
                   rel="home"><?php bloginfo('name', 'display'); ?></a>
            </li>
        </ul>
    </footer>

<?php wp_footer(); ?>
</body>
</html>
