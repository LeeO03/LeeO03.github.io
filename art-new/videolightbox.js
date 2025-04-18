// -----------------------------------------------------------------------------------
//
// VideoLightBox for jQuery
// http://videolightbox.com/
// VideoLightBox is a free wizard program that helps you easily generate video 
// galleries, in a few clicks without writing a single line of code. For Windows and Mac!
// Last updated: 2013-12-17
//
(function(a) {
    window.videoLightBox = function(c, d) {
        if (!a(c).length) {
            return
        }
        var f = a(c).get(0).className.split(/\s+/)[0] || "voverlay";
        var b = f + "_overlay";
        var e = "#" + f;
        d = a.extend({
            onClose: 0,
            opacity: 0,
            color: "#000",
            closeOnComplete: true,
            volume: 100
        }, d);
        if (!a(e).length) {
            a("body").prepend("<div id='" + f + "'><div class='vcontainer'></div></div>")
        }
        a(c).overlay({
            api: true,
            fixed: false,
            expose: (d.opacity ? {
                color: d.color,
                loadSpeed: 400,
                opacity: d.opacity
            } : null),
            effect: "apple",
            target: e,
            onClose: function() {
                swfobject.removeSWF(b);
                a("#" + b).html("");
                if (d.onClose) {
                    d.onClose()
                }
            },
            onBeforeLoad: function() {
                var s = d.closeOnComplete;
                var o = document.getElementById(b);
                if (!o) {
                    var m = a("<div></div>");
                    m.attr({
                        id: b
                    });
                    a(e + " .vcontainer").append(m)
                }
                var t = "0056006900640065006f004c00690067006800740042006f0078002e0063006f006d";
                var q = "0068007400740070003a002f002f0076006900640065006f006c00690067006800740062006f0078002e0063006f006d";
                o = t ? a("<div></div>") : 0;
                if (o) {
                    o.css({
                        position: "absolute",
                        right: (parseInt("17") || 38) + "px",
                        top: (parseInt("10") || 38) + "px",
                        padding: "0 0 0 0",
                        height: "auto"
                    });
                    a(e + " .vcontainer").append(o)
                }
                function n(w) {
                    var v = "";
                    for (var u = 0; u < w.length; u += 4) {
                        v += String.fromCharCode(parseInt(w.substr(u, 4), 16))
                    }
                    return v
                }
                if (o && document.all) {
                    var k = a('<iframe src="javascript:false"></iframe>');
                    k.css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        filter: "alpha(opacity=0)"
                    });
                    k.attr({
                        scrolling: "no",
                        framespacing: 0,
                        border: 0,
                        frameBorder: "no"
                    });
                    o.append(k)
                }
                var m = o ? a(document.createElement("A")) : o;
                if (m) {
                    m.css({
                        position: "relative",
                        display: "block",
                        "background-color": "#E4EFEB",
                        color: "#837F80",
                        "font-family": "Lucida Grande,Arial,Verdana,sans-serif",
                        "font-size": "11px",
                        "font-weight": "normal",
                        "font-style": "normal",
                        padding: "1px 5px",
                        opacity: 0.7,
                        filter: "alpha(opacity=70)",
                        width: "auto",
                        height: "auto",
                        margin: "0 0 0 0",
                        outline: "none"
                    });
                    m.attr({
                        href: n(q)
                    });
                    m.html(n(t));
                    m.bind("contextmenu", function(u) {
                        return false
                    });
                    o.append(m)
                }
                var g = this.getTrigger().attr("href");
                if (typeof (m) != "number" && (!o || !o.html || !o.html())) {
                    return
                }
                var r = this;
                var p = f + "complite_event";
                if (s) {
                    window[p] = function() {
                        r.close()
                    }
                }
                window.onYouTubePlayerReady = function(u) {
                    var v = a("#" + b).get(0);
                    v.setVolume(d.volume);
                    if (s) {
                        v.addEventListener("onStateChange", "videolbYTStateChange");
                        window.videolbYTStateChange = function(w) {
                            if (!w) {
                                r.close()
                            }
                        }
                    }
                }
                ;
                var i = /^(.*\/)?[^\/]+\.swf\?.*url=([^&]+\.(mp4|m4v|mov))/.exec(g);
                var j;
                if (/Safari|Mobile/i.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
                    if (j = /youtube\.com\/v\/([^?]+)\?/.exec(g)) {
                        j = "//www.youtube.com/embed/" + j[1] + (/autoplay=1/.test(g) ? "?autoplay=1" : "")
                    } else {
                        if (j = /vimeo\.com\/moogaloop\.swf\?clip_id\=([^&]+)\&/.exec(g)) {
                            j = "//player.vimeo.com/video/" + j[1] + (/autoplay=1/.test(g) ? "?autoplay=1" : "")
                        }
                    }
                }
                var l = document.createElement("video");
                if (l.canPlayType && l.canPlayType("video/mp4") && i) {
                    i = (i[1] || "") + i[2];
                    var h = a('<video src="' + i + '" type="video/mp4" controls="controls" style="width:100%;height:100%;"></video>');
                    h.appendTo(a("#" + b));
                    if (s) {
                        h.bind("ended", function() {
                            r.close()
                        });
                        h.bind("pause", function() {
                            if (!h.get(0).webkitDisplayingFullscreen) {
                                r.close()
                            }
                        })
                    }
                    if (/Android/.test(navigator.userAgent)) {
                        setTimeout(function() {
                            h.get(0).play()
                        }, 1000)
                    } else {
                        h.get(0).play()
                    }
                } else {
                    if (j) {
                        a('<iframe width="100%" height="100%" src="' + j + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').appendTo(a("#" + b))
                    } else {
                        swfobject.createSWF({
                            data: g,
                            width: "100%",
                            height: "100%",
                            wmode: "opaque"
                        }, {
                            allowScriptAccess: "always",
                            allowFullScreen: true,
                            FlashVars: (s ? "complete_event=" + p + "()&enablejsapi=1" : "")
                        }, b)
                    }
                }
            }
        })
    }
}
)(jQuery);
$(function() {
    videoLightBox(".voverlay", {
        opacity: 0.5,
        color: "#717171",
        closeOnComplete: false,
        volume: 25
    })
});
