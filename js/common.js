var slider;
var partners_slider;
var partnersConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    initialSlide: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1
            }
        },
    ],
};
var eventsConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    initialSlide: 1,
    autoplay: true,
};
var slickClassName = '.partners_list';
$(document).ready(function() {
    new WOW().init();
    $('a[href^="#"]').on('click', function(e) {
        new WOW().init();
        e.preventDefault();
        var headerNode = $('header');
        var defH = parseInt($('header').outerHeight());
        var h = headerNode.hasClass('sticky') ? defH : defH - 50;
        closemenu();
        try {
            if (!($($(this).attr('href')) && $($(this).attr('href')).length)) return;

            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - h
            }, 500, 'linear');
        } catch (e) {
            console.error(e.message);
        }
    });
    if (document.querySelectorAll('.events_item').length > 1) {
        slider = $('.events').slick(eventsConfig);
    }
    if (document.querySelectorAll('.press_item').length > 1) {
        slider = $('.press').slick(eventsConfig);
    }
    if (document.querySelectorAll('.partners_item').length > 3) {
        if (window.innerWidth < 992) {
            partners_slider = $('.partners_list').slick(partnersConfig);
        } else {
            if (document.querySelectorAll('.partners_list').length > 4) {
                partners_slider = $('.partners_list').slick(partnersConfig);
            }
        }
    }
    var wpcf7Elm = document.querySelector( '.request_popup .wpcf7' );

    wpcf7Elm.addEventListener( 'wpcf7mailsent', function() {
        setTimeout(closePopup, 1000);
    }, false );
    this.addEventListener('keyup', function (e) {
        if (e.keyCode == 27) {
            closePopup();
            closemenu();
        }
    });
});
$(window).on('resize', function (e) {
    if (!$(slickClassName).hasClass('slick-slider') && window.innerWidth < 992) {
        $(slickClassName).slick(partnersConfig);
    } else if ($(slickClassName).hasClass('slick-slider') && window.innerWidth >= 992) {
        $(slickClassName).slick('unslick');
    }
});
$(document).on('change', function(e) {
    var target = e.target;
    if (target != document.getElementById('header_burger__input')) return;
    var method = 'remove';

    if (target['checked']) method = 'add';

    document.body.classList[method]('disscroll');
});
$(window).on('load', function () {
    setTimeout(function() {
        if (document.querySelectorAll('.events_item').length > 1) {
            slider.slick('slickGoTo' ,0);
        }
        if (document.querySelectorAll('.press_item').length > 1) {
            slider.slick('slickGoTo' ,0);
        }
        if (document.querySelectorAll('.partners_item').length > 4) {
            partners_slider.slick('slickGoTo' ,0);
        }
        hidePreloader();
    }, 500);
    $(document).on('click', function(e) {
        var target = e.target;

        if (target.classList.contains('request_popup__wrapper')) {
            closePopup();
        } else {
            if (target.classList.contains('open-popup')) {
                openPopup();
            }
        }
    });
});
//fixed header
$(function() {
    var inScroll = 0;
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the header
    var header = document.querySelector("header");

    // Get the offset position of the navbar
    var sticky = header.clientHeight/*header.offsetTop*/;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        var sY = window.scrollY;
        if (/*sY < inScroll */window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
        inScroll = sY;
    }

    myFunction();
});
function closemenu() {
    var inp = document.getElementById('header_burger__input');
    inp['checked'] = false;
    document.body.classList.remove('disscroll');
}
function hidePreloader() {
    document.body.classList.remove('loading');
    document.body.classList.remove('disscroll');
}
function closePopup() {
    document.body.classList.remove('open-popup');
}
function openPopup() {
    document.body.classList.add('open-popup');
}