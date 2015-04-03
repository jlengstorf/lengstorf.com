<?php

/*
 * Template Name: Front Page Alt
 */

get_header();

?>

    <div class="hometown-hero--alt">
        <h1 class="hometown-hero__headline">
            You Can Work from
            <strong>Anywhere</strong>
            <em>I&rsquo;ll Show You How</em>
        </h1>
        <a href="<?= home_url('/remote-work-course/') ?>"
           class="hometown-hero__button">Get the Guide</a>
    </div>

    <div class="cta--alt">
        <h2 class="cta__headline">
            For
            <span class="days-abroad">months</span>
            I&rsquo;ve been traveling the world &amp; working remotely.
            <strong class="how-i-did-it">I want to show you how I did it.</strong>
            <em>(And how you can, too.)</em>
        </h2>
        <div class="cta__call break-free">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-work/') ?>">Break Free of the Cult.</a>
            </h3>
            <p class="cta__tagline">
                Learn how offices are run more like a cult than a 
                healthy workplace — and how to escape.
            </p>
        </div>
        <div class="cta__call know-options">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-productivity/') ?>">Know Your Options.</a>
            </h3>
            <p class="cta__tagline">
                See the dozens of options for anyone who  
                wants an alternative to the 40-hour lifestyle.
            </p>
        </div>
        <div class="cta__call permission">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/happiness/') ?>">Give Yourself Permission.</a>
            </h3>
            <p class="cta__tagline">
                Identify the forces holding you back from 
                what you want. (Hint: the worst one is you.)
            </p>
        </div>
        <div class="cta__call remove-anchors">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-work/') ?>">Remove Your Anchors.</a>
            </h3>
            <p class="cta__tagline">
                Learn the common traps we fall into that 
                anchor us in place — and how to remove them.
            </p>
        </div>
        <div class="cta__call action-plan">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-productivity/') ?>">Design an Action Plan.</a>
            </h3>
            <p class="cta__tagline">
                Put together a concrete, clear todo list and 
                prepare for your newly-upgraded lifestyle.
            </p>
        </div>
        <div class="cta__call begin-life">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/happiness/') ?>">Begin Your New Life.</a>
            </h3>
            <p class="cta__tagline">
                Take the first steps toward becoming happier,
                healthier, and location-independent.
            </p>
        </div>
        <a href="<?= home_url('/remote-work-course/') ?>"
           class="cta__button">Get the Free Guide</a>
    </div>

<?php

get_footer();
