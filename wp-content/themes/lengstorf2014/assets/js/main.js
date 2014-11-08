/*!
 * Custom scripts for the theme
 * ----------------------------
 * Developed by Copter Labs <http://www.copterlabs.com/>
 */
jQuery(function($){

/******************************************************************************
 * ---------------------------------------------------------------------------
 * DEVELOPMENT NOTE: It's strongly recommended you use CodeKit for development
 * On Mac, get it here: http://incident57.com/codekit/
 *
 * For Windows, there's a very similar tool called Prepros that should do the
 * same kind of minification for CSS/JS.
 * Get it here: http://alphapixels.com/prepros/
 * ---------------------------------------------------------------------------
 *****************************************************************************/

/*
 * SCREEN SIZE DETECTION FOR JS VIA CSS
 * More info on how this works: http://adactio.com/journal/5429/
 *****************************************************************************/
var size = window.getComputedStyle(document.body,':after')
            .getPropertyValue('content').replace(/\W/g, '');


/*
 * CUSTOM THEME JS
 *****************************************************************************/
    if (size==='desktop') {
        var $meta = $('#post-meta');

        if ($meta.length>0) {
            $meta.affix({
                offset: {
                    top: $meta.offset().top-70
                }
            });
        }
 
        // Only triggers sharing pop-ups for desktops; small devices open in-screen
        $('.post-sharing,.share-this-post').on('click', 'a', function(event){
            event.preventDefault();
            window.open(
                $(this).attr('href'),
                '_blank',
                'width=800, height=400, top=200, left=300'
            );
        });
    }

});
