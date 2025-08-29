AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });
    
    $('#hamburger').click(function() {
        $('.nav-menu').toggleClass('active');
        $(this).html($('.nav-menu').hasClass('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>');
    });
    
    // Smooth scroll for nav links AND footer links
    $('a.nav-link, a.footer-link').on('click', function(e) {
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