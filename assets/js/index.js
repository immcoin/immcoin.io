particlesJS.load('landing', '/particles.json', function() {
    console.log('nodes generated...');
});

var radius = 3,
    circumference = 2 * radius * Math.PI;
    
$(document).ready(function() {
    // $("html, body").animate({ scrollTop: 0 }, 2000, "expoinout");
    var $window = $(window);
    var curr = 'landing';
    var nav = $('#navigator');

    var sec = new timeOffset($('#sec'), 60, 'SECONDS');
    var min = new timeOffset($('#min'), 60, 'MINUTES');
    var hour = new timeOffset($('#hour'), 60, 'HOURS');
    var day = new timeOffset($('#day'), 60, 'DAYS');
    var els = $('circle');

    $('#countdown').countdown("2018/03/31", function(event) {
        sec.progress(event.strftime('%S'));
        min.progress(event.strftime('%M'));
        hour.progress(event.strftime('%H'));
        day.progress(event.strftime('%D'));
    });

    var bgImages = ["/images/content-bg.jpg", "/images/nebula-bg.jpg"];
    var logoImg = ['/images/immcoinlogo-white.png','/images/immcoinlogo.png'];

    // preloadImages(logoImg);
    // preloadImages(bgImages);

    var $el = $("body").bgswitcher({
        images: ["/images/content-bg.jpg", "/images/nebula-bg.jpg"],
        start: false,
        duration: 200
    });

    $window.on('scroll', function() {
        if($window.scrollTop() > 80 && nav.hasClass('navigator')){
            $('#logo-src').attr("src", logoImg[1]);
            nav.removeClass('navigator');
            nav.addClass('navigator-invert');
        }
        else if($window.scrollTop() < 80 && nav.hasClass('navigator-invert')){
            $('#logo-src').attr("src", logoImg[0]).fadeTo(1000);
            nav.addClass('navigator');
            nav.removeClass('navigator-invert');
        }
        secIden($('#profit'), 'profit', 0);
        secIden($('#timeline'), 'timeline', 1);        
    });

    function secIden (el, sec, index) {
        if($window.scrollTop() > el.offset().top && $window.scrollTop() < ( el.offset().top + el.height()) && curr != sec  ) {
            $el.bgswitcher("select", index); 
            curr = sec;
        }
    }
});

var stroker = function(el, count) {
    var currentCount = 1, 
        maxCount = count;
    this.update = function(data, unit) {
        currentCount = data;
        var offset = -(circumference / maxCount) * currentCount + 'em';
        el.find('.radial-progress-cover').attr('stroke-dashoffset', offset);
        el.find('tspan.time').html(data);
        el.find('tspan.unit').html(unit);
    }
}

$("#navigator a").click(function () {
    $('#navigator a').removeClass('active');
    $(this).addClass('active');
    var target = $(this).attr('data-id');
    $("html, body").animate({ scrollTop: $(target).offset().top }, 2000, "expoinout");
    return false;
});

var timeOffset = function(el, count, unit) {
    var radius = 60,
        progressValue = el.find('.cover'),
        CIRCUMFERENCE = 2 * Math.PI * radius,
        diff = 100/count;
    this.progress = function(time) {
        var val = (count - time) * diff;
        var prog = val/100;
        var offset = CIRCUMFERENCE * (1 - prog);
        el.find('text tspan.time').html(time);
        el.find('text tspan.unit').html(unit);
        progressValue[0].style.strokeDashoffset = offset;
    }
    progressValue[0].style.strokeDasharray = CIRCUMFERENCE;
}
