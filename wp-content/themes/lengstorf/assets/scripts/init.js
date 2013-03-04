jQuery(function($){

    $("a[rel=external]").attr({ "target": "_blank" });

    // Twitter
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.twitter.com/1/statuses/user_timeline.json"
            + "?include_entities=false&include_rts=false&screen_name=jlengstorf&count=3",
        success: function( response ) {
            var length = typeof response!='undefined' ? response.length : 0,
                twitter = $("#twitter");

            if (response.length>0) {
                twitter.find('.loading').remove();

                for (var i=0; i<length; i++) {
                    $("#twitter").append(
                        $("<li>" 
                            + response[i].text.replace(/(http:[\S]*)/, '<a href="$1">$1</a>') 
                            + "</li>")
                    );
                }
            }

            $("<li>")
                .attr({ class: 'follow-me' })
                .html('<a href="http://twitter.com/jlengstorf">Follow me on Twitter</a>')
                .appendTo(twitter);
        }
    });

    // Instagram
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/30794906/media/recent"
            + "?access_token=30794906.1fb234f.8faa8c1dd437479a9ca8f9dda5b202b8",
        success: function( response ) {
            var length = typeof response.data!='undefined' ? response.data.length : 0,
                instagram = $("#instagram");

            if (length>0) {
                instagram.find('.loading').remove();

                for (var i=0; i<length; i++) {
                    if (i===8) break;

                    var photo = response.data[i];

                    $("<a>")
                        .attr({
                            href: photo.images.standard_resolution.url,
                            class: "photos",
                            title: photo.caption.text 
                                + ' <a href="' + photo.link + '" '
                                + 'target="_blank">[view on Instagram]</a>'
                        })
                        .html(
                            $("<img />")
                                .attr({
                                    src: photo.images.thumbnail.url
                                })
                        )
                        .appendTo(instagram)
                        .wrap("<li></li>");

                    $(".photos").colorbox({ rel: "instagram" });
                }
            } 
        }
    });

});
