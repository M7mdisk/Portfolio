var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 1;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

var onTop = true
document.addEventListener("wheel", function (e) {
    if (e.deltaY < 0 && onTop ==false)
    {
        $('#new').attr('class','slide-out-bottom')
        setTimeout(function () {
            $('.hero').show();
            $('#new').attr('style','display:none !important');
        }, 250);
        $('.hero').attr('class','hero slide-in-bck-top');
        onTop=true
    
    }else if (e.deltaY > 0 &&onTop ==true){
    $('.hero').attr('class','hero slide-out-top');
    setTimeout(function () {
       $('.hero').hide();
    }, 250);
    $('#new').attr('style','display:flex !important');
    $('#new').attr('class','slide-in-bck-bottom')
    onTop=false
    }
})
window.onscroll = function () { window.scrollTo(0, 0); };
