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

        var $header = $('.site-header'),
            isOpen = $header.removeClass('closed').toggleClass('open').hasClass('open'),
            navText = !isOpen ? 'More' : 'Less';

        if (!isOpen) {
            setTimeout(function(){ $header.addClass('closed'); }, 500);
        }

        $(this).text(navText);
    });

    if (size==='desktop') {
        // Only triggers sharing pop-ups for desktops; small devices open in-screen
        $('.main-content__sharing').on('click', 'a', function(event){
            event.preventDefault();
            window.open(
                $(this).attr('href'),
                'sharing-window',
                'width=800, height=400, top=200, left=300'
            );
        });
    }

    // On mobile, the featured image shows up differently
    if (size.length) {
        var $headlines = $('.main-content__headline,.main-content__headline--related,.main-content__headline--single');

        $headlines.each(function(  ) {
            var $this = $(this);
            $this.css({ backgroundImage: 'url(' + $this.data('image') + ')' });
        });
    }

    // On full-sized posts, the background image ghosts in the background
    if (size==='desktop') {
        var $headline = $('.main-content__headline,.main-content__headline--single,.main-content__headline--page').data('image');

        if (typeof $headline!=='undefined') {
            var fullBG = $headline.replace(/([x\d-]+)?\.(png|jpe?g|gif)/, '.$2'),
                $body = $('body'),
                bgColor = $body.css('background-color'),
                bgFade = bgColor.indexOf('a')===-1 ? bgColor.replace(')', ', .92)').replace('rgb', 'rgba') : bgColor,
                gradient = 'linear-gradient(to bottom, ' + bgFade + ', ' + bgColor + ' 50vw)';

            $body.css({ backgroundImage: gradient + ', url(' + fullBG + ')' });
        }
    }

});

// Let's build a highlighted text sharing tool!
function HighlightShare( options ) {
    var opts = options || {},
        classes = opts.classNames || {},
        config = this.config = {
            url: opts.url || window.location.href, // URL to share
            hashtags: opts.hashtags || '', // Hashtags (for Twitter)
            related: opts.related || 'jlengstorf', // Related accounts (for Twitter)
            via: opts.via || '', // Article author (for Twitter)
            classNames: {
                wrapper: classes.wrapper || 'highlight-share__share-box',
                active: classes.active || 'highlight-share__is-active',
                tweetBtn: classes.tweetBtn || 'highlight-share__share-btn--twitter'
            },
            container: opts.container || 'body',
            appendTo: 'body' // Query selector (see: http://mzl.la/1AYePlN)
        },
        savedText = false,
        shareBox = document.createElement('div'),
        tweetBtn = document.createElement('button'),
        container;

    // So we can avoid collisions
    this.isActive = false;

    // Twitter button attributes and content
    tweetBtn.className = config.classNames.tweetBtn;

    // Share box attributes
    shareBox.className = config.classNames.wrapper;
    shareBox.appendChild(tweetBtn);

    // Adds a click handler for sharing quotes
    shareBox.addEventListener('click', this.handleButtonClick.bind(this));

    // Sets the container for restricting functionality to just one section
    this.container = document.querySelector(this.config.container);

    // Appends the sharing box to the DOM
    document.querySelector(config.appendTo).appendChild(shareBox);

    // Listens for mouseup as a signal that text selection may have occurred
    document.addEventListener('mouseup', this.handleSelection.bind(this));
}

HighlightShare.prototype = Object.create({
    constructor: {
        value: HighlightShare
    }
});

HighlightShare.prototype.getSelectedText = function(  ) {
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.getRangeAt && selection.rangeCount) {
            return selection.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }

    return false;
};

HighlightShare.prototype.restoreSelectedText = function( range ) {
    if (range) {
        if (window.getSelection) {
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
};

HighlightShare.prototype.handleSelection = function( event ) {
    this.savedText = this.getSelectedText();

    if (this.isInContainer(event.target)) {
        setTimeout(this.showSharingBox.bind(this), 100, event);
    }
};

HighlightShare.prototype.showSharingBox = function( event ) {
    var isEmpty = this.savedText.toString().length===0,
        wrapper = this.getWrapper(),
        ignoredTags = ['a', 'img'],
        targetTag = event.target.tagName.toLowerCase();

    if (!isEmpty && !this.isActive && ignoredTags.indexOf(targetTag)===-1) {
        this.isActive = true;
        wrapper.style.left = event.pageX + 'px';
        wrapper.style.top = event.pageY + 'px';
        wrapper.className += ' ' + this.config.classNames.active;
    } else {
        this.hideSharingBox();
    }
};

HighlightShare.prototype.handleButtonClick = function( event ) {
    if (!this.savedText) {
        return;
    }

    if (event.target.className.indexOf(this.config.classNames.tweetBtn)!==-1) {
        window.open(
            this.buildTwitterUrl(),
            'sharing-window',
            'width=600, height=400, top=200, left=300'
        );
    }

    this.restoreSelectedText(this.savedText);
};

HighlightShare.prototype.hideSharingBox = function(  ) {
    var wrapper = this.getWrapper(),
        updatedClass = wrapper.className.replace(this.config.classNames.active, '');
    wrapper.style.left = '';
    wrapper.style.top = '';
    wrapper.className = updatedClass;

    // Make sure a new box can be opened
    this.isActive = false;
};

HighlightShare.prototype.buildTwitterUrl = function(  ) {
    var url = 'https://twitter.com/intent/tweet',
        queryString = '',
        properties = {
            text: this.savedText,
            url: this.config.url || '',
            hashtags: this.config.hashtags || '',
            related: this.config.related || '',
            via: this.config.via || ''
        };

        for (var prop in properties) {
            if (properties[prop].toString().length>0) {
                queryString += queryString.length===0 ? '?' : '&';
                queryString += prop + '=' + properties[prop];
            }
        }

        return url + queryString;
};

HighlightShare.prototype.getWrapper = function(  ) {
    return document.getElementsByClassName(this.config.classNames.wrapper)[0];
};

HighlightShare.prototype.isInContainer = function( node ) {
    if (this.container===null) {
        return false;
    }

    return this.container===node ? false : this.container.contains(node);
};

if (size.length) {
    var highlightshare = new HighlightShare({
        via: 'jlengstorf',
        container: '.main-content'
    });
}
