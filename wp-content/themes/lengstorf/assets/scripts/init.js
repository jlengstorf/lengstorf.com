jQuery(function($){

    // Evil workaround for opening the PDX subreddit in a new tab
    $("a[rel=external]").attr({ "target": "_blank" });

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o){ //v1.0
        for(var j, x, i=o.length; i; j=parseInt(Math.random()*i,10), x=o[--i], o[i]=o[j], o[j]=x){}
        return o;
    }

    // Dribbble
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "http://api.dribbble.com/players/jlengstorf/shots",
        success: function( response ) {
            var length   = typeof response.shots!=='undefined' ? response.shots.length : 0,
                dribbble = $("#dribbble"),
                hide_me  = '',
                shots = shuffle(response.shots);

            if (length>0) {
                dribbble.find('.loading').remove();

                for (var i=0; i<length; i++) {
                    if (i>=1) {
                        hide_me = ' hide-me';
                    }

                    var shot = shots[i];

                    $("<a>")
                        .attr({
                            href: shot.image_url,
                            class: "dribbble-shots"+hide_me,
                            title: shot.title
                        })
                        .html(
                            $("<img />")
                                .attr({
                                    src: shot.image_url
                                })
                        )
                        .appendTo(dribbble);

                    $(".dribbble-shots").colorbox({
                        maxWidth: '92%',
                        maxHeight: '92%',
                        rel: "dribbble-shots"
                    });
                }
            }
        }
    });

    // Instagram
    $("#instagram").recentInstagramUploads({
        access_token: "30794906.1fb234f.8faa8c1dd437479a9ca8f9dda5b202b8",
        ig_user_id:   "30794906",
        photo_count: 16,
        photo_class: 'photo',
        callback: function() {
            $(".photo").colorbox({
                maxWidth: '92%',
                maxHeight: '92%',
                rel: 'instagram'
            });
        }
    });

});
