particlesJS.load('landing', '/particles.json', function() {
    console.log('nodes generated...');
});

var radius = 3,
    circumference = 2 * radius * Math.PI;
    
$(document).ready(function() {
    var $window = $(window);
    var curr = 'landing';

    var sec = new stroker($('#sec'), 60);
    var min = new stroker($('#min'), 60);
    var hour = new stroker($('#hour'), 60);
    var day = new stroker($('#day'), 365);

    var els = $('circle');

    Array.prototype.forEach.call(els, function (el) {
        el.setAttribute('stroke-dasharray', circumference + 'em');
        el.setAttribute('r', radius + 'em');
    });

    document.querySelector('.radial-progress-center').setAttribute('r', (radius - 0.01 + 'em'));
    
    $('#countdown').countdown("2018/03/31", function(event) {
        sec.update(event.strftime('%S'), "SECONDS");
        min.update(event.strftime('%M'), "MINUTES");
        hour.update(event.strftime('%H'), "HOURS");
        day.update(event.strftime('%D'), "DAYS");
    });

    var bgImages = ["/images/content-bg.jpg", "/images/nebula-bg.jpg"];
    var logoImg = ['/images/immcoinlogo-white.png','/images/immcoinlogo.png'];

    preloadImages(logoImg);
    preloadImages(bgImages);

   
    var $el = $("body").bgswitcher({
        images: ["/images/content-bg.jpg", "/images/nebula-bg.jpg"],
        start: false,
        duration: 200
    });

    $window.on('scroll', function() {
        if($window.scrollTop() > 80){
            $('#logo-src').attr("src", logoImg[1]);
            $('#navigator').addClass('navigator-invert');
        }
        else if($window.scrollTop() < 80){
            $('#logo-src').attr("src", logoImg[0]).fadeTo(1000);
            $('#navigator').removeClass('navigator-invert');
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

function preloadImages(array) {
    if (!preloadImages.list) preloadImages.list = [];
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) list.splice(index, 1);
        }
        list.push(img);
        img.src = array[i];
    }
}

            

