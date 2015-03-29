<?php

get_header();

?>

    <div class="hometown-hero">
        <h1 class="hometown-hero__headline">
            I&rsquo;ve spent the last
            <strong class="days-abroad">few months</strong>
            <em>
                traveling the world<br>
                &amp; working remotely.
            </em>
            I want to show you
            <strong class="how-i-did-it">how I did it.</strong>
            <em>(And how you can, too.)</em>
        </h1>
        <form action=""
              class="hometown-hero__opt-in">
            <label for="email" 
                   class="hometown-hero__opt-in-label">Email Address</label>
            <input type="email" class="hometown-hero__opt-in-input" id="email">
            <button class="hometown-hero__opt-in-submit">Get the Guide</button>
        </form>
    </div>

    <div class="cta">
        <h2 class="cta__headline">
            Stop thinking about the way you wish life could be.
            <strong>Start living your dream life today.</strong>
        </h2>
        <div class="cta__call work-remotely">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-work/') ?>">Work from Anywhere.</a>
            </h3>
            <p class="cta__tagline">
                You can already make your living online. Why not do it from 
                somewhere you&rsquo;ve always wanted to visit?
            </p>
            <a href="<?= home_url('/remote-work/') ?>" class="cta__link">Start Working from Anywhere</a>
        </div>
        <div class="cta__call remote-productivity">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/remote-productivity/') ?>">Get More Done Faster.</a>
            </h3>
            <p class="cta__tagline">
                What good is traveling if you don&rsquo;t get out 
                and explore? Work smart. Finish early. Go adventure.
            </p>
            <a href="<?= home_url('/remote-productivity/') ?>" class="cta__link">Get Remote Productivity Tips</a>
        </div>
        <div class="cta__call happiness-101">
            <h3 class="cta__subhead">
                <a href="<?= home_url('/happiness/') ?>">Truly Enjoy Your Life.</a>
            </h3>
            <p class="cta__tagline">
                Life isn&rsquo;t worth much if we spend all our time miserable.
                Find your smile again and live well.
            </p>
            <a href="<?= home_url('/happiness/') ?>" class="cta__link">Do Some Happiness Practice</a>
        </div>
    </div>

<?php

get_footer();
