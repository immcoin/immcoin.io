particlesJS.load('landing', '/particles.json', function() {
    console.log('nodes generated...');
});
particlesJS.load('homes', '/bodyparticle.json', function() {

});

var radius = 3,
    circumference = 2 * radius * Math.PI;

// TweenMax.staggerTo('#overlay svg path', 5, {ease:Linear.easeNone, transformOrigin:"50% 50%", rotation:'360', repeat: -1}, 0.5);
$(document).ready(function() {

    $('#overlay').fadeOut("slow", function() {
        console.log($(this));
    });

    // $("html, body").animate({ scrollTop: 0 }, 2000, "expoinout");
    // $('#home > canvas').height = 100;
    var $window = $(window);
    var curr = 'landing';
    var nav = $('#navigator');

    var sec = new timeOffset($('#sec'), 60, 'SECONDS');
    var min = new timeOffset($('#min'), 60, 'MINUTES');
    var hour = new timeOffset($('#hour'), 60, 'HOURS');
    var day = new timeOffset($('#day'), 60, 'DAYS');
    var els = $('circle');

    $('#countdown').countdown("2017/12/1", function(event) {
        sec.progress(event.strftime('%S'));
        min.progress(event.strftime('%M'));
        hour.progress(event.strftime('%H'));
        day.progress(event.strftime('%D'));
    });

    var bgImages = ["/images/content-bg.jpg", "/images/content-bg-2.jpg"];
    var logoImg = ['/images/immcoinlogo-white.png','/images/immcoinlogo.png'];

    // preloadImages(logoImg);
    // preloadImages(bgImages);

    // var $el = $("body").bgswitcher({
    //     images: ["/images/content-bg.jpg", "/images/content-bg-2.jpg", "/images/content-bg-3.jpg"],
    //     start: false,
    //     duration: 200
    // });

    $window.on('scroll', function() {
        if($window.scrollTop() >= 80 && nav.hasClass('navigator')){
            $('#logo-src').attr("src", logoImg[1]);
            nav.removeClass('navigator');
            nav.addClass('navigator-invert');
        }
        else if($window.scrollTop() <= 80 && nav.hasClass('navigator-invert')){
            $('#logo-src').attr("src", logoImg[0]).fadeTo(1000); // change val to 0
            nav.addClass('navigator');
            nav.removeClass('navigator-invert');
        }
        secIden($('#profit'), 'profit', 0);
        secIden($('#whyIMM'), 'whyIMM', 1);     
        secIden($('#timeline'), 'timeline', 1);
        secIden($('#team'), 'team', 2);
        secIden($('#about'), 'about', 2);
        secIden($('#faq'), 'faq', 0);
        secIden($('#contact'), 'contact', 0);
    });

    function secIden (el, sec, index) {
        if($window.scrollTop() >= el.offset().top && $window.scrollTop() <= ( el.offset().top + el.height()) && curr != sec  ) {
            // el.bgswitcher("select", index); 
            curr = sec;
        }
    }
    
    var tl = new TimelineMax();
    tl.from($('#trade #from'), 1, {opacity: 0,x: -400, ease:Power4.easeOut})
        .from('#trade #to', 1, {opacity: 0, x: 400, ease:Power4.easeOut}, )
        .staggerFrom('#trade .coin', 1 , {x:300, scale:0.5, opacity: 0, ease:Power4.easeOut}, 0.1)
        .to('#trade .coin', 2 ,{transformOrigin:"50% 50%", ease:Linear.easeNone, rotation: 360, repeat: -1})
   
    var controlTween = new TimelineMax();
    controlTween.staggerFrom('#fullControl #controller , #arc', 1, {opacity: 0, y: -400, ease:Power4.easeOut},0.5  )
    .staggerFromTo('#fullControl .svcirc', 1, {opacity: 0, y: 200, ease:Power4.easeOut}, {opacity: 1, y : -20} ,0.1)
    .to('#controller #outline1', 2, { transformOrigin:"50% 50%",rotation: 360, ease:Linear.easeNone ,repeat: -1 })
    .to("#controller #outline2", 2, { transformOrigin:"50% 50%",rotation: -360, ease:Linear.easeNone, repeat: -1 }, '-=2')
    .staggerTo("#fullControl .svcirc", 1 , {y: 25, repeat: -1, ease:Linear.easeNone, yoyo: true}, 0.2, '-=2');
    
    var securityTween = new TimelineMax();
    securityTween.staggerFrom('#securityBlock #coinInline, #securityBlock #coinoutlineInside, #lock', 2, {opacity : 0, y: 200, ease:Power4.easeOut}, 0.5)
        .to('#lock', 1, {y : -20})
        .fromTo('#lock', 1, {y: -20} , {y: 20, ease:Linear.easeNone, repeat: -1, yoyo: true });

        
    var clockTween = new TimelineMax();
    clockTween.staggerFrom('#clock #clockOutline, #clock #clockInside', 1, {opacity : 0, y : 200}, 0.5)
        .staggerFrom('#clock text', 1, { y: 200, opacity : 0, ease:Power4.easeOut}, 0.1)
        .to('#clock #minute', 2, {rotation: 360, repeat: -1, transformOrigin: "100% 100%", ease:Linear.easeNone})
        .to('#clock #hour', 60, {rotation: 360, repeat: -1, transformOrigin: "100% 100%", ease:Linear.easeNone});

    $('#burger , #navigator a').click(function() {
        if($(window).width() < 900)
            $('#navigator ul').slideToggle("fast");
    });

    // url : "http://192.168.2.200/imm-trader/total/totalcoin.php",
    // $.ajax({
    //     url : "https://immtradersclub.com/api/totalcoin.php",
        
    //     success : function(data) {
    //         updateSales(data);
    //     },
    //     error: function(err) {
    //         console.log(err);
    //     }
    // });
    
});

function updateSales(data) {
    var progress = $('#progressBar .progress');
    var sales = data.value;
    var target = 1000000;
    var percentage = (sales/target) * 100;
    
    $('#progressBar .bar .text').html( toCurrency(parseFloat(sales)) + " / " + toCurrency(target));
    TweenMax.to(progress, 2, { width: percentage + "%"})
}

function toCurrency(val) {
    return val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' IMC';
}

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
    var radius = 80,
        progressValue = el.find('.cover'),
        CIRCUMFERENCE = 2 * Math.PI * radius,
        diff = 100/count;
    this.progress = function(time) {
        var val = (count - time) * diff;
        var prog = val/100;
        var offset = CIRCUMFERENCE - (CIRCUMFERENCE * (1 - prog));
        el.find('text tspan.time').html(time);
        el.find('text tspan.unit').html(unit);
        progressValue[0].style.strokeDashoffset = offset;
    }
    progressValue[0].style.strokeDasharray = CIRCUMFERENCE;
}
