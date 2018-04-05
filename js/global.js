var p_ratio = 0.2;
jQuery( function($) {
    var niceScrollEnabled = false;
//    if(niceScrollEnabled){
//        var niceScrollWidth = 15;
//        $("html").niceScroll({
//            scrollspeed: 60,
//            mousescrollstep: 10,
//            cursorwidth: niceScrollWidth,
//            cursorborder: 0,
//            cursorcolor: '#2D3032',
//            cursorborderradius: 0,
//            autohidemode: false,
//            horizrailenabled: false,
//            zindex:10000,
//            background:'#666',
//            opacity:.5,
//        });
//        $('body').css('padding-right',niceScrollWidth+'px').append('<style>.is-sticky #header-wrap{right:'+niceScrollWidth+'px}</style>');
//    }

    $(document).ready(function(){

        var boxed_layout = false;

        if($('body').hasClass('is-boxed') ) boxed_layout = true;

        var fws_content_resize = function(){

            if(boxed_layout) {
                var fws = jQuery('.fullwidth .full-width-fluid');
                var width = $('#main').outerWidth();
                //console.log(width);
                fws.css({
                    'width': (width) + 'px',
                }).find('.row:first').css({
                    'width': (width+30) + 'px',
                });
                return;
            }
            var fws = jQuery('.fullwidth .full-width-fluid');
            var screen_w = jQuery('body').innerWidth();
            if(niceScrollEnabled) screen_w -= niceScrollWidth;

            margin = (screen_w - jQuery('#primary.content-area').width())/2;
            fws.margin = margin;

            var css_styles = {
                'padding-right':0,
                'padding-left':0,
                'margin-right':0,
                'margin-left':-margin,
                'width':screen_w,
                'overflow-x':'hidden',
            }

            if($('body').hasClass('rtl')){
                $.extend(css_styles,{
                    'margin-right':-margin,
                    'margin-left':0,
                });
            }

            fws.css(css_styles).find('div.row:first').css({
                'padding-right':'',
                'padding-left':'',
                'margin-right':'',
                'margin-left':'',
                'width': ''
            });

            fws.find('.caroufredsel_wrapper').each(function(){
                $(this).css('width',$(this).parent().width());
            })
        }

        fws_content_resize();

        var fws_resize = function(){

            if(boxed_layout) return;

            var fws = jQuery('.fullwidth .full-width-row');

            var screen_w = jQuery('body').innerWidth();

            if(niceScrollEnabled) screen_w -= niceScrollWidth;

            margin = ((screen_w - jQuery('#primary.content-area').width())/2);

            fws.margin = margin;

            var css_styles = {
                'padding-right':margin,
                'padding-left':margin,
                'margin-right':0,
                'margin-left':-margin,
            }

            if($('body').hasClass('rtl')){
                $.extend(css_styles,{
                    'margin-right':-margin,
                    'margin-left':0,
                });
            }
            fws.css(css_styles);
        }

        fws_resize();

        // Main menu superfish
        $('ul.sf-menu').superfish({
            delay: 200,
            animation: {opacity:'show', height:'show'},
            speed: 'fast',
            cssArrows: false,
            disableHI: true
        });

        // Mobile Menu
        $('#navigation-toggle').sidr({
            name: 'sidr-main',
            source: '#sidr-close, #site-navigation, #mobile-search',
            side: 'left'
        });
        $(".sidr-class-toggle-sidr-close").click( function() {
            $.sidr('close', 'sidr-main');
            return false;
        });

        //Animated content

        if($().waypoint && !(window.isMobile() || window.isSmallScreen() )) {
            $('.animated_content').waypoint(function() {

                jQuery(this).css('visibility', 'visible');

                var animation = jQuery(this).attr('data-animation');
                var duration = jQuery(this).attr('data-duration');

                jQuery(this).addClass(animation);

                if(duration) {
                    jQuery(this).css('-moz-animation-duration', duration);
                    jQuery(this).css('-webkit-animation-duration', duration);
                    jQuery(this).css('-ms-animation-duration', duration);
                    jQuery(this).css('-o-animation-duration', duration);
                    jQuery(this).css('animation-duration', duration);
                }
            },{ triggerOnce: true, offset: 'bottom-in-view' });
        }else{
            $('.animated_content').css('visibility', 'visible');
        }

        if(window.isMobile() || window.isSmallScreen() ) {
            jQuery('html[data-header-parallax] #page-header-wrap .section').css('background-attachment','scroll');
        }


        $(window).resize(function() {
            // Close the menu on window change
            $.sidr('close', 'sidr-main');
            fws_resize();
            fws_content_resize();
            $(window).trigger("scroll");
        });

        //Fixed Header

        var header = $('#header-wrap.fixed-header');
        var p_ratio = 0.1;
        if(header.size() > 0){
            var topbar = $('#topbar');
            header.data('org_height',header.height());
            header.data('org_top',header.position().top);
            header.data('adminbar',$('#wpadminbar').height());
            var org_body_top = $('body').position().top;
            var logo = header.find('#logo > h2 > a');
            var logo_img = header.find('#logo > h2 > a > img');
            logo.data('org_font_size', parseFloat( logo.css('font-size') ));
            if(logo_img){
                logo_img.data('org_height', parseFloat( logo_img.css('height') ));
                logo_img.data('org_pad_top', parseFloat( logo_img.css('padding-top') ));
                logo_img.data('org_pad_bottom', parseFloat( logo_img.css('padding-bottom') ));
            }

            var logo_mul = 1,nav_mul=1,header_mul=1;
            if(header.hasClass('logo-on-top')){
                logo_mul = 2/3;
                header_mul = false;
                nav_mul=false;
            }

            var header_handler = function(){
                var scroll = $(window).scrollTop();
                var org_top = header.data('org_top');
                var body_top = org_body_top;
                var screen_w = jQuery('body').innerWidth();
                var adminbar = header.data('adminbar');

                if(adminbar > 0){
                    if( screen_w <= 782 && screen_w > 600){
                        if(adminbar < 46){
                            org_top += 14;
                            body_top += 14;
                        }
                    }else if(screen_w <= 600){
                        body_top = 0;
                        if(adminbar < 46){
                            org_top += 14;
                        }
                    }else{
                        if(adminbar > 32){
                            org_top -= 14;
                            body_top -= 14;
                        }
                    }
                }
                if((org_top-scroll*p_ratio) >= body_top){
                    topbar.css({'top':scroll-scroll*p_ratio});
                    header.animate({'top':org_top-scroll*p_ratio},10);
                }else{
                    header.css('top',body_top);
                }

                var org_height = header.data('org_height');
                var org_font_size = logo.data('org_font_size');
                if(logo_img){
                    var org_logo_height = logo_img.data('org_height');
                    var org_logo_pad_top = logo_img.data('org_pad_top');
                    var org_logo_pad_bottom = logo_img.data('org_pad_bottom');
                }
                var new_height = org_height - scroll*p_ratio;
                var resize_ratio = (new_height/org_height)
                var new_font_size = org_font_size * resize_ratio;
                var new_logo_height = org_logo_height * resize_ratio;
                var new_logo_pad_top = Math.floor( org_logo_pad_top * resize_ratio );
                var new_logo_pad_bottom = Math.floor( org_logo_pad_bottom * resize_ratio );
                var window_w = $(window).width();
                if(new_height < org_height/2){
                    new_height = org_height/2;
                    new_font_size = org_font_size/2;
                    new_logo_height = org_logo_height/2;
                    new_logo_pad_top = Math.floor( org_logo_pad_top/2 );
                    new_logo_pad_bottom = Math.floor( org_logo_pad_bottom/2 );
                    header.addClass('shrinked');
                }else{
                    header.removeClass('shrinked');
                }

                if(window_w < 992){
                    $('#navigation-toggle').css('line-height',new_height+'px');
                }
                if(header_mul !== false )
                    header.css('height',new_height*header_mul);
                header.find('#logo > h2').css({'height':new_height*logo_mul+'px'});
                header.find('#logo > h2 > a').css({'line-height':new_height*logo_mul+'px','height':new_height*logo_mul+'px','font-size':new_font_size+'px'});
                header.find('#logo > h2 > a > img').css({'height':new_logo_height+'px','padding-top':new_logo_pad_top + 'px','padding-bottom':new_logo_pad_bottom + 'px'});
                //console.log(new_logo_pad_top,' ',new_logo_pad_bottom);
                //console.log(resize_ratio);
                if(nav_mul !== false )
                    header.find('#site-navigation .dropdown-menu > li').css('line-height',new_height*nav_mul+'px');
                //console.log(ratio,org_font_size,new_font_size,new_height);

            }
            //$(window).unbind('scroll',header_handler);
            $(window).scroll(header_handler);

            /*
            $("#header-wrap.fixed-header").sticky({
                topSpacing:-96,
            });
            */
        }

        /* Placeholder support for older browser */

        function add() {
            if($(this).val() === ''){
                $(this).val($(this).attr('placeholder')).addClass('placeholder');
            }
        }

        function remove() {
            if($(this).val() === $(this).attr('placeholder')){
                $(this).val('').removeClass('placeholder');
            }
        }

        // Create a dummy element for feature detection
        if (!('placeholder' in $('<input>')[0])) {

            // Select the elements that have a placeholder attribute
            $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

            // Remove the placeholder text before the form is submitted
            $('form').submit(function(){
                $(this).find('input[placeholder], textarea[placeholder]').each(remove);
            });
        }

    }); // End doc ready

    $(window).load(function(){

        if(!(window.isMobile() || window.isSmallScreen() )){
            if(jQuery.browser.msie){
                if($('html').attr('data-parallax-ratio') === '0'){
                    $('[data-stellar-background-ratio]').removeAttr('data-stellar-background-ratio').css('background-attachment','fixed');
                }else{
                    $('[data-stellar-background-ratio=0]').removeAttr('data-stellar-background-ratio').css('background-attachment','fixed');
                }
            }
            // Prallex plugin
            var parallax= $.stellar({
                horizontalScrolling:false,
                responsive:true,
            });
        }

        // Page FlexSlider
        var page_slider = $('#page-slider');
        var page_slider_resize = function(){};
        if(page_slider.size() > 0){
            var options = {
                animationSpeed: page_slider.attr('data-animationspeed'),
                slideshowSpeed: page_slider.attr('data-slideshowspeed'),
                offset: 0,
            }
            var header =  $('#header-wrap');
            var topbar =  $('#topbar');
            if(topbar.size){
                if(topbar.hasClass('transparent-header')) options.offset += topbar.outerHeight();
            }
            if(header.size()){
                if(header.hasClass('transparent-header')) options.offset += header.outerHeight();
            }

            $('#page-slider').flexslider({
                animation: 'fade',
                animationSpeed: parseInt(options.animationSpeed),
                slideshowSpeed: parseInt(options.slideshowSpeed),
                directionNav: true,
                slideshow: true,
                smoothHeight: true,
                controlNav: true,
                useCSS: true,
                animationLoop: true,
                pauseOnHover: true,
                prevText: '<span class="fa fa-angle-left"></span>',
                nextText: '<span class="fa fa-angle-right"></span>',
                //controlsContainer: ".flexslider-container",
                start: function (slider) {

                    slider.data('org_height',slider.height());

                    page_slider_resize = function(){
                        $body_width = $('body').width();
                        if( $('body').hasClass('is-boxed')){
                            slider.css('width',$('#slider-container').innerWidth());
                        }
                        var slider_width = slider.width();
                        var slider_height = slider.height();
                        var org_height = slider.data('org_height');
                        var ratio = 1;
                        var new_height = 0;
                        var scale = '';
                        var origin = '';
                        var width = '100%';
                        var left = '0';
                        var active_slider = $('.flex-active-slide',slider);
                        var slider_content = $('.page-slide-inner',slider)
                        if(slider_width < 1170){
                            ratio = slider_width / 1170;
                            new_height = slider_height * ratio;
                            scale = 'scale('+ratio+')';
                            origin = '50% 0';
                            width = (100 + ratio*100) + '%';
                            left = -ratio * 50 + '%';
                        }else if(slider_width >=  1170 ){
                            new_height = slider.data('org_height');
                            ratio = 1;
                        }
                        slider_content.css({
                            '-webkit-transform': scale,
                            '-moz-transform': scale,
                            '-ms-transform': scale,
                            '-o-transform': scale,
                            'transform': scale,
                            '-webkit-transform-origin': origin,
                            '-moz-transform-origin': origin,
                            '-ms-transform-origin': origin,
                            '-o-transform-origin': origin,
                            'transform-origin': origin,
                            'width': width,
                            'left': left,
                        });
                        slider.css('height',new_height+'px');
                        slider.parents('#page-slider-wrap').css('height',new_height+'px');
                    }

                    if(niceScrollEnabled) slider.css('right',niceScrollWidth+'px');
                    slider.parents('.flexslider-container').removeClass('loading');
                    var cs = slider.slides.eq(slider.currentSlide),
                        content = $('.page-slide-content',cs),
                        cs_h = cs.height(),
                        h = (cs_h - content.height() + options.offset)/2 + 'px';
                    content.parent().css('padding-top',h);
                    cs.addClass('animated');
                },
                before: function (slider) {
                    var cs = slider.slides.eq(slider.currentSlide);
                    cs.removeClass('animated');
                },
                after: function (slider) {

                    var cs = slider.slides.eq(slider.currentSlide),
                        content = $('.page-slide-content',cs),
                        cs_h = cs.height(),
                        h = (cs_h - content.height() + options.offset)/2 + 'px';
                    content.parent().css('padding-top',h);
                    setTimeout(function(){
                        cs.addClass('animated');
                    },100);
                }

            });

        }

        // Post FlexSlider
        $('div.post-slider').flexslider({
            animation: 'fade',
            slideshow: true,
            smoothHeight: true,
            controlNav: false,
            directionNav: true,
            prevText: '<span class="fa fa-angle-left"></span>',
            nextText: '<span class="fa fa-angle-right"></span>',
            //controlsContainer: ".flexslider-container",
            start: function(slider){
                //console.log(slider);
                slider.parents('.flexslider-container').trigger('resize');
            }
        });

        // Testimonial-slider
        $('div.testimonial-slider').flexslider({
            animation: 'fade',
            animationSpeed: 1000,
            slideshowSpeed: 5000,
            directionNav: true,
            slideshow: true,
            smoothHeight: true,
            controlNav: false,
            useCSS: true,
            animationLoop: true,
            pauseOnHover: true,
            prevText: '<span class="fa fa-angle-left"></span>',
            nextText: '<span class="fa fa-angle-right"></span>',
            //controlsContainer: ".testimonial-slider-container",
            start: function (slider) {
                slider.parents('.flexslider-container').removeClass('loading');
                var cs = slider.slides.eq(slider.currentSlide),
                    content = $('.testimonial-entry-content',cs),
                    th = $('.testimonial-entry-thumbnail img',cs),
                    cs_h = cs.height(),
                    h = ((content.height() - th.height())/2 - 10) + 'px';

                th.css('margin-top',h);
                //console.log(content.height(),th.height());
                cs.addClass('animated');
                slider.data('oldHeight',cs_h);
                $(window).trigger('resize');
            },

            before: function (slider) {
                var cs = slider.slides.eq(slider.currentSlide);
                cs.removeClass('animated');
            },

            after: function (slider) {

                var cs = slider.slides.eq(slider.currentSlide),
                    content = $('.testimonial-entry-content',cs),
                    th = $('.testimonial-entry-thumbnail img',cs);
                cs_h = cs.height(),
                    h = ((content.height() - th.height())/2 - 10) + 'px';

                th.css('margin-top',h);
                setTimeout(function(){
                    cs.addClass('animated');
                },100);
                slider_old_h = slider.data('oldHeight');
                if(slider_old_h != cs_h){
                    slider.data('oldHeight',cs_h);
                    $(window).trigger('resize');
                }

            }

        });

        $(window).resize(function() {
            page_slider_resize();
        });

        $('#totop').click(function(){
            $('body,html').animate({scrollTop:0}, '500', 'swing');
        }).css({'bottom':$('#copyright-wrap').outerHeight(),'right':($('body').width() - $('#main').outerWidth())/2});

        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            if(scroll > 300){
                $('#totop').stop().show().animate({opacity:.9}, '500');
            }else{
                $('#totop').stop().animate({opacity:0}, '500',function(){
                    $('#totop').hide();
                });
            }
        });

    }); // End on window load
});

window.isMobile = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

window.isSmallScreen = function() {
    if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
    } else {
        return false;
    }
}
