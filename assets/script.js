AOS.init({
    duration: 700,
    once: true,
    offset: 100
});

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 80) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });
    

    // Smooth scroll for nav links AND footer links
    $('a.footer-link').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
            
            // close menu if open
            if ($('.nav-menu').hasClass('active')) {
                $('.nav-menu').removeClass('active');
                $('#hamburger').html('<i class="fas fa-bars"></i>');
            }
        }
    });
});