/*! This theme rides a Hoverboard (http://gethoverboard.com/) */
jQuery(function($){

    /*
     * SCREEN SIZE DETECTION FOR JS VIA CSS
     * More info on how this works: http://adactio.com/journal/5429/
     *************************************************************************/
    var size = window.getComputedStyle(document.body,':after')
                .getPropertyValue('content').replace(/\W/g, '');


    /*
     * CUSTOM THEME JS
     *************************************************************************/
    var iLeftOn = new Date('2014-12-30T12:00:00'),
        todayIs = Date.now(),
        timeSince = todayIs-iLeftOn,
        daysSince = Math.ceil(timeSince/86400000); // 1000ms x 60s x 60m x 24h

    // Updates the home page headline
    $('.days-abroad').text(daysSince + ' days');

    $('.subnav-toggle').on('click', function(event) {
        event.preventDefault();

        var isOpen = $('.site-header').toggleClass('open').hasClass('open'),
            navText = !isOpen ? 'More' : 'Less';

        $(this).text(navText);
    });

    if (size==='desktop') {
        // Only triggers sharing pop-ups for desktops; small devices open in-screen
        $('.main-content__sharing').on('click', 'a', function(event){
            event.preventDefault();
            window.open(
                $(this).attr('href'),
                '_blank',
                'width=800, height=400, top=200, left=300'
            );
        });
    }

});
