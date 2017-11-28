    
var nav = $('#navigator');
var curr = 'landing';
var $window = $(window);
var logoImg = ['/images/immcoinlogo-white.png', '/images/immcoinlogo.png'];

$(document).ready(function () {    
    $window.on('scroll', function () {
        if ($window.scrollTop() >= 80 && nav.hasClass('navigator')) {
            $('#logo-src').attr("src", logoImg[1]);
            nav.removeClass('navigator');
            nav.addClass('navigator-invert');
        } else if ($window.scrollTop() <= 80 && nav.hasClass('navigator-invert')) {
            $('#logo-src').attr("src", logoImg[0]).fadeTo(1000); // change val to 0
            nav.addClass('navigator');
            nav.removeClass('navigator-invert');
        }
        secIden($('#profit'), 'profit', 0);
        secIden($('#ico'), 'ico', 1);
        secIden($('#timeline'), 'timeline', 1);
        secIden($('#team'), 'team', 2);
        secIden($('#faq'), 'faq', 0);
        secIden($('#footer'), 'footer', 0);
    });

    $('#burger , #navigator a').click(function () {
        if ($(window).width() < 900)
            $('#navigator ul').slideToggle("fast");
    });

    $window.resize(function() {
        if($window.width() > 900)
            $('#navigator ul').show();
    })
    $("#navigator a").click(function () {
        $('#navigator a').removeClass('active');
        $(this).addClass('active');
        var target = $(this).attr('data-id');
        $("html, body").animate({
            scrollTop: $(target).offset().top
        }, 2000, "expoinout");
        return false;
    });
    
});

function secIden(el, sec, index) {
    if ($window.scrollTop() >= el.offset().top && $window.scrollTop() <= (el.offset().top + el.height()) && curr != sec) {
        // el.bgswitcher("select", index); 
        curr = sec;
    }
}

